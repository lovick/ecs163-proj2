function timeBrush(dIn, cIn, func) {

    var margin = {top: 10, right: 50, bottom: 50, left: 50},
        width = (innerWidth - margin.left - margin.right)*0.75,
        height = (innerHeight - margin.top - margin.bottom)*0.05;

    var x = d3.scaleTime().rangeRound([0, width]);

    var svg = d3.select("#time").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    this.update = function(dataIn, coinIn) {
        svg.selectAll("*").remove();

        x.domain(d3.extent(dataIn.filter(d => d.symbol == coinIn), function(d) { return new Date(d.date); }));
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x)
                .ticks(d3.timeYear)
                .tickSize(-height)
                .tickFormat(function() { return null; }))
            .selectAll(".tick")
            .classed("tick--minor", function(d) { return d.getYear(); });

        svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x)
                .ticks(d3.timeYear)
                .tickPadding(0))
            .attr("text-anchor", null)
            .selectAll("text")
            .attr("x", 6);

        svg.append("g")
            .attr("class", "brush")
            .call(d3.brushX()
                .extent([[0, 0], [width, height]])
                .on("end", brushended));

        svg.append("text")             
            .attr("transform",
                    "translate(" + (width/2) + " ," + 
                                (height+25) + ")")
            .style("text-anchor", "middle")
            .text("Click and drag above to change the timeframe"); 
    }

    this.update(dIn, cIn);

    function brushended() {
        if (!d3.event.sourceEvent) return; // Only transition after input.
        if (!d3.event.selection) return; // Ignore empty selections.
        var d0 = d3.event.selection.map(x.invert),
            d1 = d0.map(d3.timeDay.round);
        
        // If empty when rounded, use floor & ceil instead.
        if (d1[0] >= d1[1]) {
            d1[0] = d3.timeDay.floor(d0[0]);
            d1[1] = d3.timeDay.offset(d1[0]);
        }
        func(d1[0], d1[1]);
        d3.select(this).transition().call(d3.event.target.move, d1.map(x));
    }
}