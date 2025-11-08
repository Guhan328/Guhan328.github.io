---
title: "Security-Minded Verification of Cooperative Awareness Messages"
citation: "Marie Farrell, **Matthew Bradbury**, Rafael C. Cardoso, Michael Fisher, Louise A. Dennis, Clare Dixon, Al Tariq Sheik, Hu Yuan, and Carsten Maple. Security-Minded Verification of Cooperative Awareness Messages. *IEEE Transactions on Dependable and Secure Computing*, pages 18, December 2023. [doi:10.1109/TDSC.2023.3345543](https://doi.org/10.1109/TDSC.2023.3345543)."
publishDate: 2023-12-19
abstract: "Autonomous robotic systems systems are both safety- and security-critical, since a breach in system security may impact safety. In such critical systems, formal verification is used to model the system and verify that it obeys specific functional and safety properties. Independently, threat modelling is used to analyse and manage the cyber security threats that such systems may encounter. Both verification and threat analysis serve the purpose of ensuring that the system will be reliable, albeit from differing perspectives. In prior work, we argued that these analyses should be used to inform one another and, in this paper, we extend our previously defined methodology for security-minded verification by incorporating runtime verification. To illustrate our approach, we analyse an algorithm for sending Cooperative Awareness Messages between autonomous vehicles. Our analysis centres on identifying STRIDE security threats. We show how these can be formalised, and subsequently verified, using a combination of formal tools for static aspects, namely Promela/SPIN and Dafny, and generate runtime monitors for dynamic verification. Our approach allows us to focus our verification effort on those security properties that are particularly important and to consider safety and security in tandem, both statically and at runtime."
file: https://raw.githubusercontent.com/MBradbury/publications/master/papers/TDSC2023.pdf
firstpage: https://raw.githubusercontent.com/MBradbury/publications/master/firstpages/TDSC2023.svg
bibtex: https://raw.githubusercontent.com/MBradbury/publications/master/bibtex/Farrell_2023_SecurityMindedVerification.bib
project: project-4-FAIR-SPACE
type: paper
paper_type: journal
extends: Farrell_2019_UsingThreatAnalysis
---

The process of identifying threats to systems via threat modelling is often kept separate from the process of formally proving correctness of systems. In this paper we present a hybrid approach to performing both methodologies simultaneously via an example case-study of [Cooperative Awareness Messages](https://www.etsi.org/deliver/etsi_en/302600_302699/30263702/01.04.01_60/en_30263702v010401p.pdf) used by Connected Vehicles. By using this hybrid approach security properties can be identified and formally verified.

<!-- readmore -->

<figure class="threequarters">
    <img src="/images/goodsecver.svg" alt="Flow diagram showing actions taken in threat modelling and formal verification working together to produce a verified secure system" class="align-center" />
    <figcaption class="align-center">
    A security-minded verification methodology showing how to fuse formal verification and threat modelling
    </figcaption>
</figure>

## Importance

Formal verification is commonly used in systems where a high level of assurance is needed about a system, often in terms of the safe operating of that system. For these systems, security assurances are also important but the process of formally verifying security properties is often a separate process. Combining these two approaches allows the same high level of assurance to be provided about specific security aspects of a system.

## Perspectives

Identifying good security properties that are interesting enough for a meaningful formal verification is hard. For many security properties it may not make sense to verify them, for example, for a verification that a communication channel is encrypted including proofs about cryptographic primitives is excessive for high-level applications. But verifying that the protocol is https instead of http is too trivial to be a useful proof. This is why in this paper we tie the security properties back to a safety property of the system.

Additionally, the suitability of different formal verification techniques depends on the security property. For some security properties (availability from the perspective of generating messages) we were able to use model checking and theorem provers, however, this approach will not be suitable in all cases. We could not verify availability from the perspective of receiving a message using these techniques. This is because eventually the [processing capacity of the device will be exceeded](https://raw.githubusercontent.com/MBradbury/publications/master/papers/IoT_TRaM_Report.pdf), so the availability property cannot hold in all situations. Instead, we used runtime verification to implement a monitor for the availability property from the perspective of receiving messages.

So while important to provide strong guarantees about the system's security, it can be challenging to implement useful verification of such properties. Finally, the threat modelling process will need to identify security properties of interest, so unknown threats will still not be considered in this security-minded verification approach.
