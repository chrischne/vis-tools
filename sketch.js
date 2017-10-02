'use strict';

//color palettes
//scales
//basic d3 setup workflow
//helper function to create svg
//basic tooltips


//todo bounds object
var margin = {top: 20, right: 10, bottom: 20, left: 10};

var w = 800;
var h = 800;
var innerW = w - margin.left - margin.right;
var innerH = h - margin.top - margin.bottom;



var vScale = d3.scaleLinear();  //d3.scalePow()
var catScale = d3.scaleOrdinal();
var colScale =  d3.scaleSequential(d3.interpolateRdBu);

var xScale = d3.scalePoint();
var yScale = d3.scalePoint();

var vAcc = acc('count');
var cat1Acc = acc('cat1');
var cat2Acc = acc('cat2');

var file = 'data/sample2.csv'; 
var data = null;
var ready = false;
var svg = createSVG("#container");

function setup() {
	console.log('setup');
	//createCanvas(windowWidth, windowHeight);
	noCanvas();
	noLoop();

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
			ready = true;
			redraw();
		})

	
}

function draw() {
	console.log('draw');
	if(!ready){
		return;
	}

	svg.selectAll('.entry')
		.data(data)
		.enter()
		.append('rect')
		.classed('entry',true)
		.attr('x',function(d){
			return xScale(cat1Acc(d));
		})
		.attr('y',function(d){
			return yScale(cat2Acc(d));
		})
		.attr('width',50)
		.attr('height',50)
		.style('fill',function(d){
			return colScale(vAcc(d));
		});



}


function mine(csv){

	var cats1 = _.uniq(csv.map(cat1Acc));
	var cats2 = _.uniq(csv.map(cat2Acc));
	var maxVal = d3.max(csv,vAcc);
	

	vScale.domain([0,maxVal])
		.range([0,100]);

	colScale.domain([0,maxVal]);

	xScale.domain(cats1)
		.range([0,innerW]);
		

	yScale.domain(cats2)
		.range([0,innerH]);



	return csv;


}

function createSVG(parent){


return  d3.select(parent).append("svg")
					.attr("width", innerW  + margin.left + margin.right)
                    .attr("height", innerH + margin.top + margin.bottom)
                    .append("g")
    				.attr("transform", translateString(margin.left,margin.top));

}

function translateString(x,y){
	return "translate(" + x + "," + y + ")";
}

function acc(id){
	return function(d){
		return d[id];
	};
}