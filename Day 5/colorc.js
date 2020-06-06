var button = document.querySelector("button")
var body = document.querySelector("body")
// console.log(button);
// console.log(body)
var color = false;
button.addEventListener("click",function(){
   if(color==false)
   {
    body.style.background="green";
    button.style.background="white";

   }
   else
   {
    body.style.background="white";
    button.style.background="gray";

   }
   color=!color;
});
