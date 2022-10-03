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
        document.getElementById('btn1').addEventListener('click', searchid) ;  
        // document.getElementById('btn2').addEventListener('click', searchname);  
        document.getElementById('btn3').addEventListener('click', update);
    }else{
        window.location.href="login.html";   
    }    
      
}

function searchid() {
    let idUsuario = document.getElementById("input-id").value;
    // const gruposDiv = document.getElementById('datos-usuario');
    axios.get(url + "/usuarios/" + idUsuario, headers)
    .then(function(res) {
        console.log(res.data.message);
        showData(res.data.message);  

    })
}

//PUT 

function update(){
    var name = document.getElementById('input-name').value;
    var last_name= document.getElementById('input-ln').value;
    var mlast_name= document.getElementById('input-mln').value;
    var direc= document.getElementById('input-dir').value;
    var zp= document.getElementById('input-zp').value;
    var state= document.getElementById('input-sta').value;
    var mail= document.getElementById('input-mail').value;
    var Tnum= document.getElementById('input-tnum').value;
    var formacd= document.getElementById('input-formacd').value;
    var profexp= document.getElementById('input-profexp').value;
    var idioms= document.getElementById('input-idioms').value;
    
    axios({
        method: 'put',
        url:'http://localhost:8081/usuarios', 
        data:{
            nombre: name,
            apellido_paterno: last_name,
            apellido_materno: mlast_name,
            direccion: direc,
            codigo_postal: zp,
            estado:state,
            correo_electronico: mail,
            numero_telefono: Tnum,
            formacion_academica: formacd,
            experiencia_profesional: profexp,
            idiomas_domina: idioms
        },
        headers:{
            'Authorization': "bearer " + localStorage.getItem("token"),
        }
    }).then(function (res){
        if(res.data.code ===200){
            alert("Datos Actualizados");
        }else{
            alert("Algo salió mal");
        }
    }).catch(function(err){
        console.log(err);
    });
}


// function change() {
//     window.location.href="put.html"
// }