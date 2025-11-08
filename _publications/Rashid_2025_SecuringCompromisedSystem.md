---
title: "<del>Security-by-design</del> Securing a compromised system"
citation: "Awais Rashid, Sana Belguith, **Matthew Bradbury**, Sadie Creese, Ivan Flechais, and Neeraj Suri. <del>Security-by-design</del> Securing a compromised system. In *Rossfest Symposium*. Cambridge, UK, 25 March 2025."
publishDate: 2025-03-25
abstract: "Digital infrastructures are seeing convergence and connectivity at unprecedented scale. This is true for both current critical national infrastructures and emerging future systems that are highly cyber-physical in nature with complex intersections between humans and technologies, e.g., smart cities, intelligent transportation, high-value manufacturing and Industry 4.0. Diverse legacy and non-legacy software systems underpinned by heterogeneous hardware compose on-the-fly to deliver services to millions of users with varying requirements and unpredictable actions. This complexity is compounded by intricate and complicated supply-chains with many digital assets and services outsourced to third parties. The reality is that, at any particular point in time, there will be untrusted, partially-trusted or compromised elements across the infrastructure. Given this reality, and the societal scale of digital infrastructures, delivering secure and resilient operations is a major challenge. We argue that this requires us to move beyond the paradigm of security-by-design and embrace the challenge of securing-a-compromised-system."
file: https://raw.githubusercontent.com/MBradbury/publications/master/papers/Rossfest2025.pdf
firstpage: https://raw.githubusercontent.com/MBradbury/publications/master/firstpages/Rossfest2025.svg
bibtex: https://raw.githubusercontent.com/MBradbury/publications/master/bibtex/Rashid_2025_SecuringCompromisedSystem.bib
project: project-9-SCULI
type: paper
paper_type: workshop
---

There has been a large effort to sell a concept of secure-by-design by both the [UK](https://www.security.gov.uk/policy-and-guidance/secure-by-design/principles/), [USA](https://www.cisa.gov/securebydesign) and others. The reality is that being secure-by-design is not realistic.

<!-- readmore -->

## Perspectives

Specific aspects of being secure-by-design are feasible, for example, with the [Digital Security by Design](https://www.dsbd.tech) project which seeks to eliminate entire classes of memory vulnerabilities via new capabilities in [CHERI](https://www.cl.cam.ac.uk/research/security/ctsrd/cheri/) hardware such as with [Arm Morello](https://www.arm.com/architecture/cpu/morello).

However, the reality is that it is impossible to secure all aspects of a system by design.
 * Systems may interact or depend on systems which are not under the control of the system owner
 * Complex technology stacks provide scope for misplaced assumptions about threat models
 * Threat actors evolve quickly, so what was once appropriate to be considered _secure_ is no longer
 * Critical systems evolve slowly, taking time and investment to change a system
 * Not all legacy systems are feasible to upgrade
 * Inter-dependencies with people can lead to unintended or new interactions within a system that were not secured

Therefore, in this paper we argue that we need to move beyond the paradigm of security-by-design and embrace the challenge of securing-a-compromised-system.
