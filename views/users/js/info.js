
window.onload= init;
var headers = {};
var url = "http://localhost:8081";

function init(){
    if(localStorage.getItem("token")){
        headers={
            headers:{
                'Authorization': "bearer " + localStorage.getItem("token"),
            }
        }
        // loadUsuario();
        document.getElementById('logout').addEventListener('click', borrarToken); 
        
    }else{
        window.location.href="login.html";   
    }    
}

function borrarToken() {
    localStorage.clear();
    location.reload();
}


