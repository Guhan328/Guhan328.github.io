---
title: "Poster: Multi-Layer Threat Analysis of the Cloud"
citation: "Salman Manzoor, Antonios Gouglidis, **Matthew Bradbury**, and Neeraj Suri. Poster: Multi-Layer Threat Analysis of the Cloud. In *Proceedings of the 2022 ACM SIGSAC Conference on Computer and Communications Security*, CCS'22, 3419–3421. Los Angeles, CA, USA, 7–11 November 2022. ACM. [doi:10.1145/3548606.3563515](https://doi.org/10.1145/3548606.3563515)."
publishDate: 2022-11-07
abstract: "A variety of Threat Analysis (TA) techniques exist that typically target exploring threats to discrete assets (e.g., services, data, etc.) and reveal potential attacks pertinent to these assets. Furthermore, these techniques assume that the interconnection among the assets is static. However, in the Cloud, resources can instantiate or migrate across physical hosts at run-time, thus making the Cloud a dynamic environment. Additionally, the number of attacks targeting multiple assets/layers emphasizes the need for threat analysis approaches developed for Cloud environments. Therefore, this proposal presents a threat analysis approach that addresses multi-layer attacks. The proposed approach facilitates threat analysis by developing a technology-agnostic information flow model. It contributes to exploring a threat's propagation across the operational stack of the Cloud and, consequently, assessing the security of the Cloud holistically."
file: https://raw.githubusercontent.com/MBradbury/publications/master/papers/CCS2022-Cloud.pdf
firstpage: https://raw.githubusercontent.com/MBradbury/publications/master/firstpages/CCS2022-Cloud.svg
poster: https://raw.githubusercontent.com/MBradbury/publications/master/posters/CCS2022-Cloud.pdf
bibtex: https://raw.githubusercontent.com/MBradbury/publications/master/bibtex/Manzoor_2022_Poster_MultiLayer.bib
type: paper
paper_type: workshop
---

Cloud systems are now highly pervasive and provide [significant opportunities](https://www.ibm.com/downloads/cas/WMDZOWK6) for adversaries to attack these systems. Therefore, there is a need to understand how attacks can be performed in a Cloud environment. It is important to perform this analysis for historical attacks &mdash; to analyse what happened and what alternate routes an adversary could have taken to reach their goals. However, it is also important to have a capability to perform speculative analysis in terms of what potential attacks could have been performed considering a specific set of vulnerabilities. Therefore, this work investigated modelling the dynamic cloud environment, threats to it and how an adversary could reach specific goals.

<!-- readmore -->

<figure class="threequarters">
    <img src="/images/CCS22-Cloud-hlpn.svg" alt="Petri net modelling of a Cloud system" class="align-center" />
    <figcaption class="align-center">
    Petri net modelling of information flow through the Cloud system.
    </figcaption>
</figure>

This work proposes to use a [Petri net](https://en.wikipedia.org/wiki/Petri_net) to model the environment. Petri nets were chosen as they provide convenient ways to model and analyse distributed systems. Using Petri net models of different threats, speculative analysis can be performed to identify different goals that an adversary could reach.

<figure class="half">
    <img src="/images/CCS22-Cloud-attack-paths.svg" alt="Attack tree showing that an adversary can utilise different threats to reach different goals" class="align-center" />
    <figcaption class="align-center">
    Potential attack paths based on the vulnerabilities chosen to evaluate.
    </figcaption>
</figure>

## Importance

Understanding what goals and adversary could reach and how is an important aspect of knowing where to deploy mitigations. For example, this analysis could assist in applying the [Cyber Kill Chain](https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html) methodology by better understanding where applying mitigations is most effective.

## Perspectives

Vulnerability databases (such as [CVE](https://www.cve.org/)) are very useful in the way in which they document vulnerabilities. However, as these vulnerabilities lack a technical specification, it means that to use a vulnerability in this analysis it impact needs to be manually specified. Future work in this area could consider formal specification of vulnerabilities (either in terms of the vulnerability or its impact) as part of their reporting.
