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
        console.log(headers);
        // searchid();
        document.getElementById('btn1').addEventListener('click', searchid);
        // document.getElementById('btn2').addEventListener('click', searchname);  
    }else{
        window.location.href="login.html";   
    }    
      
}

function searchid() {
    var id = document.getElementById('input-id').value;

    axios({
        method: 'get',
        url:'http://localhost:8081/usuarios',
        data:{
            id_usuario: id
        },
        headers:{
            'Authorization': "bearer " + localStorage.getItem("token"),
        }
    }).then(function(res){
        if(res.data.code === 200){
            alert("Usuario" + id);
        }else{
            alert("Algo salió mal");
        }
    }).catch(function(err){
        console.log(err);
    });
}

// function showData(usuario){ 
//     var body = document.querySelector("body");
//     for(var i=0; i<usuario.length; i++){
//         body.innerHTML += `<div><h3>${usuario[i].nombre}
//                                ${usuario[i].apellido_paterno}</h3></div>
//                             <div >
//                             hola
//                             </div>`;
//     } 
// }




// function newdata(){
//     var name = document.getElementById('input-name').value;
//     var last_name= document.getElementById('input-ln').value;
//     var mlast_name= document.getElementById('input-mln').value;
//     var direc= document.getElementById('input-dir').value;
//     var zp= document.getElementById('input-zp').value;
//     var state= document.getElementById('input-sta').value;
//     var mail= document.getElementById('input-mail').value;
//     var Tnum= document.getElementById('input-tnum').value;
//     var formacd= document.getElementById('input-formacd').value;
//     var profexp= document.getElementById('input-profexp').value;
//     var idioms= document.getElementById('input-idioms').value;
    
//     axios({
//         method: 'put',
//         url:'http://localhost:8081/usuarios/insert', 
//         data:{
//             nombre: name,
//             apellido_paterno: last_name,
//             apellido_materno: mlast_name,
//             direccion: direc,
//             codigo_postal: zp,
//             estado:state,
//             correo_electronico: mail,
//             numero_telefono: Tnum,
//             formacion_academica: formacd,
//             experiencia_profesional: profexp,
//             idiomas_domina: idioms
//         },
//         headers:{
//             'Authorization': "bearer " + localStorage.getItem("token"),
//         }
//     }).then(function (res){
//         if(res.data.code ===200){
//         //     alert("Datos creados");
//         // }else{
//         //     alert("Algo salió mal");
//         }
//     }).catch(function(err){
//         console.log(err);
//     });
// }