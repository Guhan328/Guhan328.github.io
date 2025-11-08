---
title: "PNT Cyber Resilience: a Lab2Live Observer Based Approach, Report 1: GNSS Resilience and Identified Vulnerabilities"
citation: "Elijah Adegoke, **Matthew Bradbury**, Erik Kampert, Matthew Higgins, Tim Watson, Paul Jennings, Colin Ford, Guy Buesnel, and Steve Hickling. PNT Cyber Resilience: a Lab2Live Observer Based Approach, Report 1: GNSS Resilience and Identified Vulnerabilities. Technical Report 1, University of Warwick, Coventry, UK, April 2020. Version 1.0. URL: <https://wrap.warwick.ac.uk/139519/>."
publishDate: 2020-04-01
abstract: "The use of global navigation satellite systems (GNSS) such as GPS and Galileo are vital sources of positioning, navigation and timing (PNT) information for vehicles. This information is of critical importance for connected autonomous vehicles (CAVs) due to their dependence on this information for localisation, route planning and situational awareness. A downside to solely relying on GNSS for PNT is that the signal strength arriving from navigation satellites in space is weak and currently there is no authentication included in the civilian GNSS adopted in the automotive industry. This means that cyber-attacks against the GNSS signal via jamming or spoofing are attractive to adversaries due to the potentially high impact they can achieve. This report reviews the vulnerabilities of GNSS services for CAVs (a summary is shown in Figure 1), as well as detection and mitigating techniques, summarises the opinions on PNT cyber testing sourced from a select group of experts, and finishes with a description of the associated lab-based and real-world feasibility study and proposed research methodology."
file: https://raw.githubusercontent.com/MBradbury/publications/master/papers/PNTReport1.pdf
firstpage: https://raw.githubusercontent.com/MBradbury/publications/master/firstpages/PNTReport1.svg
bibtex: https://raw.githubusercontent.com/MBradbury/publications/master/bibtex/Adegoke_2020_PntCyberResilience.bib
project: project-5-PNT
type: techreport
paper_type: techreport
---

Global navigation satellite systems (GNSS) such as [GPS](https://www.gps.gov/) and [Galileo](https://www.gsa.europa.eu/european-gnss/galileo/galileo-european-global-satellite-based-navigation-system) are vital sources of positioning, navigation and timing (PNT) information for vehicles. This information is of critical importance for connected autonomous vehicles (CAVs) due to their dependence on this information for localisation, route planning, and situational awareness. A downside to solely relying on GNSS for PNT is that the signal strength arriving from navigation satellites in space is weak and currently there is no authentication included in the civilian GNSS adopted in the automotive industry. This means that cyber-attacks against the GNSS signal via jamming or spoofing are [attractive](https://www.gov.uk/government/publications/satellite-derived-time-and-position-blackett-review) to adversaries due to the potentially high impact they can achieve.

This report reviews the vulnerabilities of GNSS services for CAVs, as well as detection and mitigation techniques, summarises the opinions on PNT cybertesting sourced from a select group of experts, and finishes with a description of the associated lab-based and real-world feasibility study and proposed research methodology.

<!-- readmore -->

## Importance

This project has shown that the chosen Lab2Live methodological approach, starting with lab-based testing on isolated GNSS-receivers and finishing with real-world tests on a blackbox CAV, provides the complimentary and comprehensive results that are required to evaluate a system's PNT cyber resilience.

## Perspectives

PNT equipment needs to be tested both in isolation, as part of a CAV or other element of a Connected and Automated Mobility system, and as part of the system as a whole. Attacks will have different impacts when considering a single component or a system-of-systems. For example, V2X communication may require timing information in order to send messages in the correct time slots. If an attack causes a PNT system on a CAV to have an incorrect time, it will not only affect local systems that depend on accurate time but also systems that the CAV was previously able to communicate with.

## Related

For more information on the proposed recommendations and specifications for testing please see [Report 2](/publications/Bradbury_2020_PntCyberResilience).
