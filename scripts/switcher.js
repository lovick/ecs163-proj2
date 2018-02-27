function labels(data, updateFunc) {
    console.log("Running Labels");
    var margin = {top: 10, right: 50, bottom: 50, left: 50},
        width = (innerWidth - margin.left - margin.right)*0.75,
        height = (innerHeight - margin.top - margin.bottom)*0.05;

    var c = d3.scaleOrdinal(d3.schemeCategory10);

    var svg = d3.select("#donut").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




    this.update = function(data, updateFunc) {
        svg.selectAll("*").remove();
        // Add the Legend
        var i = 0;
        (d3.map(data, function (d) { return d.symbol; } )).forEach(function(d) {
            svg.append("text")
                .attr("x", (legendSpace/2)+i*legendSpace)  // space legend
                .attr("y", -margin.top/2) // was height + (margin.bottom/2)+ 5
                .attr("class", "legend")    // style the legend
                .style("fill", function() { // Add the colours dynamically
                    return c(d.symbol); 
                })
                .style("text-anchor", "middle")
                .style("font-size", "30px")
                .text(d.symbol)
                .on("click", function() {
                    updateFunc(d.key);
            });   
        });
    }

    this.update(data, updateFunc);
}