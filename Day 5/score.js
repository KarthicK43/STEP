var box=document.querySelector("input")
var player1=document.getElementById("p1")
var player2=document.getElementById("p2")
var reset=document.getElementById("res")
var player1score=document.getElementById("pl1")
var player2score=document.getElementById("pl2")
var limit=5;
var player1count=0;
var player2count=0;
box.addEventListener("change",function(){
    limit=box.value;
    document.querySelector("p").textContent="Playing to : "+limit;
    resetContents();
});
player1.addEventListener("click",function(){
    player1count=counter(player1count,player1score,player2count);
});
player2.addEventListener("click",function(){
 
    player2count=counter(player2count,player2score,player1count);
});
reset.addEventListener("click",function(){
    resetContents();
});

function counter(count1,display,count2){
    if(count1!=limit&&count2!=limit)
    {
        count1++;
        if(count1==limit)
        {
         display.classList.add("win");   
        }
        display.textContent=count1;
        
    }
    return count1;
}
function resetContents()
{
    player1count=0;
    player2count=0;
    player1score.textContent=0;
    player2score.textContent=0;
    player1score.classList.remove("win");
    player2score.classList.remove("win");

}
