---
title: "Attributes and Dimensions of Trust in Secure Systems"
citation: "**Matthew Bradbury**, Daniel Prince, Victoria Marcinkiewicz, and Tim Watson. Attributes and Dimensions of Trust in Secure Systems. In *Proceedings of the 12th International Conference on the Internet of Things*, STaR-IoT'22, 179–186. Delft, Netherlands, 7 November 2022. ACM. [doi:10.1145/3567445.3571105](https://doi.org/10.1145/3567445.3571105)."
publishDate: 2022-11-07
abstract: "What is it to be trusted? This is an important question as trust is increasingly placed in a system and the degree to which a system is trusted is increasingly being assessed. However, there are issues with how related terms are used. Many definitions focus on one attribute of trust (typically behaviour) preventing that definition from being used for other attributes (e.g., identity). This is confused further by conflating what trustors measure about a trustee and what conclusions a trustor reaches about a trustee. Therefore, in this paper we present definitions of measures (trustiness and trustworthiness) and conclusions (trusted and trustworthy). These definitions are general and do not refer to a specific attribute allowing them to be used with arbitrary attributes which are being assessed (e.g., identity, behaviour, limitation, execution, correctness, data, environment). In addition, in order to demonstrate the complexities of describing if a trustee is designated as trusted or trustworthy, a set of dimensions are defined to describe attributes (time, scale, proactive/reactive, strength, scope, source). Finally, an example system is classified using these attributes and their dimensions in order to highlight the complexities of describing a system as holistically trusted or trustworthy."
file: https://raw.githubusercontent.com/MBradbury/publications/master/papers/STaR-IoT2022.pdf
firstpage: https://raw.githubusercontent.com/MBradbury/publications/master/firstpages/STaR-IoT2022.svg
bibtex: https://raw.githubusercontent.com/MBradbury/publications/master/bibtex/Bradbury_2022_AttributesDimensionsTrust.bib
presentation: https://raw.githubusercontent.com/MBradbury/publications/master/presentations/STaR-IoT2022.pdf
type: paper
paper_type: workshop
---

In this paper we set out our position on the concept of trust in secure systems. This position evolved from [previous work investigating trust-based task offloading](/projects/project-6-TEAM). The views in this paper intended to resolve issues that we perceived with the use of *trust* in literature produced by the security community. To resolve this we provided more general definitions for trust and related concepts, splitting them into the label that is assigned (trusted/trustworthy) and the measurements (trustiness/trustworthiness). We also identified a set of trust attributes that could be applied to this more general definition and explored dimensions along which attributes could be measured.

<!-- readmore -->

Prior to this work we noted that:

1. The majority of existing work tends to redefine what trust means depending on what the work was investigating.
2. That many works focus on trust in the *behaviour* of a trustee, so definitions of trust tend to focus on *behavioural* trust.
3. Many other types of trust exist different to behavioural trust.
4. Trust and trustworthy are often used as synonyms, but we believe they are different concepts.
5. Trust is often assumed or placed in an entire system (or subsystem) without evidence to support this assignment.

So the aim of this paper was to:
1) define trust (and related concepts) in a general way, such that they could be paired with
2) different trust attributes that specify what attribute of a system is being assessed, and
3) specify dimensions along which those attributes could be measured.

### Definitions

* Trustiness &mdash; A measurement of the attributes under consideration by the trustor to assess the ability of the trustee to meet the trustors trust expectations.
* Trustworthiness &mdash; A measure of the uncertainty in the trustiness the trustor has in the trustee.
* Trusted &mdash; An entity in a system is deemed to be trusted when the trustiness is sufficiently high.
* Trustworthy &mdash; An entity in a system is deemed to be trustworthy when the trustworthiness is sufficiently high.

Where the trustor is the entity performing an assessment of trust or assuming trust in a trustee.

### Attributes

Using the example proactive [trust-based task offloading system](/publications/Bradbury_2021_TrustTrackersComputation) we classified examined the different trust attributes on the proposed scale. The key take away is that while there was an element on trust assessment in this system, it is not possible to describe it as *holistically trusted* because some attributes were not evidenced and other attributes were evidenced to different degrees.

| Attribute       | Scale   | Activity           | Scope       | Strength    | Source   | Time of Evidence  |
|-----------------|---------|--------------------|-------------|-------------|----------|-------------------|
| Identity        | Ordinal | Reactive           | Distributed | High        | Direct   | Sampled           |
| Behaviour       | Ratio   | Proactive          | Local       | Medium      | Direct   | Sampled           |
| Limitation      | &mdash; | &mdash;            | None        | &mdash;     | &mdash;  | Assumed           |
| Execution       | &mdash; | &mdash;            | None        | &mdash;     | &mdash;  | Assumed           |
| Correctness     | Varies  | Proactive          | Global      | Low         | Indirect | Single            |
| Data Accuracy   | &mdash; | &mdash;            | None        | &mdash;     | &mdash;  | Assumed           |
| Data Integrity  | Ordinal | Reactive           | Local       | High        | Direct   | Sampled           |
| Data Provenance | Ordinal | Reactive           | Local       | High/Medium | Direct   | Sampled           |
| Environment     | Ratio   | Reactive/Proactive | Distributed | Varies      | Direct   | Sampled/Continual |


## Importance

Understanding what is meant by trust is highly important, but is typically left poorly specified. For example, the 2014 EU regulation on "electronic identification and trust services for electronic transactions in the internal market" ([Regulation No 910/2014](https://eur-lex.europa.eu/eli/reg/2014/910/oj)) has only 200 references to the word trust, but never defines what is meant by it.

## Perspectives

This is not the first piece of work in which views on the different types of trust attributes have been explored. [Jøsang et al](https://doi.org/10.1016/j.dss.2005.05.019), [Grandison and Sloman](https://doi.org/10.1109/COMST.2000.5340804) and [Daubert](https://doi.org/10.1109/ICCW.2015.7247581) have all proposed similar sets of trust attributes. We noticed that the trust attributes of interest have evolved over time, likely due to the different ways in which trust is being assessed. These works have also looked at uncertainty (for example, with [belief, disbelief, uncertainty](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.60.5461&rep=rep1&type=pdf)), but this has typically been assessed in what would have been called *trustiness* instead of *trustworthiness* as we have defined them.
