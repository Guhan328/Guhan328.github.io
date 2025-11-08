---
title: "The Impact of Decreasing Transmit Power Levels on FlockLab To Achieve a Sparse Network"
citation: "**Matthew Bradbury**, Arshad Jhumka, and Carsten Maple. The Impact of Decreasing Transmit Power Levels on FlockLab To Achieve a Sparse Network. In *Proceedings of the 2nd Workshop on Benchmarking Cyber-Physical Systems and Internet of Things*, CPS-IoTBench '19, 7–12. New York, NY, USA, April 2019. ACM. [doi:10.1145/3312480.3313171](https://doi.org/10.1145/3312480.3313171)."
publishDate: 2019-04-15
abstract: "For research in Wireless Sensor Networks (WSNs) and the Internet of Things (IoT), while many protocols are either analysed mathematically or simulated to assess performance, it has become necessary that they are tested on hardware in real world environments. Algorithms are often validated in either (i) a densely connected network or (ii) a sparsely connected network. The majority of existing testbeds have implemented dense networks, making evaluation and validation of certain protocols, such as spatially-redundant source location privacy (SLP) protocols, challenging. We explore the use of transmission power to achieve network sparsity and present the results of such experiments performed on the FlockLab testbed. Based upon our experience in using FlockLab, we also identify additional aspects of testbed performance that need to be monitored to ensure reliable and reproducible results."
file: https://raw.githubusercontent.com/MBradbury/publications/master/papers/CPS-IoTBench2019.pdf
firstpage: https://raw.githubusercontent.com/MBradbury/publications/master/firstpages/CPS-IoTBench2019.svg
presentation: https://raw.githubusercontent.com/MBradbury/publications/master/presentations/CPS-IoTBench2019.pdf
bibtex: https://raw.githubusercontent.com/MBradbury/publications/master/bibtex/Bradbury_2019_ImpactDecreasingTransmit.bib
dataset: https://doi.org/10.5281/zenodo.2528757
project: project-1-PhD
type: paper
paper_type: workshop
---

When developing techniques for IoT devices, it is preferable to perform testing on real devices in real situations such as on [FlockLab 2](https://gitlab.ethz.ch/tec/public/flocklab/wiki), [FIT IoT-LAB](https://www.iot-lab.info/), and [INDRIYA 2](https://indriya.comp.nus.edu.sg/), as simulation will not perfectly reproduce these environments. However, IoT testbeds are not always deployed in the same scenarios for which techniques are developed for. It is often the case that testbeds are set up in existing facilities (such as inside office buildings) and devices are positioned close to each other. This means that there is currently a lack of testbeds supporting the testing of applications that will be deployed outside, on a large scale, with sparse connectivity. Commonly, the transmission power of device can be reduced in order to emulate a sparse network, this paper looked at the baseline effects of doing so.

<!-- readmore -->

## Importance

Without understanding the baseline performance of a testbed, it becomes difficult to draw conclusions about the performance of the techniques that are being tested. This paper focused on understanding the noise floor and the impact that varying transmit power has on message transmit, message receive and current consumption performance. Below shows the current consumption when (1) performing no activities, (2) sending and receiving messages, and (3) logging the receive signal strength indicator (RSSI) and logging it via serial output.

![Graph of current draw under various activites](/images/IoTBench2019-energy-graph.svg)

Due to the office environment there are certain characteristics that would be different in a large-scale outdoors environment. For example, the noise floor is affected by the provision of WiFi in the building, as can be seen in the 2.4 GHz channels below. There is also a degree of link asymmetry that may be different in an outdoors environment.

![Graph of noise floor for different nodes](/images/IoTBench2019-noise-floor-graph.svg)

## Perspectives

Reducing the transmit power to obtain a spare network is a poor choice in order to obtain the desired network topology, but it may be the only option available given the currently available IoT testbeds. Future effort will be needed to set up testbeds in these different environments. 
