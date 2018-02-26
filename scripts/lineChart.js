function lineChart(data) {

    var margin = {top: 30, right: 50, bottom: 50, left: 50},
        width = (innerWidth - margin.left - margin.right),
        height = (innerHeight - margin.top - margin.bottom)*0.5;

    var parseDate = d3.timeParse("%Y-%m-%d");
    var x = d3.scaleTime().rangeRound([0,width]);
    var y = d3.scaleLinear().rangeRound([height, 0]);
    var line = d3.line()
        .x(function(d) { return x(parseDate(d.date)); })
        .y(function(d) { return y(+d.open); });
        
    var svg = d3.select("#lineChart").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return parseDate(d.date); }));
    y.domain(d3.extent(data, function(d) { return +d.close; }));

    // Nest the entries by symbol
    var dataNest = d3.nest()
        .key(function(d) {return d.symbol;})
        .entries(data);

    // set the colour scale
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    legendSpace = width/dataNest.length; // spacing for the legend

    // Loop through each symbol / key
    dataNest.forEach(function(d,i) { 

        svg.append("path")
            .attr("class", "line")
            .style("stroke", function() { // Add the colours dynamically
                return d.color = color(d.key); 
            })
            .style("fill", "none")
            .attr("d", line(d.values));

        // Add the Legend
        svg.append("text")
            .attr("x", (legendSpace/2)+i*legendSpace)  // space legend
            .attr("y", height + (margin.bottom/2)+ 5)
            .attr("class", "legend")    // style the legend
            .style("stroke", function() { // Add the colours dynamically
                return d.color = color(d.key); 
            })
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