---
title: "Trust Assessment in 32 KiB of RAM: Multi-application Trust-based Task Offloading for Resource-constrained IoT Nodes"
citation: "**Matthew Bradbury**, Arshad Jhumka, and Tim Watson. Trust Assessment in 32 KiB of RAM: Multi-application Trust-based Task Offloading for Resource-constrained IoT Nodes. In *The 36th ACM/SIGAPP Symposium on Applied Computing*, SAC'21, 1–10. Virtual Event, Republic of Korea, 22–26 March 2021. ACM. [doi:10.1145/3412841.3441898](https://doi.org/10.1145/3412841.3441898)."
publishDate: 2021-03-01
abstract: "There is an increasing demand for Internet of Things (IoT) systems comprised of resource-constrained sensor and actuator nodes executing increasingly complex applications, possibly simultaneously. IoT devices will not be able to execute computationally expensive tasks and will require more powerful computing nodes, called edge nodes, for such execution, in a process called computation offloading. When multiple powerful nodes are available, a selection problem arises: which edge node should a task be submitted to? This problem is even more acute when the system is subjected to attacks, such as DoS, or network perturbations such as system overload. In this paper, we present a trust model-based system architecture for computation offloading, based on behavioural evidence. The system architecture provides confidentiality, authentication and non-repudiation of messages in required scenarios and will operate within the resource constraints of embedded IoT nodes. We demonstrate the viability of the architecture with an example deployment of Beta Reputation System trust model on real hardware."
file: https://raw.githubusercontent.com/MBradbury/publications/master/papers/SAC-DADS2021.pdf
firstpage: https://raw.githubusercontent.com/MBradbury/publications/master/firstpages/SAC-DADS2021.svg
bibtex: https://raw.githubusercontent.com/MBradbury/publications/master/bibtex/Bradbury_2021_TrustAssessment32.bib
dataset: https://doi.org/10.5281/zenodo.4312801
presentation: "https://raw.githubusercontent.com/MBradbury/publications/master/presentations/SAC-DADS2021.pdf"
video: https://www.dropbox.com/s/8mo2skll6wun2lz/SAC-DADS21.mp4?raw=1
project: project-6-TEAM
type: paper
paper_type: conference
---

There is increasing interest in using highly resource-constrained IoT devices to perform complex tasks. These resources might include limited processing power (e.g., 32MHz CPU), RAM (e.g., 32 KiB to 256 KiB), ROM (512 KiB), and potentially no stable storage. However, because of the limited resources an IoT device may need to offload expensive tasks to resource-rich devices. These might be a Cloud server or an Edge node if the latency of task responses is important. In order to address this issue, in this work we developed a middleware to facilitate task offloading using a measure of behavioural trust.

<!-- readmore -->

## Importance

The key importance of this work is to understand exactly how much of the limited resources needs to be used to implement the middleware. This is because trust models that are used to assess which resource-rich device to offload a task to are typically very large. There is an assumption that "more information" equals "a better trust model", but the limited resources mean that there is not much space available to store a behavioural trust model. Our implementation investigated the required design decisions to fit such a system on these IoT devices.

## Perspectives

During this research we identified the challenges with using certain protocols. For example, [MQTT](https://mqtt.org/) uses TCP which requires a large amount of RAM in order to support the guarantees that TCP provides. [MQTT-SN](https://www.oasis-open.org/committees/download.php/66091/MQTT-SN_spec_v1.2.pdf) uses UDP, but was not implemented by the [Contiki-NG](https://www.contiki-ng.org/) IoT operating system we used.

We also needed to understand the cost of securing the messages sent in this system. Due to [issues identified in DTLS implementations](https://www.usenix.org/conference/usenixsecurity20/presentation/fiterau-brostean) we chose to investigate [OSCORE](https://datatracker.ietf.org/doc/rfc8613/) to protect messages. This standard conveniently uses the hardware acceleration of the [Zolertia RE-Mote devices](https://zolertia.io/product/re-mote/) we performed a deployment with. However, we had to minimise the use of Elliptic Curve operations due to the computational cost (even with hardware acceleration) that meant about 1 signature could be verified per second.

Finally, future deployments of such a system will also need to design an appropriate trust model that fits within the limited memory remaining after implementing the task offloading middleware. Our use of the [Beta Reputation System](https://core.ac.uk/display/301341151) proved effective due to its small size.
