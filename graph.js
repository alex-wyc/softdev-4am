console.log('js file loaded');

var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

    //var tip = d3.tip()
    //  .attr('class', 'd3-tip')
    //  .offset([-10, 0])
    //  .html(function(d) {
    //    return "<strong>Frequency:</strong> <span style='color:red'>" + d.tweets + "</span>";
    //  });


var to_int = function(d) {
    return parseInt(d, 10);
}

var update = function(hour) {
    d3.select('#hour-value').text(hour + ":00:00" + '-' + (hour + 1) + ":00:00");
    d3.select('#hour').property('value', hour);

    d3.select('#chart').html(''); // clean the thingy

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.csv('data.csv', function(err, data) {
    if (err) {
        throw err;
    }
    x.domain(['Sanders', 'Trump', 'Clinton', 'Cruz', 'Kasich']);
    y.domain([0, 22]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Tweets");
    svg.append('rect')
        .attr('class', 'sanders')
        .attr('fill', 'blue')
        .attr('x', x('Sanders'))
        .attr('width', x.rangeBand)
        .attr('y', y(to_int(data[hour].BernieSanders)))
        .attr('height', height - y(to_int(data[hour].BernieSanders)));

    svg.append('rect')
        .attr('class', 'kaisch')
        .attr('fill', 'red')
        .attr('x', x('Kasich'))
        .attr('width', x.rangeBand)
        .attr('y', y(to_int(data[hour].JohnKasich)))
        .attr('height', height - y(to_int(data[hour].JohnKasich)));

    svg.append('rect')
        .attr('class', 'clinton')
        .attr('fill', 'darkblue')
        .attr('x', x('Clinton'))
        .attr('width', x.rangeBand)
        .attr('y', y(to_int(data[hour].HillaryClinton)))
        .attr('height', height - y(to_int(data[hour].HillaryClinton)));

    svg.append('rect')
        .attr('class', 'trump')
        .attr('fill', 'orange')
        .attr('x', x('Trump'))
        .attr('width', x.rangeBand)
        .attr('y', y(to_int(data[hour].realDonaldTrump)))
        .attr('height', height - y(to_int(data[hour].realDonaldTrump)));

    svg.append('rect')
        .attr('class', 'cruz')
        .attr('fill', 'darkred')
        .attr('x', x('Cruz'))
        .attr('width', x.rangeBand)
        .attr('y', y(to_int(data[hour].tedcruz)))
        .attr('height', height - y(to_int(data[hour].tedcruz)));

});
}

d3.select("#hour").on("input", function() {
  update(+this.value);
});

update(20);
