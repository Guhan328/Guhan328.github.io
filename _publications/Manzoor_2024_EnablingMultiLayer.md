---
title: "Enabling Multi-Layer Threat Analysis in Dynamic Cloud Environments"
citation: "Salman Manzoor, Antonios Gouglidis, **Matthew Bradbury**, and Neeraj Suri. Enabling Multi-Layer Threat Analysis in Dynamic Cloud Environments. *IEEE Transactions on Cloud Computing*, February 2024. [doi:10.1109/TCC.2024.3365736](https://doi.org/10.1109/TCC.2024.3365736)."
publishDate: 2024-02-01
abstract: "Most Threat Analysis (TA) techniques analyze threats to targeted assets (e.g., components, services) by considering static interconnections among them. However, in dynamic environments, e.g., the Cloud, resources can instantiate, migrate across physical hosts, or decommission to provide rapid resource elasticity to its users. Existing TA techniques are not capable of addressing such requirements. Moreover, complex multi-layer/multi-asset attacks on Cloud systems are increasing, e.g., the Equifax data breach; thus, TA approaches must be able to analyze them. This paper proposes ThreatPro, which supports dynamic interconnections and analysis of multi-layer attacks in the Cloud. ThreatPro facilitates threat analysis by developing a technology-agnostic information flow model, representing the Cloud's functionality through conditional transitions. The model establishes the basis to capture the multi-layer and dynamic interconnections during the life cycle of a Virtual Machine. ThreatPro contributes to (1) enabling the exploration of a threat's behavior and its propagation across the Cloud, and (2) assessing the security of the Cloud by analyzing the impact of multiple threats across various operational layers/assets. Using public information on threats from the National Vulnerability Database, we validate ThreatPro's capabilities, i.e., identify and trace actual Cloud attacks and speculatively postulate alternate potential attack paths."
file: https://raw.githubusercontent.com/MBradbury/publications/master/papers/TCC2024.pdf
supplemental: https://raw.githubusercontent.com/MBradbury/publications/master/papers/supplemental/TCC2024.pdf
firstpage: https://raw.githubusercontent.com/MBradbury/publications/master/firstpages/TCC2024.svg
bibtex: https://raw.githubusercontent.com/MBradbury/publications/master/bibtex/Manzoor_2024_EnablingMultiLayer.bib
extends: Manzoor_2022_Poster_MultiLayer
type: paper
paper_type: journal
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
