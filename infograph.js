var canvas = document.getElementById("lineGraph");
var context = canvas.getContext("2d");
var legend = document.getElementById("legend");
var ctx = legend.getContext("2d");
var data = {
    'JohnKasich': [18, 18, 15, 12, 12, 1, 21, 21, 21, 16, 22, 20, 20, 20, 13, 0, 23, 20, 20, 20],
    'HillaryClinton': [23, 20, 19, 16, 14, 2, 0, 22, 21, 19, 18, 16,15, 14, 0, 21, 21, 20, 18, 16],
    'BernieSanders': [23, 22, 18, 17, 16, 16, 15, 13, 13, 10, 2, 2, 22, 22, 21, 21, 20, 19, 19, 18], 
    'tedcruz': [23, 18, 16, 13, 3,1, 23, 23, 22, 22, 22, 21, 21, 21, 21, 21, 20, 20, 20, 19], 
    'realDonaldTrump': [22, 21, 20, 20, 19, 14, 14, 13, 20, 20, 19, 19, 19, 19, 15, 11, 10, 10, 2, 2]
};


var setup = function setup(){
    var colors = ["black", "blue", "red" , "green" , "orange"];
    var x;
    var y;
    var counter = 0;
    var max = 0;
    //Converting data to frequency per hour
    for (var person in data){
	var time = []
	for (i = 0; i < 24; i++){
	    time.push(0);
	};
	data[person].forEach(function(hour){
	    time[hour]++;
	});
	time.forEach(function(frq){
	    if (max < frq){
		max = frq;
	    }
	});
	data[person] = time;
	//Creating the legend
	ctx.beginPath();
	x = 5;
	y = 200/6 * counter + 15;
	ctx.font = "20px Times New Roman";
	ctx.fillStyle = colors[counter];
	console.log(person);
	ctx.fillText(person,x,y);
	counter++;
    };
    //Creating the axes
    context.fillStyle = "black";
    context.font = "12px Arial Bold";
    context.strokeStyle = "gray ";
    context.lineWidth = 0.5;
    for (i = 0; i < max + 2; i++){
	x = 0;
	y = 600 - (600/(max + 2) * i) - 12;
	context.beginPath();
	context.moveTo(5,y-5);
	context.lineTo(600,y-5);
	context.closePath();
	context.stroke();
	context.fillText(i,0,y);
    }
    
    for (i = 1; i < 24; i++){
	context.fillText(i,600/24 * i ,595);
    }
    //Drawing the graphs
    counter = 0;
    context.lineWidth = 4;
    for( var person in data){
	context.strokeStyle = colors[counter];
	context.beginPath();
	context.moveTo(5, 600 - (600/(max + 2) * data[person][0]) - 18);
	for (i = 1; i < data[person].length; i++){
	    x = i * 600/24 + 5;
	    y =  600 - (600/(max + 2) * data[person][i]) - 18;
	    context.lineTo(x,y);
	    context.moveTo(x,y);
	}
	context.closePath();
	context.stroke();
	counter++;
    };
}
setup();
