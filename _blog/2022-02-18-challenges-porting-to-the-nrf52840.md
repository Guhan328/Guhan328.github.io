---
title: "Challenges Porting to the nRF52840"
permalink: /blog/2022-02-18-challenges-porting-to-the-nrf52840
collection: blog
publishDate: 2022-02-18
modified: 2022-06-13
sitemap: true
---

I have been working with [Giovanni](https://www.lancaster.ac.uk/sci-tech/about-us/people/giovanni-stanco) (a visiting PhD student) to port [code](https://github.com/mbradbury/iot-trust-task-alloc) from a previous [project](/projects/project-6-TEAM/) from the [Zolertia RE-Mote](https://zolertia.io/product/re-mote/) platform to new [nRF52840 DK](https://www.nordicsemi.com/Products/Development-hardware/nrf52840-dk) boards. These boards are much more capable than the Zolertia RE-Motes, not just in terms of computational capability, but also in terms of the ability to debug and instrument them. While we expected to encounter some challenges with the port, the most problematic and time consuming issues ended up being entirely unexpected.

<!-- readmore -->

| Specification      | Zolertia RE-Mote | nRF52840 DK     |
|--------------------|------------------|-----------------|
| SOC                | TI CC2538        | Nordic nRF52840 |
| CPU                | Arm Cortex M3    | Arm Cortex M4   |
| CPU Speed          | 32  MHz          | 64  MHz         |
| FPU                | No               | Yes             |
| RAM                | 32  KiB          | 256 KiB         |
| Flash              | 512 KiB          | 1   MiB         |
| Crypto Accelerator | AES/SHA2/ECC/RSA | CryptoCell-310  |

As part of the project a large number of the tasks that we would need to implement for this new platform were automated:
1. Detecting available devices that firmware could be deployed to
2. Flashing the firmware
3. Logging debug information from the serial output
4. (For select applications) Issuing commands to the firmware over the serial communications

In addition we also needed to implement support for cryptographic primitives using the [CryptoCell 310](https://infocenter.nordicsemi.com/index.jsp?topic=%2Fps_nrf52840%2Fcryptocell.html) built into the Arm Cortex M4 (the CPU used by the nRF52840) via the APIs provided by the [Nordic SDK](https://infocenter.nordicsemi.com/index.jsp?topic=%2Fstruct_sdk%2Fstruct%2Fsdk_nrf5_latest.html). This was where work started as we needed to compile the firmware before we would be able to test flashing it.

## Porting to the new platform

![An nRF52840 DK with two USB cables connected to it](/images/nrf52840.webp)

### Cryptographic APIs

As Contiki-NG (the IoT operating system that this software was built on) did not have support for using the Nordic cryptographic APIs, we needed to add support for this to Contiki-NG's build system. This required building the appropriate source files in the Nordic SDK as part of the Contiki-NG's build process and linking with the proprietary CryptoCell library. This was achieved over these commits: [1](https://github.com/MBradbury/contiki-ng/commit/7eced4f12918c1b9da0fdc7b10097a592d2045bb), [2](https://github.com/MBradbury/contiki-ng/commit/8e4549aaf01a20954b6e2636d7e45c2c3ca99026), and [3](https://github.com/MBradbury/contiki-ng/commit/8265eaea47edaeee32b8859c046515bc3fecdeb6).

It was necessary to modify the linker script to ensure the relevant symbols were present. The key symbol being `crypto_data`. This change was based off the linker script included in the Nordic SDK at [`config/nrf52840/armgcc/generic_gcc_nrf52.ld`](https://github.com/cmdwtf/nRF5_SDK/blob/master/config/nrf52840/armgcc/generic_gcc_nrf52.ld).

```
SECTIONS
{
  . = ALIGN(4);
  .mem_section_dummy_ram :
  {
  }
  .log_dynamic_data :
  {
    PROVIDE(__start_log_dynamic_data = .);
    KEEP(*(SORT(.log_dynamic_data*)))
    PROVIDE(__stop_log_dynamic_data = .);
  } > RAM
  .log_filter_data :
  {
    PROVIDE(__start_log_filter_data = .);
    KEEP(*(SORT(.log_filter_data*)))
    PROVIDE(__stop_log_filter_data = .);
  } > RAM

} INSERT AFTER .data;

SECTIONS
{
  .mem_section_dummy_rom :
  {
  }
  .crypto_data :
  {
    PROVIDE(__start_crypto_data = .);
    KEEP(*(SORT(.crypto_data*)))
    PROVIDE(__stop_crypto_data = .);
  } > FLASH
  .nrf_queue :
  {
    PROVIDE(__start_nrf_queue = .);
    KEEP(*(.nrf_queue))
    PROVIDE(__stop_nrf_queue = .);
  } > FLASH
  .log_const_data :
  {
    PROVIDE(__start_log_const_data = .);
    KEEP(*(SORT(.log_const_data*)))
    PROVIDE(__stop_log_const_data = .);
  } > FLASH
  .log_backends :
  {
    PROVIDE(__start_log_backends = .);
    KEEP(*(SORT(.log_backends*)))
    PROVIDE(__stop_log_backends = .);
  } > FLASH
  .nrf_balloc :
  {
    PROVIDE(__start_nrf_balloc = .);
    KEEP(*(.nrf_balloc))
    PROVIDE(__stop_nrf_balloc = .);
  } > FLASH

} INSERT AFTER .text
```

We encountered an issue with calls to cryptographic APIs returning error 0x8570. Which was caused by the initialisation of the cryptographic APIs occurring [after timers had been scheduled](https://devzone.nordicsemi.com/f/nordic-q-a/63876/nrf_crypto_init-error-initialization-or-startup-of-rng-failed). So initialisation was performed at the end of [`platform_init_stage_one`](https://github.com/MBradbury/contiki-ng/commit/8265eaea47edaeee32b8859c046515bc3fecdeb6#diff-d687e3990031e18d7416aae0d8d8ab0e5a34f2b1b6d6490ee63d15496f7b3ecfR99) which is before Contiki-NG will begin scheduling any timers.

Surprisingly, [our implementation](https://github.com/MBradbury/iot-trust-task-alloc/blob/master/wsn/common/crypto/targets/nrf52840/platform-crypto-support.c) of SHA-256, ECDH and ECDSA worked well and there were no other bugs that required fixing. A downside to using these APIs is that they are blocking. Contiki-NG has a feature called [protothreads](https://dl.acm.org/doi/abs/10.1145/1182807.1182811) (which are in reality co-routines) that makes writing code performing asynchronous input/output nicer than alternative approaches involving callbacks. A useful aspect of the protothread-based implementation of these primitives for Zolertia RE-Motes is that the protothread signing or verifying a message can yield the CPU to another task while the hardware cryptographic accelerator is processing the action. However, this is not the case for the Nordic SDK as the cryptographic APIs will block until the hardware accelerator is finished. This may not be a downside for operating systems such as [RIOT](https://riot-os.org) or [Zephyr](https://zephyrproject.org) which use pre-emptive scheduling, but could have led to the watchdog timer being hit with Contiki-NG as it uses co-operative scheduling which expects the protothreads to yield often enough. 

### PCAP Support

Another required feature was to log packets sent and received. While there is likely to be a much better solution that involves passive monitoring of the nRF52840's radio, we wanted to perform simple changes that were compatible with the approach [previously used](https://github.com/MBradbury/contiki-ng/commit/2efd13a023a3ac1f5df2f8d5af2c6e2e7ad359fc) with the Zolertia RE-Mote.

Previously we modified the RE-Mote's network driver such that every time a packet started being sent, sending completed or a packet was received, appropriate information was printed out over the serial connection. To avoid having to modify the radio driver of every device we might be interested in deploying on in the future, we instead implemented [a pcap radio driver that wrapped around](https://github.com/MBradbury/contiki-ng/commit/dadafd66ee7c769d85b3c7ac5b214096630aeab0) the actual radio driver and performed the appropriate logging.

## Detecting Connected Devices and Extracting Information

As part of our deployment we have several different devices connected to a single host. Therefore, it was necessary for us to be able to enumerate the devices present. Inspired by an [Adafruit](https://github.com/adafruit/Adafruit_Adalink/blob/master/adalink/cores/nrf52840.py) library we read the [Factory information configuration registers (FICR)](https://infocenter.nordicsemi.com/topic/ps_nrf52840/ficr.html?cp=4_0_0_3_3) from the connected devices in order to obtain information on them.

Initially this information was read manually from the FCIR. However, we encountered issues with the [nRF5340DK](https://www.nordicsemi.com/Products/Development-hardware/nRF5340-DK/GetStarted?lang=en) boards that were also deployed at the time. [Errata 51](https://infocenter.nordicsemi.com/index.jsp?topic=%2Ferrata_nRF5340_EngA%2FERR%2FnRF5340%2FEngineeringA%2Flatest%2Fanomaly_340_51.html&cp=3_0_1_0_1_41) means that the FCIR cannot be read when read back protection is enabled. To work around this we used [pynrfjprog](https://github.com/NordicSemiconductor/pynrfjprog) to obtain sufficient information before extracting additional information from the FICR when read back protection is disabled. The full version is available [here](https://github.com/MBradbury/iot-trust-task-alloc/blob/master/tools/deploy/motelist_backend/nrf.py).

```python
import pynrfjprog.HighLevel
import pynrfjprog.APIError
from pynrfjprog.Parameters import ReadbackProtection

result = []
with pynrfjprog.HighLevel.API() as api:
    for node_id in api.get_connected_probes():
        with pynrfjprog.HighLevel.DebugProbe(api, node_id) as probe:
            probe_info = probe.get_probe_info()
            device_info = probe.get_device_info()

            node_info = {
                    "Serial": probe_info.serial_number,
                    "Speed (kHz)": probe_info.clockspeed_khz,
                    "COM": ",".join([com_port.path for com_port in probe_info.com_ports]),
                    "Type": device_info.device_type.name,
                    "Family": device_info.device_family.name,
                    "RBP": probe.get_readback_protection().name,
                    "ROM (KiB)": device_info.code_size / 1024,
                    "RAM (KiB)": device_info.ram_size / 1024,
                }

                # Won't be able to do this with readback protection
                if probe.get_readback_protection() == ReadbackProtection.NONE:
                    information_getter = get_information_getter(device_info.device_type.name)
                    if information_getter is not None:
                        info = information_getter(probe)
                        node_info.update(info.details())

                result.append(node_info)
```

In the future we will need to disable read back protection in order to obtain what we need from these boards. The problem is that this also resets register values (such as the DEVICEADDR) that need to have sensible values. This is a problem to be addressed in the future.

## Flashing Firmware

Initially, we took inspiration from other projects:
1. [Contiki-NG](https://github.com/contiki-ng/contiki-ng/blob/develop/arch/cpu/nrf52840/Makefile.nrf52840#L127) uses [nrfjprog](https://www.nordicsemi.com/Products/Development-tools/nRF-Command-Line-Tools) to flash firmware
2. [RIOT-OS](https://github.com/RIOT-OS/RIOT/blob/73ccd1e2e721bee38f958f8906ac32e5e1fceb0c/dist/tools/jlink/jlink.sh#L182) and [FlockLab](https://gitlab.ethz.ch/tec/public/flocklab/observer/-/blob/master/testmanagement/tg_prog.py#L307) both use [J-Link Commander](https://wiki.segger.com/J-Link_Commander) to flash firmware
3. [Zephyr](https://github.com/zephyrproject-rtos/zephyr/blob/21d1ad3762302b3e461953df59430c77e0709274/boards/arm/nrf52840dk_nrf52840/board.cmake) Appears to support nrfjprog, J-Link Commander and [OpenOCD](https://openocd.org/)

As we used pynrfjprog to implement discovery of the devices present, it was easy to also use it to flash firmware to the target device:
```python
import pynrfjprog.HighLevel
from pynrfjprog.Parameters import ProgramOptions, VerifyAction, EraseAction, ResetAction

def flash_nrf(filename: str, serial_number: str):
    serial_number = int(serial_number)

    program_options = ProgramOptions(
        verify=VerifyAction.VERIFY_READ,
        erase_action=EraseAction.ERASE_ALL,
        qspi_erase_action=EraseAction.ERASE_NONE,
        reset=ResetAction.RESET_SYSTEM
    )

    with pynrfjprog.HighLevel.API() as api:
        with pynrfjprog.HighLevel.DebugProbe(api, serial_number) as probe:
            probe.program(filename, program_options)
```

## Serial Input/Output

Obtaining serial input and output provided a significant challenge as part of the efforts to deploy the firmware on the nRF52840 board. Initially no output could be obtained from UART, so we investigated [Real Time Transfer (RTT)](https://www.segger.com/products/debug-probes/j-link/technology/about-real-time-transfer/) which [Contiki-NG has support for](https://github.com/contiki-ng/contiki-ng/wiki/Platform-nrf52840#compilation-options). We were able to receive output from the devices, but we also needed to send input to them which had not been implemented. So we [implemented it](https://github.com/MBradbury/contiki-ng/commit/0b0a7211c8a758d01d04a4093b1e5e4048d0090b) as part of the RTT driver.

One issue with the RTT implementation is that the printf which comes with the RTT library lacks many of the [C99 format specifiers](https://en.cppreference.com/w/c/io/fprintf) meaning that existing code using them was not able to correctly output information. This included the error code when calling the cryptographic APIs. To mitigate this we included [mpaland's printf](https://github.com/mpaland/printf) library instead of using the printf supplied by the RTT library.

RTT is very fast because the nRF52840 simply reads from and writes to arrays in memory when it needs to log output or receive input. The debugger then also reads to and write from this memory in order to send data back to or from the host. A downside is that there is no ability to set an interrupt on data being written to the memory. This meant that it was necessary to implement polling in order to receive messages. In general, we saw that output would arrive from devices in chunks, which would not work with the previously written logging and analysis scripts that would timestamp each line as it was received. So we moved back to performing serial input/output over UART which was now working. We are unsure why IO over UART was not working before, it was likely due to a configuration error (either incorrect build arguments, or incorrect arguments to our serial terminal such as an incorrect baud rate or incorrect tty).

## Border Router Challenges

The final challenge was getting the [border router](https://github.com/contiki-ng/contiki-ng/wiki/Tutorial%3A-RPL-border-router) running. We need a border router to be present for multiple reasons:
1. In order to disseminate an IPv6 prefix to other nodes in the network
2. To act as the root of a [RPL](https://datatracker.ietf.org/doc/html/rfc6550) tree
3. To allow applications running on the host to provide services to nRF52840 devices in the network

When running the border router we encountered strange behaviour. The border router was able to: (i) configure an IPv6 prefix and (ii) receive packets from across the network. But we were unable to ping the nRF52840 that was flashed with the border router firmware from the host it was connected to. This issue appeared to be the same as had been encountered in 2020, where [bytes appeared to be lost when sent over the SLIP link](https://github.com/contiki-ng/contiki-ng/issues/1365). The solution here was to build with `NRF52840_NATIVE_USB=1` so serial communication went over the second USB port on the nRF52840DK instead of the [CDC ACM USB virtual COM port](https://infocenter.nordicsemi.com/index.jsp?topic=%2Fcom.nordic.infocenter.sdk5.v15.2.0%2Fusbd_cdc_acm_example.html). We were unable to get communications working over the native USB port, so instead investigated why the communication was failing over UART.

We tried a number of different approaches, including:
1. [Rewriting the nRF52840 UART driver](https://github.com/MBradbury/contiki-ng/commit/b276a0a20301f3729fe2f2fb8e9a01644b0ebaf6) to use the [nrfx_uart](https://infocenter.nordicsemi.com/topic/sdk_nrf5_v17.1.0/group__nrf__uart.html) library from the Nordic SDK, [inspired by this implementation](https://github.com/d3s-trento/contiki-uwb/blob/master/cpu/nrf52832/dev/uart0.c)
2. Making sure Contiki-NG's serial line library [did not conflict](https://github.com/MBradbury/contiki-ng/commit/75f24188a16d9489aa85ae1c690edd89f65d9a8a) with the SLIP input handler
3. Running [RIOT-OS's tunslip6](https://github.com/RIOT-OS/RIOT/tree/73ccd1e2e721bee38f958f8906ac32e5e1fceb0c/dist/tools/tunslip) instead of Contiki-NG's
4. Adding more detail to [tunslip6](https://github.com/MBradbury/contiki-ng/commit/e6956703f3b092ed94401acc001eb6d3f2097a73#diff-eb1c91834a2cb9f3f66fb13882b1fd7e5bc502225bd8bfa21a5571b9c7363e42R451) to aid in debugging

It was this last point that helped identify the cause of the problem. When performing pings from the host with a small packet size (as noticed in [contiki-ng#1365](https://github.com/contiki-ng/contiki-ng/issues/1365)) they were received and responded to by the nRF52840. However, larger pings would always be lost. The additional debug information added to tunslip6 allowed identifying that as soon as SLIP packets were more than 64 bytes they would not be responded to. Here the key information is:
* `F(x)` where `x` is the number of bytes that is being sent over SLIP. There is overhead from SLIP and IP headers which is why `ping` is provided a smaller size than 64.
* `.` which indicates tunslip6 is delivering information from the serial connection to the `tun` device.
* `-` which indicates that an IO action (one or more of: writing to SLIP, reading from SLIP, writing to TUN or reading from TUN) has ended

When using ping with 14 byte packets (which produced 64 bytes SLIP packets) a response is received from the target device.

```
$ ping fd00::f6ce:36d7:4396:3162 -s 14
PING fd00::f6ce:36d7:4396:3162(fd00::f6ce:36d7:4396:3162) 14 data bytes
22 bytes from fd00::f6ce:36d7:4396:3162: icmp_seq=1 ttl=64 time=15.3 ms
22 bytes from fd00::f6ce:36d7:4396:3162: icmp_seq=2 ttl=64 time=12.7 ms
22 bytes from fd00::f6ce:36d7:4396:3162: icmp_seq=3 ttl=64 time=12.7 ms
22 bytes from fd00::f6ce:36d7:4396:3162: icmp_seq=4 ttl=64 time=13.0 ms
22 bytes from fd00::f6ce:36d7:4396:3162: icmp_seq=5 ttl=64 time=13.0 ms
22 bytes from fd00::f6ce:36d7:4396:3162: icmp_seq=6 ttl=64 time=12.9 ms
22 bytes from fd00::f6ce:36d7:4396:3162: icmp_seq=7 ttl=64 time=12.8 ms
22 bytes from fd00::f6ce:36d7:4396:3162: icmp_seq=8 ttl=64 time=12.9 ms
22 bytes from fd00::f6ce:36d7:4396:3162: icmp_seq=9 ttl=64 time=12.9 ms
22 bytes from fd00::f6ce:36d7:4396:3162: icmp_seq=10 ttl=64 time=12.9 ms

--- fd00::f6ce:36d7:4396:3162 ping statistics ---
10 packets transmitted, 10 received, 0% packet loss, time 9014ms
rtt min/avg/max/mdev = 12.681/13.088/15.284/0.737 ms
```
```
$ sudo ../contiki-ng/tools/serial-io/tunslip6 -s /dev/ttyACM0 fd00::1/64 -P
********SLIP started on ``/dev/ttyACM0''
opened tun device ``/dev/tun0''
ifconfig tun0 inet `hostname` mtu 1500 up
ifconfig tun0 add fd00::1/64
ifconfig tun0 add fe80::0:0:0:1/64
ifconfig tun0

tun0: flags=4305<UP,POINTOPOINT,RUNNING,NOARP,MULTICAST>  mtu 1500
        inet 127.0.0.1  netmask 255.255.255.255  destination 127.0.0.1
        inet6 fe80::6cbb:c40a:2bd3:3df9  prefixlen 64  scopeid 0x20<link>
        inet6 fd00::1  prefixlen 64  scopeid 0x0<global>
        inet6 fe80::1  prefixlen 64  scopeid 0x20<link>
        unspec 00-00-00-00-00-00-00-00-00-00-00-00-00-00-00-00  txqueuelen 500  (UNSPEC)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

F(1)-tF(50)-tF(64)-.....-...........................................................-tF(64)-..........-...........-............-............-...........-........-tF(64)-..........-............-...........-............-............-.......-tF(50)-...........-............-............-...........-............-...........-...........-...........-............-...........-...........-............-...-tF(190)-tF(64)-............-...........-............-...........-............-......-tF(64)-.........-............-...........-............-...........-.........-tF(64)-........-............-...........-............-...........-..........-tF(64)-........-...........-............-............-...........-..........-tF(64)-..........-...........-............-...........-............-........-tF(64)-.........-............-...........-............-...........-.........-tF(64)-........-............-............-...........-...........-..........-tF(50)-....-...........-............-...........-............-............-...........-...........-............-...........-...........-...........-...........-
```

However, when the size of the ping packets is increased to size 15 (SLIP packet size of 65) no response is received from the target device.

```
$ ping fd00::f6ce:36d7:4396:3162 -s 15
PING fd00::f6ce:36d7:4396:3162(fd00::f6ce:36d7:4396:3162) 15 data bytes
^C
--- fd00::f6ce:36d7:4396:3162 ping statistics ---
13 packets transmitted, 0 received, 100% packet loss, time 12457ms
```
```
$ sudo ../contiki-ng/tools/serial-io/tunslip6 -s /dev/ttyACM0 fd00::1/64 -P
********SLIP started on ``/dev/ttyACM0''
opened tun device ``/dev/tun0''
ifconfig tun0 inet `hostname` mtu 1500 up
ifconfig tun0 add fd00::1/64
ifconfig tun0 add fe80::0:0:0:1/64
ifconfig tun0

tun0: flags=4305<UP,POINTOPOINT,RUNNING,NOARP,MULTICAST>  mtu 1500
        inet 127.0.0.1  netmask 255.255.255.255  destination 127.0.0.1
        inet6 fe80::4ff2:3e5a:cade:4787  prefixlen 64  scopeid 0x20<link>
        inet6 fd00::1  prefixlen 64  scopeid 0x0<global>
        inet6 fe80::1  prefixlen 64  scopeid 0x20<link>
        unspec 00-00-00-00-00-00-00-00-00-00-00-00-00-00-00-00  txqueuelen 500  (UNSPEC)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

F(1)-tF(50)-tF(65)-tF(65)-tF(65)-tF(50)-tF(65)-tF(65)-tF(65)-tF(66)-tF(65)-tF(65)-tF(65)-tF(65)-......-............-...........-............-............-...........-............-............-...........-............-...........-............-..-tF(184)-tF(50)-tF(65)-tF(65)-
```

The next step was testing if this was an issue with SLIP or somewhere else. By writing a script that sent increasingly long strings, we were able to rule out this being a SLIP problem and so this meant it was issue with the UART communication. Note that the output below says that the last input that was received was 63 bytes long, this is because it is not counting the newline character which has been removed.

```
DEBUG:edge-bridge:Sent long event b'!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n'
[DBG : edge ] Received serial message of length 58
[ERR : edge ] Unknown edge action aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
DEBUG:edge-bridge:Sent long event b'!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n'
[DBG : edge ] Received serial message of length 59
[ERR : edge ] Unknown edge action aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
DEBUG:edge-bridge:Sent long event b'!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n'
[DBG : edge ] Received serial message of length 60
[ERR : edge ] Unknown edge action aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
[WARN: mqtt-conn ] ping_parent() is called while we don't have connectivity
DEBUG:edge-bridge:Sent long event b'!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n'
[DBG : edge ] Received serial message of length 61
[ERR : edge ] Unknown edge action aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
DEBUG:edge-bridge:Sent long event b'!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n'
[DBG : edge ] Received serial message of length 62
[ERR : edge ] Unknown edge action aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
DEBUG:edge-bridge:Sent long event b'!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n'
[DBG : edge ] Received serial message of length 63
[ERR : edge ] Unknown edge action aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
DEBUG:edge-bridge:Sent long event b'!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n'
DEBUG:edge-bridge:Sent long event b'!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n'
DEBUG:edge-bridge:Sent long event b'!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n'
DEBUG:edge-bridge:Sent long event b'!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n'
```

My initial thought was that there was a 64 byte buffer in the Contiki-NG code that was not being correctly flushed. However, with the knowledge that the issue appears with packets larger than 64 bytes I was able to find [this issue](https://github.com/openthread/openthread/issues/2857) from 2018 which directed me to [this wiki entry](https://wiki.segger.com/J-Link_OB#Limitations_under_Mac_OS_X). Here a limitation of the boards is described, where when a mass storage device is enabled the UART is limited to packet sizes of up to 64 bytes. Disabling the mass storage device allows packet sizes up to 512 bytes. This can be performed by issuing the command `msddisable` in JLinkExe. Once done the border router is now able to correct communicate over SLIP.

```
$ JLinkExe
SEGGER J-Link Commander V7.60f (Compiled Jan 25 2022 16:45:33)
DLL version V7.60f, compiled Jan 25 2022 16:45:18

Connecting to J-Link via USB...O.K.
Firmware: J-Link OB-SAM3U128-V2-NordicSemi compiled Jan 20 2022 16:43:31
Hardware version: V1.00
S/N: 683836538
License(s): RDI, FlashBP, FlashDL, JFlash, GDB
USB speed mode: High speed (480 MBit/s)
VTref=3.300V


Type "connect" to establish a target connection, '?' for help
J-Link>msddisable
Probe configured successfully.
J-Link>
```

After a reboot of the host machine to power cycle the nRF52840DK, ping now works correctly:

```
$ ping fd00::f6ce:36ab:b9bc:c857 -s 64
PING fd00::f6ce:36ab:b9bc:c857(fd00::f6ce:36ab:b9bc:c857) 64 data bytes
72 bytes from fd00::f6ce:36ab:b9bc:c857: icmp_seq=1 ttl=63 time=327 ms
72 bytes from fd00::f6ce:36ab:b9bc:c857: icmp_seq=2 ttl=63 time=356 ms
72 bytes from fd00::f6ce:36ab:b9bc:c857: icmp_seq=3 ttl=63 time=339 ms
72 bytes from fd00::f6ce:36ab:b9bc:c857: icmp_seq=4 ttl=63 time=398 ms
72 bytes from fd00::f6ce:36ab:b9bc:c857: icmp_seq=5 ttl=63 time=392 ms
72 bytes from fd00::f6ce:36ab:b9bc:c857: icmp_seq=6 ttl=63 time=102 ms
72 bytes from fd00::f6ce:36ab:b9bc:c857: icmp_seq=7 ttl=63 time=124 ms
72 bytes from fd00::f6ce:36ab:b9bc:c857: icmp_seq=8 ttl=63 time=147 ms
72 bytes from fd00::f6ce:36ab:b9bc:c857: icmp_seq=9 ttl=63 time=200 ms
72 bytes from fd00::f6ce:36ab:b9bc:c857: icmp_seq=10 ttl=63 time=229 ms
^C
--- fd00::f6ce:36ab:b9bc:c857 ping statistics ---
10 packets transmitted, 10 received, 0% packet loss, time 9012ms
rtt min/avg/max/mdev = 101.931/261.389/398.016/108.329 ms
```
```
$ sudo ../contiki-ng/tools/serial-io/tunslip6 -s /dev/ttyACM0 fd00::1/64 -P
********SLIP started on ``/dev/ttyACM0''
opened tun device ``/dev/tun0''
ifconfig tun0 inet `hostname` mtu 1500 up
ifconfig tun0 add fd00::1/64
ifconfig tun0 add fe80::0:0:0:1/64
ifconfig tun0

tun0: flags=4305<UP,POINTOPOINT,RUNNING,NOARP,MULTICAST>  mtu 1500
        inet 127.0.0.1  netmask 255.255.255.255  destination 127.0.0.1
        inet6 fd00::1  prefixlen 64  scopeid 0x0<global>
        inet6 fe80::1  prefixlen 64  scopeid 0x20<link>
        inet6 fe80::4798:eb92:1905:56e4  prefixlen 64  scopeid 0x20<link>
        unspec 00-00-00-00-00-00-00-00-00-00-00-00-00-00-00-00  txqueuelen 500  (UNSPEC)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

F(1)-tF(50)-tF(114)-.......-............-...........-............-...........-............-...........-............-...........-............-...-tF(114)-....-...........-............-............-...........-...........-............-............-............-...........-......-tF(50)-tF(114)-...........-...........-............-............-...........-............-...........-............-............-..........-tF(114)-.........-...........-............-............-...........-............-...........-............-............-...........-.-tF(114)-..-............-...........-............-............-...........-............-............-...........-............-.......-tF(114)-........-...........-............-............-...........-...........-............-............-............-...........-..-tF(114)-.........-............-...........-............-............-...........-............-...........-............-............-tF(115)-....-............-...........-............-...........-...........-...........-............-...........-............-.......-tF(114)-.......-............-...........-............-............-...........-............-...........-............-...........-...-tF(114)-....-............-...........-............-...........-............-...........-............-...........-............-......-tF(50)-..........-............-............-............-...........-............-...........-............-...........-............-............-.........-tF(184)-tF(50)-.........-............-...........-............-...........-............-..........-............-............-...........-............-...........-............-...........-...........-............-..........-............-............-...........-...........-............-............-............-...........-..-tF(337)-...-............-............-...........-............-............-...........-...........-...........-............-...........-.............-...........-..........-............-............-...........-...........-...........-............-...........-............-............-...........-............-
```

Contiki-NG has now updated their [wiki](https://github.com/contiki-ng/contiki-ng/wiki/Platform-nrf52840#virtual-com-and-real-time-transfer) to document this issue and the steps to resolve it.

## Conclusions

Working with Giovanni on this port was an interesting challenge. Areas where I expected the most amount of time to be spent (the cryptographic implementation) took a lot less time than expected compared to the time unexpected issues (linker errors and border router serial IO) took. With this setup work out the way we are set to explore extensions to [trust-based task allocation](/projects/project-6-TEAM/) and other security challenges of using highly resource-constrained hardware in the future.
