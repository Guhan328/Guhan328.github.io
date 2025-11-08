---
title: "SlowCoach: Mutating Code to Simulate Performance Bugs"
citation: "Yiqun Chen, Oliver Schwahn, Roberto Natella, **Matthew Bradbury**, and Neeraj Suri. SlowCoach: Mutating Code to Simulate Performance Bugs. In *The 33rd IEEE International Symposium on Software Reliability Engineering*, ISSRE, 274–285. Charlotte, North Carolina, USA, 31 October – 3 November 2022. [doi:10.1109/ISSRE55969.2022.00035](https://doi.org/10.1109/ISSRE55969.2022.00035)."
publishDate: 2022-10-31
abstract: "Performance bugs are unnecessarily inefficient code chunks in software codebases that cause prolonged execution times and degraded computational resource utilization. For performance bug diagnostics, tools that aid in the identification of said bugs, such as benchmarks and profilers, are commonly employed. However, due to factors such as insufficient workloads or ineffective benchmarks, software defects related to code inefficiencies are inherently difficult to diagnose. Hence, the capabilities of performance bug diagnostic tools are limited and performance bug instances may be missed. Traditional mutation testing (MT) is a technique for quantifying a test suite's ability to find functional bugs by mutating the code of the test subject. Similarly, we adopt performance mutation testing (PMT) to evaluate performance bug diagnostic tools and identify where improvements need to be made to a performance testing methodology. We carefully investigate the different performance bug fault models and how synthesized performance bugs based on these models can evaluate benchmarks and workload selection to help improve performance diagnostics. In this paper, we present the design of our PMT framework, SlowCoach, and evaluate it with over 1600 mutants from 4 real-world software projects."
file: https://raw.githubusercontent.com/MBradbury/publications/master/papers/ISSRE2022.pdf
firstpage: https://raw.githubusercontent.com/MBradbury/publications/master/firstpages/ISSRE2022.svg
presentation: https://raw.githubusercontent.com/MBradbury/publications/master/presentations/ISSRE2022.pdf
bibtex: https://raw.githubusercontent.com/MBradbury/publications/master/bibtex/Chen_2022_SlowCoach_MutatingCode.bib
dataset: https://github.com/61OlkVq8/PMT
type: paper
paper_type: conference
---

It is important that software runs fast. Better performance means that software is more responsive, consumes less energy, and provides less scope for adversaries to perform denial of service attacks that take advantage of poor performance. In order to identify performance issues, diagnosis tools need to be used to analyse software performance. Like other software, it is important that we are able to investigate the efficacy of performance diagnostic tools (such as [perf](https://perf.wiki.kernel.org/index.php/Main_Page)).

[Mutation testing](https://ieeexplore.ieee.org/abstract/document/5487526) has been used to analyse the performance of a test suite's ability to detect bugs in code. This is done by injecting mutations which leads to incorrect behaviour in the source code, and allows evaluation of the test suite's capability to detect that inserted mutation. In this paper we extend the idea of mutation testing to performance mutation testing, in order to be able to test how well performance diagnostic tools are able to detect performance bugs.

<!-- readmore -->

<figure>
    <img src="/images/arch4-crop.svg" alt="Diagram showing the tasks to perform performance mutation testing, including using a mutation tool on source code to generate mutants which are then compiled and benchmarked, before finally being compared against the performance of the unmutated executable." />
    <figcaption>
    Workflow of performing performance mutation testing
    </figcaption>
</figure>

## Importance

As with all software it is important that we can test it. Performance diagnosis tools are no different in this regard. The reason performance mutation testing is so valuable, is because it allows the capability to generate large sets of test inputs based on a specific set of rules for arbitrary programs (in a specific language). Otherwise, workloads and benchmarks would need to be manually created and maintained.

Without a profiler, I would not have been able to [contribute performance improvements](https://github.com/contiki-ng/cooja/pull/25) to [COOJA](https://github.com/contiki-ng/cooja) which is used to simulate wireless sensor networks.

## Perspectives

A downside to this approach is the quantity of time it takes to generate mutants and evaluate them. However, there is potential for interesting performance issues to be identified. In the future there is a need to consider more complex performance mutations. In addition, the ability to inject mutations in the form of algorithms with worse computational or space complexity should be considered.
