---
title: "Quantifying Source Location Privacy Routing Performance via Divergence and Information Loss"
citation: "**Matthew Bradbury** and Arshad Jhumka. Quantifying Source Location Privacy Routing Performance via Divergence and Information Loss. *IEEE Transactions on Information Forensics and Security*, 17:3890–3905, 2022. [doi:10.1109/TIFS.2022.3217385](https://doi.org/10.1109/TIFS.2022.3217385)."
publishDate: 2022-10-14
abstract: "Source location Privacy (SLP) is an important property for security critical applications deployed over a wireless sensor network. This property specifies that the location of the source of messages needs to be kept secret from an eavesdropping adversary that is able to move around the network. Most previous work on SLP has focused on developing protocols to enhance the SLP imparted to the network under various attacker models and other conditions. Other works have focused on analysing the level of SLP being imparted by a specific protocol. In this paper, we introduce the notion of a routing matrix which captures when messages are first received. We then introduce a novel approach where an optimal SLP routing matrix is derived. In this approach, the attacker's movement is modelled as a Markov chain where measures of conditional entropy and divergence are used to compare routing matrices and quantify if they provide high levels of SLP. We propose the notion of a properly competing paths that causes an attacker to divert when moving towards the source. This concept provides the basis for developing a perturbation model, similar to those used in privacy-preserving data mining. We formally prove that properly competing paths are both necessary and sufficient in ensuring the existence of an SLP-aware routing matrix and show their usage in developing an SLP-aware routing matrix. Further, we show how different SLP-aware routing matrices can be obtained through different instantiations of the framework. Those instantiations are obtained based on a notion of information loss achieved through the use of the perturbation model proposed."
file: https://raw.githubusercontent.com/MBradbury/publications/master/papers/TIFS2022.pdf
firstpage: https://raw.githubusercontent.com/MBradbury/publications/master/firstpages/TIFS2022.svg
bibtex: https://raw.githubusercontent.com/MBradbury/publications/master/bibtex/Bradbury_2022_QuantifyingSourceLocation.bib
extends: Bradbury_2017_UnderstandingSourceLocation
project: project-1-PhD
type: paper
paper_type: journal
---

There has been much work investigating [Source Location Privacy](/projects/project-1-PhD) (SLP), including the analysis of techniques. However, one area in which there is a lack of analysis is against adversaries in the network. These adversaries can be cheaply equipped with a laptop, directional antenna and a [cheap software defined radio](https://www.rtl-sdr.com/about-rtl-sdr/) to effectively locate the sources of valuable assets. In this work we investigated how to quantify the amount of information a non-SLP-aware routing matrix reveals to an adversary compared to an SLP-aware routing matrix via a measure of [divergence](https://en.wikipedia.org/wiki/Jensen%E2%80%93Shannon_divergence). Using this measure an algorithm was developed to *transform* a non-SLP-aware routing matrix into an SLP-aware routing matrix.

<!-- readmore -->

<figure>
    <img src="/images/TIFS-1.svg" alt="Protectionless Routing Protocol is transformed by Algorithm 2 into a Protectionless Routing Matrix, which is tranformed by Algorithms 3 and 4 to an SLP Routing Matrix, which needs to be manually tranformed into an SLP Routing Protocol." style="width:100%">
    <figcaption>Methodology developed in the paper. Transform the protectionless routing protocol into protectionless routing matrix and the protectionless routing matrix into a SLP routing matrix. However, the transformation of the SLP routing matrix back into an SLP routing protocol needs to be performed manually.</figcaption>
</figure>

This technique allowed for the transformation of the below protectionless routing matrix into the SLP-aware routing matrix. Assuming the adversary starts at the sink (node number 5) and wants to reach the source (node number 1), the SLP-aware routing matrix is considered to provide SLP as the attacker does not capture the source within the safety period. The safety period is calculated as the capture time under protectionless routing (in this case 2), multiplied by a safety factor (also set to be 2), giving a safety period of 4.

<div style="display: flex;">
  <div style="flex: 25%; padding: 5px;">
    <figure>
        <img src="/images/TIFS-P.svg" alt="A protectionless routing protocol demonstrated on a 3 by 3 grid. The source is at the top left and the sink in the centre. Messages take the shortest path from source to sink." style="width:100%">
        <figcaption>Protectionless Routing Matrix</figcaption>
    </figure>
  </div>
  <div style="flex: 25%; padding: 5px;">
    <figure>
        <img src="/images/TIFS-PA.svg" alt="Attacker movement in response to the protectionless routing protocol shown on a 3 by 3 grid. The attacker takes the shortest path from sink to source." style="width:100%">
        <figcaption>Attacker movement for Protectionless Routing Matrix [Capture time=2]</figcaption>
    </figure>
  </div>
  <div style="flex: 25%; padding: 5px;">
    <figure>
        <img src="/images/TIFS-S.svg" alt="An SLP routing protocol demonstrated on a 3 by 3 grid. The source is at the top left and the sink in the centre. Messages take a long path from source to sink by following nodes around the edge of the network before being delivered at the sink." style="width:100%">
        <figcaption>SLP-aware Routing Matrix</figcaption>
    </figure>
  </div>
  <div style="flex: 25%; padding: 5px;">
    <figure>
        <img src="/images/TIFS-SA.svg" alt="Attacker movement in response to the SLP routing protocol shown on a 3 by 3 grid. The attacker takes the long path around the edge of the network from sink to source caused by the SLP routing protocol." style="width:100%">
        <figcaption>Attacker movement for SLP-aware Routing Matrix [Capture time=6]</figcaption>
    </figure>
  </div>
</div>

Using the measures of entropy and divergence we can see that while there is no uncertainty in the route taken in the SLP-aware routing matrix, the divergence when the adversary starts at the sink (node 5) is maximal for six steps. This is longer than the safety period.

<div>
<img src="/images/TIFS-legend.svg" alt="Legend showing the line style for the 9 potential starting locations." style="width:100%">
<div style="display: flex;">
  <div style="flex: 33%; padding: 5px;">
    <figure>
        <img src="/images/TIFS-HN.svg" alt="Entropy of the protectionless routing matrix showing that when the adversary starts at the sink or nodes far from the source, then there is uncertainty for the first few steps before the entropy drops to 0." style="width:100%">
        <figcaption>Entropy of Protectionless Routing Matrix</figcaption>
    </figure>
  </div>
  <div style="flex: 33%; padding: 5px;">
    <figure>
        <img src="/images/TIFS-HS.svg" alt="Entropy of the protectionless routing matrix showing that there is no entropy for all adversary start locations." style="width:100%">
        <figcaption>Entropy of SLP-aware Routing Matrix</figcaption>
    </figure>
  </div>
  <div style="flex: 33%; padding: 5px;">
    <figure>
        <img src="/images/TIFS-JSD.svg" alt="Divergence between the protectionless and SLP routing matrices. When the adversary starts at the sink the routing protocols diverge for 6 steps, which is the longest period of time the matrices diverge for any start locations." style="width:100%">
        <figcaption>Divergence between the two</figcaption>
    </figure>
  </div>
</div>
</div>

## Importance

The most effective way to evaluate the performance of any Source Location privacy technique is to deploy it on hardware in real environments. However, the testbed facilities that exist [do not always reflect real environments](/publications/Bradbury_2019_ImpactDecreasingTransmit/). Further, there are advantages to analysing abstract algorithms in order to gauge theoretical performance as it is much cheaper to do so. This paper filled a gap in the literature by introducing a technique to analyse performance of algorithms against an adversary with local visibility.

## Perspectives

Analysing the performance of adversaries with a presence in the network is challenging, this is because their visibility changes over time as they move through the network. This is in contrast to an adversary with global visibility, whose visibility never changes. Due to this complexity assumptions need to be made about both the routing algorithms and the adversary, which has necessitated using time homogenous Markov chains, there is interesting scope for future work on the application of time inhomogenous modelling to broaden the applicability of this work to more techniques and adversaries.
