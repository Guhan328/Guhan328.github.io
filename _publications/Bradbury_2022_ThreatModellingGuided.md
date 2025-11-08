---
title: "Threat-Modeling-Guided Trust-Based Task Offloading for Resource-Constrained Internet of Things"
citation: "**Matthew Bradbury**, Arshad Jhumka, Tim Watson, Denys Flores, Jonathan Burton, and Matthew Butler. Threat-Modeling-Guided Trust-Based Task Offloading for Resource-Constrained Internet of Things. *ACM Transactions on Sensor Networks*, 18(2):41, 2022. [doi:10.1145/3510424](https://doi.org/10.1145/3510424)."
publishDate: 2022-05-01
abstract: "There is an increasing demand for Internet of Things (IoT) networks consisting of resource-constrained devices executing increasingly complex applications. Due to these resource constraints, IoT devices will not be able to execute expensive tasks. One solution is to offload expensive tasks to resource-rich edge nodes, which requires a framework that facilitates the selection of suitable edge nodes to perform task offloading. Therefore, in this article, we present a novel trust-model-driven system architecture, based on behavioral evidence, that is suitable for resource-constrained IoT devices and supports computation offloading. We demonstrate the viability of the proposed architecture with an example deployment of the Beta Reputation System trust model on real hardware to capture node behaviors. The open environment of edge-based IoT networks means that threats against edge nodes can lead to deviation from expected behavior. Hence, we perform a threat modeling to identify such threats. The proposed system architecture includes threat handling mechanisms that provide security properties such as confidentiality, authentication, and non-repudiation of messages in required scenarios and operate within the resource constraints. We evaluate the efficacy of the threat handling mechanisms and identify future work for the standards used."
file: https://raw.githubusercontent.com/MBradbury/publications/master/papers/TOSN2022.pdf
firstpage: https://raw.githubusercontent.com/MBradbury/publications/master/firstpages/TOSN2022.svg
bibtex: https://raw.githubusercontent.com/MBradbury/publications/master/bibtex/Bradbury_2022_ThreatModellingGuided.bib
dataset: https://doi.org/10.5281/zenodo.4568700
presentation: https://raw.githubusercontent.com/MBradbury/publications/master/presentations/SenSys2022.pdf
extends: Bradbury_2021_TrustAssessment32
project: project-6-TEAM
type: paper
paper_type: journal
---

There is increasing interest in using highly resource-constrained IoT devices to perform complex tasks. These resources might include limited processing power (e.g., 32MHz CPU), RAM (e.g., 32 KiB to 256 KiB), ROM (512 KiB), and potentially no stable storage. However, because of the limited resources an IoT device may need to offload expensive tasks to resource-rich devices. These might be a Cloud server or an Edge node if the latency of task responses is important. In order to address this issue, in this work we developed a middleware to facilitate task offloading using a measure of behavioural trust.

In addition, we also performed a threat modelling on the system to identify ways in which malicious Edge nodes could attempt to manipulate reputation in order to hide their bad actions and ways in which this could be mitigated.

<!-- readmore -->

## Importance

The key importance of this work is to understand exactly how much of the limited resources needs to be used to implement the middleware. This is because trust models that are used to assess which resource-rich device to offload a task to are typically very large. There is an assumption that "more information" = "better trust model", but the limited resources mean that there is not much space available to store a behavioural trust model. Our implementation investigated the required design decisions to fit such a system on these IoT devices. It is also important to consider how these devices will be manipulated and what can be prevented with the limited resources available.

## Perspectives

During this research we identified the challenges with using certain protocols. For example, [MQTT](https://mqtt.org/) uses TCP which requires a large amount of RAM in order to support the guarantees that TCP provides. [MQTT-SN](https://www.oasis-open.org/committees/download.php/66091/MQTT-SN_spec_v1.2.pdf) uses UDP, but was not implemented by the [Contiki-NG](https://www.contiki-ng.org/) IoT operating system we used.

We also needed to understand the cost of securing the messages sent in this system. Due to [issues identified in DTLS implementations](https://www.usenix.org/conference/usenixsecurity20/presentation/fiterau-brostean) we chose to investigate [OSCORE](https://datatracker.ietf.org/doc/rfc8613/) to protect messages. This standard conveniently uses the hardware acceleration of the [Zolertia RE-Mote devices](https://zolertia.io/product/re-mote/) we performed a deployment with. However, we had to minimise the use of Elliptic Curve operations due to the computational cost (even with hardware acceleration) that meant about 1 signature could be verified per second.

We identified that Edge nodes could make use of provided functionality to attempt to clear historical information stored by IoT devices or prevent those devices from correctly functioning via a denial of service. Both attacks are easy to carry out due to the low resources. We identified implementation details to mitigate the impact of such attacks by using multiple buffers to store information that needed to be verified. We also used a lazy approach to history removal which traded off increased implementation complexity but allowed information not currently relevant to be retained in memory for as long as possible.

Finally, future deployments of such a system will also need to design an appropriate trust model that fits within the limited memory remaining after implementing the task offloading middleware. Our use of the [Beta Reputation System](https://core.ac.uk/display/301341151) proved effective due to its small size.


![Dataflow diagram of the proposed system](/images/TOSN2022-DFD.svg)
