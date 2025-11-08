---
title: "Teaching Penetration Testing"
collection: talks
type: "Talk"
permalink: /talks/2024-09-05-security-teaching
venue: "Lancaster University"
publishDate: 2024-09-05
location: "Lancaster, UK"
presentation: /downloads/2024-09-05-security-teaching.pdf
image:
  src: /images/blooms.png
  alt: "Bloom's Taxonomy shown as a pyramid of six layers including: remember, understand, apply, analyse, evaluate and create"
---

At a Lancaster University education event, I presented work that I have been undertaking to improve the delivery of SCC.442 Penetration Testing.

There were three main problems that had been encountered in previous years:
1. Students had unclear expectations in terms of what was expected from them
2. Students struggled to approach technical problems in assessments
3. Manual construction of lab and assessment material was time-consuming and unreliable

<!-- readmore -->

## Issue 1 - Addressing Expectations

To identify clear expectations, the [Revised Blooms Taxonomy](https://www.tandfonline.com/doi/abs/10.1207/S15430421TIP4104_2) has been mapped to the [Cyber Kill Chain](https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html) to provide details on what is expected from students at different levels of attainment.

<figure class="half">
    <img src="/images/blooms.png" alt="Bloom's Taxonomy shown as a pyramid of six layers including: remember, understand, apply, analyse, evaluate and create" />
    <img src="/images/THE-CYBER-KILL-CHAIN-body.png.pc-adaptive.1280.medium.png" alt="Cyber Kill Chain showing the seven steps of: Reconnaissance, Weaponisation, Delivery, Exploitation, Installation, Command & Control, and Actions on Objectives" />
<figcaption>
The Revised Bloom's Taxonomy and The Lockheed Martin Cyber Kill Chain.
</figcaption>
</figure>

<table id='map-bloom-ckc'>
<thead>
<tr>
<td></td>
<td>Reconnaissance</td>
<td>Weaponization</td>
<td>Delivery</td>
<td>Exploitation</td>
<td>Installation</td>
<td>C&amp;C</td>
<td>Act</td>
</tr>
</thead>
<tbody>
<tr>
<td>Remember</td>
<td>Know what the different commands and tools do.</td>
</tr>
<tr>
<td>Understand</td>
<td>Understand what configuration to run the different commands and tools with.</td>
</tr>
<tr>
<td>Apply</td>
<td>Ability to execute commands and run tools.</td>
</tr>
<tr>
<td>Analyse</td>
<td>Attributing recon. to services</td>
<td>Identify the types and versions of system and software</td>
<td>Identify how a payload or exploit should be delivered</td>
<td>Processing output from exploit</td>
<td>Determine if malware install is needed</td>
<td>What new actions can possibly be performed?</td>
<td>Determine next steps to achieve goal</td>
</tr>
<tr>
<td></td>
<td>Parse nmap scan and understand output</td>
<td>Parse nmap scan to identify services &amp; versions</td>
<td>Use webserver to deploy reverse shell</td>
<td>Examine output from SQL injection</td>
<td>Analyse if msfvenom should be used</td>
<td>Identify if elevate privilege is possible</td>
<td>Identify how to elevate privilege</td>
</tr>
<tr>
<td>Evaluate</td>
<td>Testing recon. result</td>
<td>Identify vulns. of system or software</td>
<td>Did the delivery succed?</td>
<td>Did the exploit succed?</td>
<td>Did the installation succed?</td>
<td>Can new actions be performed?</td>
<td>Decide which steps are most effective</td>
</tr>
<tr>
<td></td>
<td>Test recon. by opening browser on port 80</td>
<td>Search databases for vulns.</td>
<td>Check if file transfer succeeded</td>
<td>Check if exploit succeeded</td>
<td>Check if reverse shell was successful</td>
<td>Consider pivoting</td>
<td>Consider best approach to pivot</td>
</tr>
<tr>
<td>Create</td>
<td>Planning next steps based on recon.</td>
<td>Build malware or design exploit</td>
<td>Deliver malware or exploit</td>
<td>Produce an outcome from the malware or exploit</td>
<td>Malware installed or exploit usable</td>
<td>Obtained controllable system</td>
<td>Achieve objectives</td>
</tr>
<tr>
<td></td>
<td>Decide to perform privilege elevation</td>
<td>Built reverse shell using msfvenom</td>
<td>Reverse shell delivered to target</td>
<td>Exploit target to elevate privilege</td>
<td>Reverse shell installed on target</td>
<td>Connect reverse shell to Metasploit</td>
<td>Capture the flag</td>
</tr>
</tbody>
<caption>Mapping the Revised Bloom's Taxonomy and the Cyber Kill Chain to SCC.442 Lab Exercises and Assessment with Examples</caption>
</table>

## Issue 2 - Approach to Problem Solving

An issue encountered in the past is that students treat lab exercises as a set of instructions to compromise a system. When applying these instructions during assessment, they end up failing to exploit the system due to its configuration being different. So students need to be presented with content that clearly encourages them to think about **why** they are taking certain actions.

* Encourage a scientific approach where students start a lab with a hypothesis and then reflect on this hypothesis at the end of the labs.
* Prompt students to consider why they are taking specific actions.
* Provide context as to why certain actions are appropriate.
* Start with large amounts of guidance and then reduce the guidance over time.
* Ensure students are exposed to appropriate sources throughout the labs, such as [NVD](https://nvd.nist.gov), [CWE](https://cwe.mitre.org), and [CAPEC](https://capec.mitre.org/).
