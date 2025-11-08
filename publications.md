---
layout: page
title: "所有出版物"
permalink: /publications/
---

{% assign pubs = site.data.publications | sort: "year" | reverse %}

## 按年份排序

{% for pub in pubs %}
### {{ pub.title }}
**作者**: {{ pub.authors }}  
**出处**: {{ pub.venue }}, {{ pub.year }}  
**类型**: 
{% case pub.type %}
  {% when "journal" %}期刊论文
  {% when "conference" %}会议论文
  {% when "workshop" %}研讨会论文
  {% when "thesis" %}学位论文
  {% when "techreport" %}技术报告
  {% else %}其他
{% endcase %}

<!-- 自动生成 citation -->
{{ pub.authors }}. ({{ pub.year }}). {{ pub.title }}. {{ pub.venue }}.

{% if pub.url %} [<a href="{{ pub.url }}">链接</a>]{% endif %}
{% if pub.abstract %}
  
**摘要**: {{ pub.abstract }}
{% endif %}

---
{% endfor %}


