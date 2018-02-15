function vis1() {
    var margin = {top: 30, right: 10, bottom: 10, left: 50},
        width = innerWidth*.9 - margin.left - margin.right,
        height = innerHeight*.9 - margin.top - margin.bottom;

    var parseDate = d3.timeParse("%Y-%m-%d");
    var x = d3.scaleTime().rangeRound([0,width]);
    var y = d3.scaleLinear().rangeRound([height, 0]);
    var line = d3.line(),
        foreground;

    var vVal = d => d.value;

    var c = d3.scaleLog()
        .range(["steelblue", "crimson"])
        .interpolate(d3.interpolateHcl);

    var vis1 = d3.select("#largeGraph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left*2 + "," + margin.top + ")");

    d3.csv("trimCountNew.csv", function(error, data) {
        
        x.domain(dimensions = d3.keys(data[0]).filter(function(d){
            if (d == 'Country') {
                //console.log(d3.map(data, function(p) { return p[d]; }).keys());
                return (y[d] = d3.scalePoint()
                .domain(d3.map(data, function(p) { return p[d]; }).keys())
                .range([height, 0]));
            } else if (d == "WorkStart") {
                return (y[d] = d3.scalePoint()
                .domain(["Midnight", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
                "Noon", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"])
                .range([height, 0]));
            } else if (d == "DifficultCommunication") {
                return (y[d] = d3.scalePoint()
                .domain(["Strongly disagree", "Disagree", "Somewhat agree", "Agree", "Strongly agree"])
                .range([height, 0]));
            }
        }));

        c.domain(d3.extent(data, function(d) { return +d.value; }));

        // Adding lines
        foreground = vis1.append("g")
            .attr("class", "foreground")
            .selectAll("path")
            .data(data)
            .enter().append("path")
            .attr("d", path)
            .attr("stroke", function(p) {
                return c(vVal(p));
            /*switch(p.Country) {
                case "France": return "#9932cc";
                case "Canada": return "#ffd700";
                case "India": return "#ff8c00";
                case "Germany": return "#556b2f";
                case "Poland": return "#b22222";
                case "United States": return "#483d8b";
                case "United Kingdom": return "#00bfff";
                default: return black;
            }*/
            });

        var g = vis1.selectAll(".dimension")
            .data(dimensions)
            .enter().append("g")
            .attr("class", "dimension")
            .attr("transform", function(d) { return "translate(" + x(d) + ")"; })

        g.append("g")
            .attr("class", "axis")
            .each(function(d) { d3.select(this).call(d3.axisLeft(y[d])); })
            .append("text")
            .style("text-anchor", "middle")
            .attr("y", -9)
            .text(function(d) { return "label"; });

    });

    function position(d) {
        return x(d);
    }

    // Returns the path for a given data point.
    function path(d) {
        return line(dimensions.map(function(p) { return [position(p), (y[p](d[p]))]; }));
    }
}
vis1();