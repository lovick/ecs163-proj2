function barChart(data, day) {

    var margin = {top: 30, right: 50, bottom: 50, left: 50},
        width = (innerWidth - margin.left - margin.right)*0.25,
        height = (innerHeight - margin.top - margin.bottom);

    var parseDate = d3.timeParse("%Y-%m-%d");

    var svg = d3.select("#barChart").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var x = d3.scaleLinear().rangeRound([0, width]);
    var y = d3.scaleBand().rangeRound([height, 0]);

    this.update = function(dOri, day) {
        var dIn = dOri.filter()
        x.domain([0, d3.max(dIn, function(d) { return +d.spread; })]);
        y.domain(dIn.map(function(d) { return d.symbol; }));
    
        // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(dIn)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", margin.left+"px")
            .attr("width", function(d) { 
                return x(+d.spread); 
            })
            .attr("y", function(d) { return y(d.symbol); })
            .attr("height", "5px");
    
    }

    this.update(data);

}