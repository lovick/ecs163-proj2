var candle;
var scat;
var dat;
var curCoin = "BTC";
d3.csv('cData.csv', function (data) {

    candle = new candlestick(data, curCoin);
    scat = new scatter(data, "2018-02-05");
    var don = new donutMultiples(150, data, "2017-12-25", "open");
    var time = new timeBrush(data, curCoin, updateCandleRange);
    //var don2 = new donutMultiples(300, data, "2017-12-24", "close");

    //candle.update(data, "NEO");
    //scat.update(data, "2013-04-28");
    //don.update(data, "2013-05-03", "spread");



    var form = document.getElementById("changeCoin");
    form.onsubmit = function() {
        candle.update(data, form.coin.value);
        curCoin = form.coin.value;
        time.update(dat, curCoin);
        return false;
    }
    dat = data;
});

function updateCandleRange(startDate, endDate) {
    if (startDate != "") {
        candle.updateDate(dat, buildDate(startDate), buildDate(endDate));
    } else {
        candle.updateDate(data, "2013-04-28", "2018-02-05");
    }
    scat.update(dat, getMidDate(startDate, endDate));
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