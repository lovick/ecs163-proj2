function candlestick(inData, coinIn) {
    console.log("Initializing Candlestick");
    var margin = {top: 10, right: 50, bottom: 50, left: 50},
        width = (innerWidth - margin.left - margin.right)*0.75,
        height = (innerHeight - margin.top - margin.bottom)*0.5;

    var parseDate = d3.timeParse("%Y-%m-%d");
    var x = d3.scaleTime().rangeRound([0,width]);
    var y = d3.scaleLinear().rangeRound([height, 0]);
    var line = d3.line()
        .x(function(d) { return x(parseDate(d.date)); })
        .y(function(d) { return y(+d.open); });

    var vVal = d => +d.close;

    var coinStor = coinIn;

    var c = function(d) {
        if (+d.close > +d.open) {
            return "#00FF00";
        } else {
            return "#ff0000";
        }
    };

    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y);

    var vis1 = d3.select("#candlestick").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    this.update = function(inData, coin) {
        console.log("Updating Candlestick");
        vis1.selectAll('*').remove();
        coinStor = coin;

        var data = inData.filter(d => d.symbol == coin);
        // Begin data processing
        x.domain(d3.extent(data, function(d) { return parseDate(d.date); }));
        y.domain(d3.extent(data, function(d) { return +d.close; }));

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

        // Y Axis Label
        vis1.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 60)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Value in Dollars");   
    };

    this.updateDate = function(inData, start, end) {
        console.log("Updating Candle Range");
        this.update(inData.filter(d => (d.date >= start) && (d.date <= end)), coinStor);
    }

    //var tempFiltered = inData.filter(d => d.symbol == coinIn).filter(d => (d.date < "2013-04-28") || (d.date > "2018-02-05"))
    this.update(inData, coinIn);
}