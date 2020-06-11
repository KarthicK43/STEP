function average(array){
	var sum=0;
	var ave;
	array.forEach(function(val){
		sum=sum+val;
	});
	ave = Math.round(sum/array.length);
	console.log(ave);
}
var scores=[90,98,89,100,100,86,94];
average(scores);

var scores2=[40,65,77,82,80,54,73,63,95,49];
average(scores2);