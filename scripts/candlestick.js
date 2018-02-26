function candlestick(inData, coin) {
    var data = inData.filter(d => d.symbol == coin);

    var margin = {top: 30, right: 50, bottom: 50, left: 50},
        width = (innerWidth - margin.left - margin.right),
        height = (innerHeight - margin.top - margin.bottom)*0.5;

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

    var vis1 = d3.select("#candlestick").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Begin data processing
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
}