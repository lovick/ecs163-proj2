function scatter(inData, inDay) {
    console.log("Initializing Scatter");
    var parseDate = d3.timeParse("%Y-%m-%d");
    var margin = {top: 20, right: 10, bottom: 75, left: 70},
        width = (innerWidth - margin.left - margin.right)*0.18,
        height = (innerHeight - margin.top - margin.bottom)*0.55;

    var vis3 = d3.select("#scatter").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear().rangeRound([0, width]);
    var y = d3.scalePoint().rangeRound([height, 0]);
    var r = d3.scaleLinear().rangeRound([10, 50]);

    var xValue = d => +d.spread;
    var yValue = d => d.symbol;
    var rValue = d => +d.volume;

    var xAxis = d3.axisBottom()
        .scale(x)
        .tickSize(-10)
        .ticks(5);

    var yAxis = d3.axisLeft()
        .scale(y)
        .tickSize(-10);

    var c = d3.scaleLinear()
        .range(["steelblue", "brown"])
        .interpolate(d3.interpolateHcl);

    this.update = function(dIn, day) {
        console.log("Updating Scatter");
        vis3.selectAll('*').remove();

        var data = dIn.filter(d => d.date == day);
        y.domain(d3.map(data, yValue).keys());
        x.domain(d3.extent(data, xValue));
        r.domain(d3.extent(data, rValue));
        c.domain(d3.extent(data, rValue));
    
        vis3.append("g")
            .attr("transform", "translate(-15,0)")
            .selectAll('circle').data(data)
            .enter().append('circle')
                .attr('class', 'dot')
                .attr('cx', function(d) { return x(xValue(d)); })
                .attr('cy', function(d) { return y(yValue(d)); })
                .attr('r', function (d) { return r(rValue(d)); })
                .attr('fill', function(d) { return c(rValue(d)); })
                .attr('fill-opacity', 0.6)
                .text("text", function(d) { return rValue(d); });
        vis3.append("g")
            .attr("transform", "translate(-15, "+(height+30)+")")
            .call(xAxis);
        vis3.append("g")
            .attr("transform", "translate(-50, 0)")
            .call(yAxis);
    
        // X Axis Label
        vis3.append("text")             
            .attr("transform",
                    "translate(" + (width/2) + " ," + 
                                (height + margin.top + 32) + ")")
            .style("text-anchor", "middle")
            .text("Spread in value over day"); 
        vis3.append("text")             
            .attr("transform",
                    "translate(" + (width/2) + " ," + 
                                (height + margin.top + 45) + ")")
            .style("text-anchor", "middle")
            .text("Radius + Color show volume of transactions"); 
    }

    this.update(inData, inDay);
}