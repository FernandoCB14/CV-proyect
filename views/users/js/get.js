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
        // searchid();
        document.getElementById('btn1').addEventListener('click', searchid);  
        document.getElementById('btn2').addEventListener('click', searchname);  
    }else{
        window.location.href="login.html";   
    }    
      
}


function searchid() {
    let idUsuario = document.getElementById("input-id").value;
    axios.get(url + "/usuarios/" + idUsuario, headers)
    .then(function(res) {
        // console.log(res.data.message);
        showData(res.data.message); 
        // document.getElementById("input-id").innerHTML = res.data.message[0];

    }).catch(function(err) {
        console.log(err);  
    })
}

function showData(usuario){ 
    var body = document.querySelector("body");
    for(var i=0; i<usuario.length; i++){
        body.innerHTML += `<div><h3>${usuario[i].nombre}
                               ${usuario[i].apellido_paterno}</h3></div>
                            <div >
                            hola
                            </div>`;
    } 
}

// function searchname() {
//     var name = document.getElementById('input-name').value;
//     const requestOptions = {
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify({ name: name })
//     };
//     fetch('/usuarios/name', requestOptions)
//         .then(response => response.json())
//         .then(data => element.innerHTML = data.id );
function searchname() {
    var name = document.getElementById('input-name').value;
    axios.get(url + "/usuarios/" + name, headers )
    .then(function(res) {
        // console.log(res.data.message);
        showData(res.data.message); 
        // document.getElementById("input-id").innerHTML = res.data.message[0];

    }).catch(function(err) {
        console.log(err);  
    })
}

function showData(usuario){ 
    var body = document.querySelector("body");
    for(var i=0; i<usuario.length; i++){
        body.innerHTML += `<div><h3>${usuario[i].nombre}
                               ${usuario[i].apellido_paterno}</h3></div>
                            <div >
                            hola
                            </div>`;
    } 
}
