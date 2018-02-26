d3.csv('cData.csv', function (data) {

    candlestick(data, 'BTC');
    barChart(data);

});