---
title: "Poster: Effectiveness of Moving Target Defense Techniques to Disrupt Attacks in the Cloud"
citation: "Salman Manzoor, Antonios Gouglidis, **Matthew Bradbury**, and Neeraj Suri. Poster: Effectiveness of Moving Target Defense Techniques to Disrupt Attacks in the Cloud. In *Proceedings of the 2022 ACM SIGSAC Conference on Computer and Communications Security*, CCS'22, 3415–3417. Los Angeles, CA, USA, 7–11 November 2022. ACM. [doi:10.1145/3548606.3563514](https://doi.org/10.1145/3548606.3563514)."
publishDate: 2022-11-07
abstract: "Moving Target Defense (MTD) can eliminate the asymmetric advantage that attackers have in terms of time by changing a system's configuration dynamically to reduce the efficacy of reconnaissance and increase uncertainty and complexity for attackers. There are numerous MTDs proposed that target specific aspects of a system. However, deploying MTDs at different layers/components of the Cloud and assessing their effects on the overall security gains for the entire system is still challenging since the Cloud is a complex system entailing physical and virtual resources, and there exists a multitude of attack surfaces that an attacker can target. Thus, we explore the combination of different MTDs at different layers to maximize the security gains offered by the MTDs. We propose a quantification mechanism to evaluate the effectiveness of the MTDs against the attacks in the Cloud."
file: https://raw.githubusercontent.com/MBradbury/publications/master/papers/CCS2022-MTD.pdf
firstpage: https://raw.githubusercontent.com/MBradbury/publications/master/firstpages/CCS2022-MTD.svg
poster: https://raw.githubusercontent.com/MBradbury/publications/master/posters/CCS2022-MTD.pdf
bibtex: https://raw.githubusercontent.com/MBradbury/publications/master/bibtex/Manzoor_2022_Poster_EffectivenessMoving.bib
type: paper
paper_type: workshop
---

Cloud systems are now highly pervasive and provide [significant opportunities](https://www.ibm.com/downloads/cas/WMDZOWK6) for adversaries to attack these systems. One approach to mitigate the amount of time adversaries have to attack a system is to reconfigure the system, in essence to provide a [moving target](https://www.sciencedirect.com/topics/computer-science/moving-target-defense) that adversaries need to contend with. The advantage of moving target defence (MTD) that adversaries have less time to perform reconnaissance and then attack a system. The moving target could be to change IP addresses &mdash; so adversaries are unsure of network structure, or to change the operating system and applications providing a service &mdash; so adversaries may struggle to exploit a vulnerability in specific software.

Cloud systems are simultaneously well suited to MTD due to their ability to be dynamically reconfigured and challenging to apply MTD due to the wide variety of ways in which it can be employed. This means there is a need to be able to effectively select *where* MTDs should be applied in a cloud environment.

<!-- readmore -->

## Importance

The number of security incidents involving Cloud systems is continuing to [increase](https://cpl.thalesgroup.com/about-us/newsroom/thales-cloud-data-breaches-2022-trends-challenges), this means that additional techniques that can be performed by Cloud providers to mitigate potential attacks is a valuable service.

## Perspectives

Choosing where to apply MTDs is highly specific to the Cloud environment, the MTDs that can be used, the costs involved, and the risk appetite of the service provider. This means it is a complex multi-objective optimisation problem with the potential for multiple solutions based on the relative weighting of these different concerns. Optimisation techniques can help find a [Pareto frontier](https://en.wikipedia.org/wiki/Pareto_front), however, in all likelihood a trade-off will need to be made between the objectives that are being optimised for.
