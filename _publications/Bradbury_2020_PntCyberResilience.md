---
title: "PNT Cyber Resilience: a Lab2Live Observer Based Approach, Report 2: Specifications for Cyber Testing Facilities"
citation: "**Matthew Bradbury**, Elijah Adegoke, Erik Kampert, Matthew Higgins, Tim Watson, Paul Jennings, Colin Ford, Guy Buesnel, and Steve Hickling. PNT Cyber Resilience: a Lab2Live Observer Based Approach, Report 2: Specifications for Cyber Testing Facilities. Technical Report 2, University of Warwick, Coventry, UK, April 2020. Version 1.2. URL: <https://wrap.warwick.ac.uk/139522/>."
publishDate: 2020-04-01
abstract: "The use of global navigation satellite systems (GNSS) such as GPS and Galileo are vital sources of positioning, navigation and timing (PNT) information for vehicles. This information is of critical importance for connected autonomous vehicles (CAVs) due to their dependence on this information for localisation, route planning and situational awareness. A downside to solely relying on GNSS for PNT is that the signal strength arriving from navigation satellites in space is weak and currently there is no authentication included in the civilian GNSS adopted in the automotive industry. This means that cyber-attacks against the GNSS signal via jamming or spoofing are attractive to adversaries due to the potentially high impact they can achieve. This report introduces specifications and recommendations for GNSS cyber-security test facilities for CAVs. These specifications are based on a survey of academic literature, interviews with a select group of experts, and experiences obtained performing laboratory and real-world testing (shown in Figure 1)."
file: https://raw.githubusercontent.com/MBradbury/publications/master/papers/PNTReport2.pdf
firstpage: https://raw.githubusercontent.com/MBradbury/publications/master/firstpages/PNTReport2.svg
bibtex: https://raw.githubusercontent.com/MBradbury/publications/master/bibtex/Bradbury_2020_PntCyberResilience.bib
project: project-5-PNT
type: techreport
paper_type: techreport
---

Global navigation satellite systems (GNSS) such as [GPS](https://www.gps.gov/) and [Galileo](https://www.gsa.europa.eu/european-gnss/galileo/galileo-european-global-satellite-based-navigation-system) are vital sources of positioning, navigation and timing (PNT) information for vehicles. This information is of critical importance for connected autonomous vehicles (CAVs) due to their dependence on this information for localisation, route planning, and situational awareness. A downside to solely relying on GNSS for PNT is that the signal strength arriving from navigation satellites in space is weak and currently there is no authentication included in the civilian GNSS adopted in the automotive industry. This means that cyber-attacks against the GNSS signal via jamming or spoofing are [attractive](https://www.gov.uk/government/publications/satellite-derived-time-and-position-blackett-review) to adversaries due to the potentially high impact they can achieve.

This report introduces specifications and recommendations for GNSS cyber-security test facilities for CAVs. These specifications are based on a survey of academic literature, interviews with a select group of experts, and experiences obtained performing laboratory and real-world testing.

<!-- readmore -->

## Importance

GNSS now forms part of a country's critical national infrastructure. Position information is vital for many services such as CAVs, but also areas such as precision agriculture. However, the timing information provided by GNSSs can be even more important, as indicated by the UK Government's plan to create a [National Timing Centre](https://www.gov.uk/government/news/worlds-first-timing-centre-to-protect-uk-from-risk-of-satellite-failure) to provide resilience in the case of GNSS failure or attacks against them.

It is important that suitable testing facilities and strategies are in place early to ensure that when CAVs are deployed in real-world scenarios they are able to tolerate GNSS jamming and spoofing attacks. Using PNT attack emulators (as performed in this project) is one solution that allows this testing to be performed without impacting other GNSS users.

## Perspectives

This short project highlighted the feasibility of performing emulation of jamming and spoofing attacks against CAV PNT systems. However, it also highlighted the need for standardised tests and metrics as well facilities that are capable of performing these tests. While some capabilities [do exist within the UK](https://zenzic.io/testbed-uk/) to perform this testing, further effort is required to ensure a broad range of testing capabilities exist and are maintained.

## Related

For more information on the identified threats please see [Report 1](/publications/Adegoke_2020_PntCyberResilience).
