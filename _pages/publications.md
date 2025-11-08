---
layout: single
title: "Publications"
permalink: /publications/
author_profile: true
sitemap: true
---

## Debug Information
Total publications: {{ site.publications | size }}

{% for pub in site.publications %}
- {{ pub.title }} ({{ pub.year }}), first_author: {{ pub.first_author }}
{% endfor %}

<p>All my publications are available from <a href="https://scholar.google.com/citations?user=377WJ7IAAAAJ&hl">Google Scholar</a>.</p>

<h2>First/Corresponding Author</h2>
{% assign first_author_publications = site.publications | where: "first_author", true | sort: 'year' | reverse %}
{% include publication-list publications=first_author_publications %}

<h2>Other Publications</h2>
{% assign other_publications = site.publications | where: "first_author", "!=", true | sort: 'year' | reverse %}
{% include publication-list publications=other_publications %}
