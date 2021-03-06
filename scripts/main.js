var candle;
var scat;
var lin;
var dat;
var curCoin = "BTC";
d3.csv('cData.csv', function (data) {

    candle = new candlestick(data, curCoin);
    scat = new scatter(data, "2018-02-05");
    var time = new timeBrush(data, curCoin, updateCandleRange);
    //var don2 = new donutMultiples(300, data, "2017-12-24", "close");

    lin = new lineChart(data, updateFunc);
    //candle.update(data, "NEO");
    //scat.update(data, "2013-04-28");
    //don.update(data, "2013-05-03", "spread");

    var updateFunc = function(c) {
        curCoin = c;
        candle.update(data, curCoin);
        time.update(data, curCoin);

        console.log("Finished update\n");
        return false;
    }

    var form = document.getElementById("changeCoin");
    form.addEventListener("submit", function(d) {
        updateFunc(form.coin.value);
        return false;
    });

    dat = data;
});

function updateCandleRange(startDate, endDate) {
    console.log("Updating Candle Range");
    if (startDate != "") {
        candle.updateDate(dat, buildDate(startDate), buildDate(endDate));
    } else {
        candle.updateDate(dat, "2013-04-28", "2018-02-05");
    }
    console.log("Updating Scat");
    scat.update(dat, getMidDate(startDate, endDate));
    console.log("Updating Lin");
    lin.updateDate(dat, buildDate(startDate), buildDate(endDate));

    console.log("Finished Updating Candle Range");
}

function buildDate(date) {
    var str = date.getFullYear() + "-";
    if ((date.getMonth()+1 < 10)) {
        str += "0" + (date.getMonth()+1) + "-";
    } else {
        str += (date.getMonth()+1) + "-";
    }
    if (date.getDate() < 10) {
        str += "0" + date.getDate();
    } else {
        str += date.getDate();
    }
    return str;
}

function getMidDate(d1, d2) {
    return buildDate(new Date((d1.getTime() + d2.getTime()) / 2));
}