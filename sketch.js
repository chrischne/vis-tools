'use strict';

//color palettes
//scales
//basic d3 setup workflow
//helper function to create svg
//basic tooltips

var w = 800;
var h = 600;
var margin = {top: 20, right: 10, bottom: 20, left: 10};


var vScale = d3.scaleLinear();  //d3.scalePow()
var catScale = d3.scaleOrdinal();
var colScale =  d3.scaleSequential(d3.interpolateRdBu);


var file = 'data/sample.csv'; 
var data = null;
var ready = false;
var svg = createSVG("#container");

function setup() {
	console.log('setup');
	//createCanvas(windowWidth, windowHeight);
	noCanvas();

	d3.csv(file)
		.row(function(d){
			return {
				cat1: d['Kat1'],
				cat2: d['Kat2'],
				count: d['Count']
			};
		})
		.get(function(error,csv){
			if(error){
				console.log('error',error);
				return;
			}
			data = mine(csv);
			console.log('data',data);
		})

	noLoop();
}

function draw() {
	if(!ready){
		return;
	}




}


function mine(csv){
	return csv;
}

function createSVG(parent){

	var _w = w - margin.left - margin.right;
    var _h = h - margin.top - margin.bottom;

return  d3.select(parent).append("svg")
					.attr("width", _w  + margin.left + margin.right)
                    .attr("height", _h + margin.top + margin.bottom)
                    .append("g")
    				.attr("transform", translateString(margin.left,margin.top));

}

function translateString(x,y){
	return "translate(" + x + "," + y + ")";
}