d3.csv('cData.csv', function (data) {

    candlestick(data, 'BTC');
    //barChart(data);
    scatter(data, "2013-08-11");
    donutMultiples(data, "2013-08-11");
});