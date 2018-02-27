function lineChart(inData, updateFunc) {

    var margin = {top: 30, right: 50, bottom: 50, left: 50},
        width = (innerWidth - margin.left - margin.right),
        height = (innerHeight - margin.top - margin.bottom)*0.35;

    var parseDate = d3.timeParse("%Y-%m-%d");
    var x = d3.scaleTime().rangeRound([0,width]);
    var y = d3.scaleLinear().rangeRound([height, 0]);
    var line = d3.line()
        .x(function(d) { return x(parseDate(d.date)); })
        .y(function(d) { return y(+d.open); });
        
    var svg = d3.select("#donut").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    this.update = function(data, upd) {
        svg.selectAll('*').remove();

        // Scale the range of the data
        x.domain(d3.extent(data, function(d) { return parseDate(d.date); }));
        y.domain(d3.extent(data, function(d) { return +d.close; }));

        // Nest the entries by symbol
        var dataNest = d3.nest()
            .key(function(d) {return d.symbol;})
            .entries(data);

        // set the colour scale
        var c = d3.scaleOrdinal(d3.schemeCategory10);


        legendSpace = width/10; // spacing for the legend

        // Loop through each symbol / key
        dataNest.forEach(function(d,i) { 

            svg.append("path")
                .attr("class", "line")
                .style("stroke", function() { // Add the colours dynamically
                    return c(d.key); 
                })
                .style("fill", "none")
                .attr("d", line(d.values));

                svg.append("text")
                    .attr("x", (legendSpace/2)+i*legendSpace)  // space legend
                    .attr("y", -margin.top/2) // was height + (margin.bottom/2)+ 5
                    .attr("class", "legend")    // style the legend
                    .style("fill", function() { // Add the colours dynamically
                        return c(d.key); 
                    })
                    .style("text-anchor", "middle")
                    .style("font-size", "20px")
                    .text(d.key);

        });

        // Add the X Axis
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add the Y Axis
        svg.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y));
    }

    this.updateDate = function(inData, start, end) {
        this.update(inData.filter(d => (d.date >= start) && (d.date <= end)));
    }

    this.update(inData, updateFunc);
}