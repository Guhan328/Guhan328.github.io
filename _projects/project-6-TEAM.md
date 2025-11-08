---
title: "Evaluating Trustworthiness of Edge-Based Multi-Tenanted IoT Devices"
excerpt: "Resource-constrained IoT devices have typically been used to perform sensing and actuation, however, there is increasing interest in those devices performing decision making. However, if these tasks are computationally or memory intensive, then the IoT devices will not have insufficient resources to execute the tasks. One solution is to offload the tasks from resource-constrained IoT devices to resource-rich Edge nodes. For redundancy multiple Edge nodes should be provisioned, but this raises the question of which Edge node should be selected to perform a task. This project investigated building a middleware to perform task offloading based on a measure of behavioural trust with limited resources (e.g., 32 KiB of RAM)."
duration: "March 2020 &ndash; March 2021"
location: "Department of Computer Science, University of Warwick"
image:
  src: /images/PiandZolertia.webp
  alt: "A Raspberry Pi next to a Zolertia RE-Mote with both circuit boards exposed"
collection: projects
---

Internet of Things (IoT) systems are expected to be deployed as solutions to problems in a wide variety of contexts, from building management, to smart city monitoring and to provide support to emergency services. However, many IoT devices are resource constrained and lack the capability or information to compute results for tasks that the IoT devices may be requested to perform. Instead these tasks will need to be offloaded to a server at the Edge of the network for a quick response. As these networks will have multiple organisations providing multiple IoT nodes and Edge nodes with different capabilities, the IoT devices need to know which Edge server they trust to return a timely response to a task. As these networks will support critical services, they also need to be resilient to attack.

Thus far the project has delivered a [prototype middleware](https://github.com/MBradbury/iot-trust-task-alloc) to support trust-based task offloading in a system comprised of resource-constrained devices. The performance of this middleware was investigated and [published](/talks/2021-03-22-SAC) at the ACM Symposium of Applied Computing. We have also investigated performing a proactive trust assessment which has been [published](/talks/2021-05-11-InfoCom) at IEEE INFOCOM.

<video controls="" style="max-width: 100%; max-height: 100%;"><source src="/videos/PETRAS-URB.mp4" type="video/mp4"/></video>

## Information

Role: Research Co-Investigator

Funder: [The PETRAS National Centre of Excellence for IoT Systems Cybersecurity](petras-iot.org/) [[EPSRC Grant EP/S035362/1](https://gtr.ukri.org/projects?ref=EP/S035362/1)]

Duration: {{ page.duration }}

People:
 * [Dr. Arshad Jhumka](https://warwick.ac.uk/fac/sci/dcs/people/arshad_jhumka/) (PI)
 * [Prof. Tim Watson](https://warwick.ac.uk/fac/sci/wmg/people/profile/?wmgid=1077) (CoI)

Links:
 * [PETRAS Project Page](https://petras-iot.org/project/evaluating-trustworthiness-of-edge-based-multi-tenanted-iot-devices-team/)
 * [Funding Announcement News Article](https://warwick.ac.uk/fac/sci/dcs/news/?newsItem=8a1785d8721768f401723d62f6e13f9f)
 * [Source Code](https://github.com/MBradbury/iot-trust-task-alloc)
