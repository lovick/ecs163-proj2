function donutMultiples(offset, dIn, dayIn, prop) {
    console.log("Initializing Donut");
    var margin = {top: 10, right: 50, bottom: 50, left: 50},
        width = (innerWidth - margin.left - margin.right)*0.2,
        height = (innerHeight - margin.top - margin.bottom)*0.5;

    var svg = d3.select("#donut").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + offset + "," + 150 + ")");

    var parseDate = d3.timeParse("%Y-%m-%d");

    var c = d3.scaleLinear()
        .range(["steelblue", "brown"])
        .interpolate(d3.interpolateHcl);

    var arc = d3.arc()
        .innerRadius(1*height/8)
        .outerRadius(1.25*height/4);

    this.update = function (dataIn, day, prop) {
        svg.selectAll("*").remove();
        console.log("Updating donut");
        var data = dataIn.filter(d => d.date == day);
        c.domain([0, 2*Math.PI]);
        var pie = d3.pie()
            .value(function(d) { return +d[prop]; });
        
        // open
        svg.selectAll("path").data(pie(data)).enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", function (d) { return c(d.endAngle - d.startAngle); });
    }

    this.update(dIn, dayIn, "open");
}