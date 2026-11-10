
const hikes = [
    { name: "Trexler Border Trail", gain: 1398 },
    { name: "Mount Washington via Huntington Ravine and Lion Head Trail", gain: 4261 },
    { name: "Mount Minsi via Appalachian Trail", gain: 1056 },
    { name: "Blue Hills Ski Resort", gain: 635 },
    { name: "Little Si Trail", gain: 1079 },
    { name: "Alta Via 1", gain: 23600 }
];

const margin = { top: 20, right: 20, bottom: 70, left: 60 };
const width = 760 - margin.left - margin.right;
const height = 380 - margin.top - margin.bottom;

const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .attr("width", "100%")
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const x = d3.scaleBand()
    .domain(hikes.map(d => d.name))
    .range([0, width])
    .padding(0.25);

const y = d3.scaleLinear()
    .domain([0, d3.max(hikes, d => d.gain)])
    .nice()
    .range([height, 0]);

svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "rotate(-25)")
    .style("text-anchor", "end");

svg.append("g").call(d3.axisLeft(y));

svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -45)
    .attr("text-anchor", "middle")
    .text("Elevation gain (ft)");

svg.selectAll(".bar")
    .data(hikes)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.name))
    .attr("y", d => y(d.gain))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.gain))
    .attr("fill", "#6b8f71")
    .append("title")
    .text(d => `${d.name}: ${d.gain} ft`);