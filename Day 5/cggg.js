var squares=document.querySelectorAll(".square");
var mode=document.querySelectorAll(".mode");
var reset=document.querySelector("#reset");
var msg=document.querySelector("#msg");
var cguess=document.querySelector(".cguess");
var numcolor=6;
var colors=[]
var selectedColor;
// Initial Color Set
resetColors();
// Mode Seletion
for(var i=0;i<mode.length;i++)
{
    mode[i].addEventListener("click",function(){
        mode[0].classList.remove("selected");
        mode[1].classList.remove("selected");
        this.classList.add("selected");
        this.textContent=="Easy"?numcolor=3:numcolor=6;
        resetColors();
    });
}
// Reset Button & Function
reset.addEventListener("click",function(){
    resetColors();
});

function resetColors(){
    colors=colorGen(numcolor);
    selectedColor=colors[Math.floor(Math.random()*numcolor)];
    colorAssign();
    reset.textContent="new colors";
    msg.textContent="";
    cguess.textContent=selectedColor;
    document.querySelector("h1").style.backgroundColor="steelblue";
}
// Validation of squares
for(var i=0;i<numcolor;i++)
{
    squares[i].addEventListener("click",function(){
        if(this.style.backgroundColor==selectedColor)
        {
            msg.textContent="Correct";
            document.querySelector("h1").style.backgroundColor=selectedColor;
            reset.textContent="Play Again"
            for(var j=0;j<numcolor;j++)
            {
                squares[j].style.backgroundColor=selectedColor;
            }
        }
        else
        {
            msg.textContent="Try again";
            this.style.backgroundColor="#232323";
        }
    });
}

function colorGen(numcolor){
    var array=[];
    var r;
    var g;
    var b;
    for(var i=0;i<numcolor;i++)
    {
        r= Math.floor(Math.random()*256);
        g= Math.floor(Math.random()*256);
        b= Math.floor(Math.random()*256);
        array.push("rgb("+r+", "+g+", "+b+")");
    }
    return array;
}

function colorAssign(){
    for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block"
			squares[i].style.backgroundColor = colors[i];
        } else 
        {
			squares[i].style.display = "none";
		}
	}
}