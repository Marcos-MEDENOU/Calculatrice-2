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


