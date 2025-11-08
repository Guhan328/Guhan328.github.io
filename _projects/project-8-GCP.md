---
title: "Generalised Context Privacy"
excerpt: "This project will develop techniques to reduce information adversaries can gain from observing cyber physical systems. Using this the capability to develop new context privacy techniques for new systems and scenarios faster will be provided so novel context privacy threats can be rapidly addressed. Theoretical foundations will be used to support practical deployments."
duration: "January 2024 &ndash; December 2026"
location: "School of Computing and Communications, Lancaster University"
image:
  src: /images/gcp-action.svg
  alt: "A system transitioning from one state to another via an action it takes. The adversary observes the old state and action and uses it to derive information about the system."
collection: projects
---

Connectivity and automation are increasingly being introduced to physical systems that previously lacked them. This introduces new threats to these systems, including by revealing sensitive information to an adversary making observations on the system and the *context* in which the system takes *actions*. Many domains (e.g., [wireless sensor networks](/projects/project-1-PhD), [vehicles](/publications/Bradbury_2020_PrivacyChallengesProtecting)) have independently had context privacy preserving techniques developed for these threats (e.g., [onion routing](https://doi.org/10.1109/49.668972), [change in identity](https://doi.org/10.1109/VNC.2009.5416380), [change in behaviour](https://doi.org/10.1145/1029102.1029117)).


<figure class="fig-align-center half">
<img src="/images/gcp-contextprivacy.svg" alt="Different privacy threats at different stages conveying information to an adversary. Context privacy threat via direct observations. Content privacy threats to data." />
<figcaption>
Example privacy threats at various stages of an arbitrary system performing actions.
</figcaption>
</figure>

## Importance

Developing context privacy preserving techniques is a lengthy process and does not allow for rapid responses to novel context privacy threats. This poses a danger to users of systems which operate without suitable context privacy controls and potentially leads to sensitive operational information being revealed. This project will work towards providing a capability to "prevent and resist cyber attacks more effectively", which was highlighted in the UK's [National Cyber Strategy 2022](https://www.gov.uk/government/publications/national-cyber-strategy-2022/national-cyber-security-strategy-2022).

## Aims

This project will:

1. develop a suite of context privacy controls for an arbitrary system,
2. demonstrate their efficacy via suitable quantification, and then
3. using example systems, develop domain-specific translators such that the general context privacy techniques can be applied to real-world systems.

By doing so, when novel context privacy threats are identified, only domain-specific translators need to be developed. This allows for faster and more agile responses to novel context privacy threats, thus minimising information conveyed by system actions to an adversary &mdash; protecting both the system and its users.

<figure class="fig-align-center half">
<img src="/images/gcp-solution.svg" alt="Using domain specific translators to apply generalised context privacy controls for various applications." />
<figcaption>
Using context privacy solutions for the general model and applying them to specific applications.
</figcaption>
</figure>

## Research Questions

This research project will address how controls should be introduced on actions taken by an arbitrary system to reduce the information revealed to an adversary observing that system. This can be divided into three focused research questions:

1. What controls are required to reduce the information an arbitrary system reveals during its operation?
2. How should context privacy the system and the cost of providing it be quantified?
3. How should techniques for providing context privacy on an arbitrary system be translated to a real-world system?

## Information

Role: Principal Investigator

Funder: [Engineering and Physical Sciences Research Council](https://epsrc.ukri.org) [[EP/X040038/1](https://gtr.ukri.org/projects?ref=EP/X040038/1)]

Duration: {{ page.duration }}

Links:
 * [EPSRC Prioritisation Panel](https://gow.epsrc.ukri.org/NGBOViewPanelROL.aspx?PanelId=1-EHFWY1&RankingListId=1-EHFWYB)
