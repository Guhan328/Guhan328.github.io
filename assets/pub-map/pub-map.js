// Based on: https://observablehq.com/@d3/mobile-patent-suits@224

function linkArc(d) {
    const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
    return `
    M${d.source.x},${d.source.y}
    A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
  `;
}

function drag(simulation) {
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
      
    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }
      
    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
      
    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
}

function make_legend(svg_id, color, width) {

    const tickSize = 6;
    const height = 44 + tickSize;
    const marginTop = 18;
    const marginRight = 0;
    const marginBottom = 16 + tickSize;
    const marginLeft = 0;
    const ticks = width / 64;

    const svg = d3.select("#" + svg_id).append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .style("overflow", "visible")
        .style("display", "block");

    const x = d3.scaleBand()
        .domain(color.domain())
        .rangeRound([marginLeft, width - marginRight]);

    svg.append("g")
        .selectAll("rect")
        .data(color.domain())
        .join("rect")
        .attr("x", x)
        .attr("y", marginTop)
        .attr("width", Math.max(0, x.bandwidth() - 1))
        .attr("height", height - marginTop - marginBottom)
        .attr("fill", color);

    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x)
            .tickSize(tickSize))
        .call(g => g.select(".domain").remove());
}

function make_graph(svg_id, types, color, data, height, width) {
    const links = data.links;
    const nodes = data.nodes;
    const publications = data.publications;

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(20).strength(0.5))
        .force("charge", d3.forceManyBody().strength(-400))
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .force('collide', d3.forceCollide().radius(50).iterations(4))
        .force("center", d3.forceCenter(width / 2, height / 2))

        // https://stackoverflow.com/a/62603823
        .force("boundary", forceBoundary(0, 0, width, height));

    const svg = d3.select("#" + svg_id).append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("class", "publication_map")
        .attr("xlink", "http://www.w3.org/1999/xlink");

    // Per-type markers, as they don't inherit styles.
    svg.append("defs").selectAll("marker")
        .data(types)
        .join("marker")
            .attr("id", d => `arrow-${d}`)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 15)
            .attr("refY", -0.5)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
        .append("path")
            .attr("fill", color)
            .attr("d", "M0,-5L10,0L0,5");

    const link = svg.append("g")
            .attr("fill", "none")
            .attr("stroke-width", 3)
        .selectAll("path")
        .data(links)
        .join("path")
            .attr("stroke", d => color(d.type))
            .attr("marker-end", d => `url(${new URL(`#arrow-${d.type}`, location)})`);

    const node = svg.append("g")
            .attr("fill", "currentColor")
            .attr("stroke-linecap", "round")
            .attr("stroke-linejoin", "round")
        .selectAll("g")
        .data(nodes)
        .join("g")
            .call(drag(simulation));

    node.append("a")
            .attr("xlink:href", d => "#" + publications.filter(p => p.ident == d.id).map(p => p.key))
        .append("text")
            //.attr("x", 0)
            //.attr("y", "0.5em")
            .style("text-anchor", "middle")
            .text(d => d.id)
        .clone(true).lower()
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-width", 5);

    simulation.on("tick", () => {
        link.attr("d", linkArc);
        node.attr("transform", d => `translate(${d.x},${d.y})`);
    });
}

function make_publication_map(svg_id) {
    const height = 650;
    const width = document.getElementById(svg_id).offsetWidth;

    d3.json("/assets/pub-map/publications.json").then(links => {

        const types = new Set(links.relations.map(d => d.type));
        const idents = new Set(links.publications.map(d => d.ident));

        const color = d3.scaleOrdinal(types, d3.schemeCategory10);

        const data = {
            "nodes": Array.from(idents, id => ({id})),
            "links": links.relations,
            "publications": links.publications
        };

        make_legend(svg_id, color, width);
        make_graph(svg_id, types, color, data, height, width);
    });
}
