var to_int = function(d) {
    return parseInt(d, 10);
}
var sandersCon = liquidFillGaugeDefaultSettings();
sandersCon.circleColor = "#2b31ad";
sandersCon.textColor = "#a6a9ea";
sandersCon.waveTextColor = "#b3b5e5";
sandersCon.waveColor = "#8689ce";
sandersCon.circleThickness = 0.1;
sandersCon.textVertPosition = 0.5;
sandersCon.waveAnimateTime = 500;
sandersCon.textSize=0.5;
sandersCon.waveHeight= 0.1;

var trumpCon = liquidFillGaugeDefaultSettings();
trumpCon.circleColor = "#630000";
trumpCon.textColor = "#FF4444";
trumpCon.waveTextColor = "#FFAAAA";
trumpCon.waveColor = "#8A0707";
trumpCon.circleThickness = 0.15;
trumpCon.textVertPosition = 0.5;
trumpCon.waveAnimateTime = 5000;
trumpCon.textSize=0.5;
trumpCon.waveHeight=0.2;

var clintonCon = liquidFillGaugeDefaultSettings();
clintonCon.circleColor = "#3e18a5";
clintonCon.textColor = "#a082f2";
clintonCon.waveTextColor = "#645884";
clintonCon.waveColor = "#835dea";
clintonCon.circleThickness = 0.05;
clintonCon.textVertPosition = 0.5;
clintonCon.waveAnimateTime = 1000;
clintonCon.textSize=0.5;

var cruzCon = liquidFillGaugeDefaultSettings();
cruzCon.circleColor = "#f28282";
cruzCon.textColor = "#db4141";
cruzCon.waveTextColor = "#a03b3b";
cruzCon.waveColor = "#d8a0a0";
cruzCon.circleThickness = 0.3;
cruzCon.textVertPosition = 0.5;
cruzCon.waveAnimateTime = 2000;
cruzCon.textSize=0.5;
cruzCon.waveHeight=0.5;

var kasichCon = liquidFillGaugeDefaultSettings();
kasichCon.circleColor = "#FF7777";
kasichCon.textColor = "#FF4444";
kasichCon.waveTextColor = "#FFAAAA";
kasichCon.waveColor = "#FFDDDD";
kasichCon.circleThickness = 0.2;
kasichCon.textVertPosition = 0.5;
kasichCon.waveAnimateTime = 800;
kasichCon.textSize=0.5;


var sandersGauge = loadLiquidFillGauge("sanders",0,sandersCon);
var trumpGauge = loadLiquidFillGauge("trump",0,trumpCon);
var clintonGauge = loadLiquidFillGauge("clinton",0,clintonCon);
var cruzGauge = loadLiquidFillGauge("cruz",0,cruzCon);
var kasichGauge = loadLiquidFillGauge("kasich",0,kasichCon);


var update = function(hour) {
    
    d3.select('#hour-value').text(hour + ":00:00" + '-' + (hour + 1) + ":00:00");
    d3.select('#hour').property('value', hour);

    d3.csv('data.csv', function(err, data) {
	if (err) {
            throw err;
	}
	sandersGauge.update(to_int(data[hour].BernieSanders));
	trumpGauge.update(to_int(data[hour].realDonaldTrump));
	clintonGauge.update(to_int(data[hour].HillaryClinton));
	cruzGauge.update(to_int(data[hour].tedcruz));
	kasichGauge.update(to_int(data[hour].JohnKasich));
    });
}



d3.select("#hour").on("input", function() {
    update(+this.value);
});
update(20);

