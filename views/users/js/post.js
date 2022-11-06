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
        // console.log(headers);
        // searchid();
        document.getElementById('btn1').addEventListener('click', newdata);  
        // document.getElementById('btn2').addEventListener('click', searchname);  
    }else{
        window.location.href="login.html";   
    }    
      
}


function newdata(){
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
    var hab=  document.getElementById('input-hab').value;
    var otrosin=  document.getElementById('input-ointereses').value;
    
    axios({
        method: 'post',
        url:'http://localhost:8081/usuarios/insert',
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
            idiomas_domina: idioms,
            habilidades_academico: hab,
            otros_intereses:otrosin
        },
        headers:{
            'Authorization': "bearer " + localStorage.getItem("token"),
        }
    }).then(function (res){
        if(res.data.code ===200){
        //     alert("Datos creados");
        // }else{
        //     alert("Algo salió mal");
        }
    }).catch(function(err){
        console.log(err);
    });
}