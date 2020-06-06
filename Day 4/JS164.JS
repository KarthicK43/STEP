function printReverse(array){
	for(var i = array.length-1 ; i>=0 ; i--)
	{
		console.log(array[i]);
	}
}

a=[1,2,3,4,5];
printReverse(a);

function isUniform(array){
	for(var i=1 ; i<array.length ; i++)
	{
		if(array[0]!==array[i])
		{
			console.log(false);
			break;
		}
	}
	console.log(true);
}

a=["a","a","a"];
isUniform(a);
function sumArray(array){
	var sum = array[0];
	for(var i=1 ; i<array.length ; i++)
	{
		sum = sum + array[i]
	}
	console.log("Sum of array "+sum)

}

a=[1,2,3];
sumArray(a);

function max(array){
	var maxnum = array[0];
	for(i=1 ; i<array.length ; i++)
	{
		if(maxnum<array[i])
		{
			maxnum=array[i];
		}
	}
	console.log("Maximum number in the arrray "+maxnum);
}

a=[1,8,2,6,-4];
max(a);