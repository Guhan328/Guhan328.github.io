---
title: "Source Location Privacy for Wireless Sensor Networks"
excerpt: "Wireless sensor networks are useful for monitoring events over large areas for example, tracking the location of endangered species. However, by deploying this network to obtain data for conservation, it also reveals context information to an adversary about where the animals are. My PhD involved developing routing algorithms to delay an adversary in their attempt to locate the source of messages in such a network."
duration: "September 2014 &ndash; April 2018"
location: "Department of Computer Science, University of Warwick"
image:
  src: /images/panda-antenna.webp
  alt: "A directional antenna connected to a laptop showing signals from a transmitter next to a toy panda"
collection: projects
---

## Wireless Sensor Network

A wireless sensor is a basic computer with some sensors and a wireless radio. You can think of it in a similar way to a phone. Your phone has a wireless radio that lets it talk to a base station, this communication link is where your phone calls and internet access come from. The difference is that a sensor node doesn't have a similar range, instead they just use this radio to talk to each of the close by nodes. Using this wireless link the nodes then send interesting data gathered about light or temperature or humidity back to someone who can analyse this information.

The image shows what these nodes look like. In reality, they are very small and the largest part of them are the two AA batteries that are required to power the nodes. An interesting thing about developing software for sensor networks is that nodes are expected to run on small batteries for a long period of time. So software being developed for these nodes needs to take energy into consideration.

## Source Location Privacy

In typical sensor network applications a single node in the network will want to send information (the source of the information) to another node in the network (the sink). For sensor networks this can be accomplished by flooding the network. What flooding means is that a message is passed along to neighbouring nodes until it cannot be passed on any more.

It has been shown that when a message is flooded though a network that an attacker who is listening to the messages can follow the transmission path back to the source of the message. The attacker does this by looking at the wireless signal strengths. When the attacker is facing in the direction a message is sent it can see the signal strength is higher and when facing away it is lower. Using this strategy the attacker determines the direction to travel in. This is why we need to provide source location privacy as flooding provides none.

![SLP Protectionless Animated](/images/slp-protectionless.gif)

An adversary can detect the direction that a message arrived from using a directional antenna. In the picture below a directional antenna is picking up signals sent from a 433MHz transmitter. A cheap commercial-off-the-shelf digital TV dongle is used with [SDRSharp](https://www.rtl-sdr.com/tag/sdrsharp/) to receive and visualise the signal.

![Panda with an Antenna](/images/panda-antenna.webp)

### Using Fake Sources

One solution to provide source location privacy is to allocate some nodes in the network to be fake sources. These fake sources will flood the network with messages that are indistinguishable from the regular messages in the network, but their location will be away from the real source. So, instead of an attacker being lured to the real source the attacker is lured to the fake source.

The image below shows what happens when an algorithm that allocates fake sources in a sensor network. Instead of the attacker being lured towards the source, the attacker is instead drawn to the fake sources (in brown) that are flooding the network with fake messages.

![SLP Adaptive Animated](/images/slp-adaptive.gif)

### Using Diversionary Routes (ILP Inspired)

An alternative to fake sources is to use diversionary paths to increase the time it would take for the attacker to reach the source. These paths travel through different areas of the network to ensure that the attacker does not always receive that message. The messages also delay their travel, so that multiple messages will reach the same distance from the source at a specific time. This allows the attacker to make less positive movement towards the source.

<video controls="" style="max-width: 100%; max-height: 100%;"><source src="/videos/ilprouting_group_4.mp4" type="video/mp4"/></video>

### Why "Protecting Your Panda"?

This problem is usually introduced as the panda-hunter game. Where a wireless sensor network is deployed to monitor panda habitat. When a panda is detected by a node it becomes the source node and informs the sink node about the panda. At the sink node are conservationists who analyse the data. The attacker is a poacher who want to capture the panda by using the network to find the location.

## Information

Role: PhD Student

Funder: [Engineering and Physical Sciences Research Council](https://epsrc.ukri.org) Doctoral Training Grant [[EP/M506679/1](https://gtr.ukri.org/projects?ref=EP/M506679/1)]

Duration: {{ page.duration }}

Supervisor: [Dr. Arshad Jhumka](https://warwick.ac.uk/fac/sci/dcs/people/arshad_jhumka/)

Links:
 * [Source Code](https://github.com/MBradbury/slp)
 * [Datasets](https://zenodo.org/communities/warwickdcsslp/?page=1&size=20)
