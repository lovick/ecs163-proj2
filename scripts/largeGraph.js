function vis1() {
    var margin = {top: 30, right: 50, bottom: 50, left: 50},
        width = (innerWidth - margin.left - margin.right),
        height = (innerHeight - margin.top - margin.bottom);

    var parseDate = d3.timeParse("%Y-%m-%d");
    var x = d3.scaleTime().rangeRound([0,width]);
    var y = d3.scaleLinear().rangeRound([height, 0]);
    var line = d3.line()
        .x(function(d) { return x(parseDate(d.date)); })
        .y(function(d) { return y(+d.open); });

    var vVal = d => +d.close;

    var cOld = d3.scaleLog()
        .range(["steelblue", "crimson"])
        .interpolate(d3.interpolateHcl);

    var c = function(d) {
        if (+d.close > +d.open) {
            return "#00FF00";
        } else {
            return "#ff0000";
        }
    }

    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y);

    var vis1 = d3.select("#largeGraph").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("BTCData.csv", function(error, data) {
        console.log(d3.extent(data, function (d) { return parseDate(d.date); }));
        x.domain(d3.extent(data, function(d) { return parseDate(d.date); }));
        y.domain(d3.extent(data, function(d) { return +d.close; }));
        cOld.domain(d3.extent(data, function(d) { return +d.close; }));

        // Adding lines
        foreground = vis1.append("g")
            .attr("class", "foreground")
            .selectAll("rect")
            .data(data)
            .enter().append("rect")
            .attr("x", function (d) {
                return x(parseDate(d.date)) - 2 /* Adjust this later to be dynamic width */;
            })
            .attr("y", function (d) {
                if (+d.close > +d.open) {
                    return y(+d.close);
                } else {
                    return y(+d.open);
                }
            })
            .attr("height", function (d) {
                return Math.max(Math.abs( y(+d.close) - y(+d.open) ), 1);
            })
            .attr("width", "1px")
            .attr("stroke", function(d) {
                return c(d);
            });

        vis1.append("g")
            .attr("transform", "translate(0,"+(height)+")")
            .call(xAxis);
        vis1.append("g")
            .attr("transform", "translate(0, 0)")
            .call(yAxis);
        /*var g = vis1.selectAll(".dimension")
            .data(data)
            .enter().append("g")
            .attr("class", "dimension")
            .attr("transform", function(d) { return "translate(" + x(d) + ")"; })

        g.append("g")
            .attr("class", "axis")
            .each(function(d) { d3.select(this).call(d3.axisLeft(y[d])); })
            .append("text")
            .style("text-anchor", "middle")
            .attr("y", -9)
            .text(function(d) { return "label"; });*/

    });
}
vis1();