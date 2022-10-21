let button=document.querySelectorAll('#buttons');
let btn=document.querySelectorAll('span');
let value=document.getElementById('value');
let tooggle=document.querySelector('.tooggle')
let body = document.querySelector('body');
let equal=document.querySelector('#equal')


tooggle.onclick = function(){
    body.classList.toggle("dark");  
}



for(let i=0; i<=btn.length; i++){
    btn[i].addEventListener("click", function() {
        if(this.innerHTML=="="){
            value.innerHTML=eval(value.innerHTML);
            value.style.color="green"
        }else{
            if(this.innerHTML=="CLR"){
                value.innerHTML="";
            }else
                if(this.innerHTML=="DEL"){
                    value.innerHTML= value.innerHTML.substring(0, value.innerHTML.length -1);
                }else{
                    value.innerHTML+=this.innerHTML;
            }
        }
    })
}


 
  //let bodyHeight=document.querySelector('#body').clientHeight;
  let directionY=1;
  let directionX=1;

  let positionX=0;
  let positionY=0;

  let ball = document.getElementById("myBall");
  let limitBottom = window.innerHeight-ball.clientHeight;
  let limitWidth=window.innerWidth-ball.clientWidth;
  let compter=0;

document.addEventListener('DOMContentLoaded', function(){
  window.requestAnimationFrame(move);

  function move(){
    window.requestAnimationFrame(move);
          positionY+= 5*directionY;
          positionX+= 5*directionX;

          // ball.style=`left:${positionX}px`;
          ball.style=`top:${positionY}px`;
          
          if(positionY <= 0 || positionY>=limitBottom ){
            directionY *= -1;
          } 

          if(positionX <= 0 || positionX>=limitWidth ){
            directionX *= -1;
          }
        }

})


