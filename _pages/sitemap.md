---
layout: archive
title: "Sitemap"
permalink: /sitemap/
author_profile: true
sitemap: false
---

A list of all the posts and pages found on the site. For you robots out there is an [XML version]({{ '/sitemap.xml' | absolute_url }}) available for digesting as well.

<h2>Pages</h2>
{% for post in site.pages %}
{% if post.sitemap %}
{% include archive-single.html %}
{{ post.content }}
{% endif %}
{% endfor %}

{% assign written_label = nil %}

{% for collection in site.collections %}
{% if collection.output %}
{% if collection.label != written_label %}
<h2>{{ collection.label | capitalize }}</h2>
{% assign written_label = collection.label %}
{% endif %}
{% for post in collection.docs %}
{% include archive-single.html %}
{% endfor %}
{% endif %}
{% endfor %}
