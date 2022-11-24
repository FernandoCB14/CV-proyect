
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



// function loadUsuario(){
//     axios.get(url + "/usuarios",headers)
//     .then(function(res){
//         console.log(res);
//         console.log(res.data.message);
//         showData(res.data.message);     
//     }).catch(function(err){
//         console.log(err);
//     })
// }

// function showData(usuario){ 
//     var body = document.querySelector("body");
//     for(var i=0; i<usuario.length; i++){
//         body.innerHTML += `<h3>${usuario[i].nombre}</h3>`;
//     } 
// }

function borrarToken() {
    localStorage.clear();
    location.reload();
}


