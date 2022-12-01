// const db = require('../models/database');
// const squel= require('squel');
window.onload = init;
var headers = {};
var url = "http://localhost:8081";
// const mysql= require('mysql');

function init() {
    if (localStorage.getItem("token")) {
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token"),
            }
        }
        // searchid();
        // document.getElementById('btn1').addEventListener('click', searchCvs);
        // document.getElementById('btn2').addEventListener('click', mostrarD);
        // document.getElementById('btn3').addEventListener('click', update);

        document.addEventListener("DOMContentLoaded",  searchCvs());

        // window.document.addEventListener('DOMContentLoaded', ()=>{
        //     console.log("Holi");
        //     searchCvs();
        // })

         
    } else {
        window.location.href = "login.html";
    }


}


function searchCvs() {
    axios.get(url + "/usuarios/cvs", headers)
        .then(function (res) {
            console.log(res.data.message);
            // showData(res.data.message);
            showCards(res.data.message);
        })
}


function showCards(cvs) {


    const items = document.getElementById('my-cvs')
    const templateCard= document.getElementById('template-card').content
    const fragment = document.createDocumentFragment();

   

    // const myCvs = document.getElementById('my-cvs');
    // const fragment = document.createDocumentFragment();
    // const tarjeta = document.querySelector('tarjeta');


    cvs.forEach((item, index) => {
        templateCard.querySelector('h1').textContent= item.nombre;
        templateCard.querySelector('h5').textContent= item.apellido_materno;  
        const clone= templateCard.cloneNode(true);
        fragment.appendChild(clone);

    });
    items.appendChild(fragment);
    
        // const tarjeta= document.createElement('div');
        // tarjeta.className='tarjeta';

    //     const div = document.createElement('div');
    //     div.className = `cv-card`;
    //     div.id = `cv-card${index + 1}`;

    //     div.innerHTML = `<h2 class= "titulo">${item.nombre}</h2> 
    //                      ${item.apellido_paterno}  
    //                      ${item.apellido_materno}`;
    //     fragment.appendChild(div);
    //     // tarjeta.textContent=div;


    //     const pie=document.createElement("div");
    //     pie.className= "pie"
    //     const btnUpdate = document.createElement('button');
    //     btnUpdate.className= "btn-update";
    //     btnUpdate.textContent = "Editar"
    //     div.appendChild(pie);
    //     pie.appendChild(btnUpdate);

    //     btnUpdate.onclick = () => {
    //     window.location.href= "edit.html"
    //     };

    //     // btnUpdate.onclick = update;
    //     // datosUsuario.appendChild(btnUpdate);

    //     const btnDelete = document.createElement('button');
    //     btnUpdate.className= "btn-delate";
    //     btnUpdate.textContent = "Borrar"
    //     // pie.appendChild(btnDelete);


    // });
    // myCvs.appendChild(fragment);

}

// function searchid() {
//     let idUsuario = document.getElementById("input-id").value;
//     // const gruposDiv = document.getElementById('datos-usuario');
//     axios.get(url + "/usuarios/" + idUsuario, headers)
//         .then(function (res) {
//             console.log(res.data.message);
//             showData(res.data.message);

//         })
// }




// function mostrarD() {
//     axios.get(url + "/usuarios/datos", headers)
//         .then(function (res) {
//             showData(res.data.message);
//             console.log(res.data.message);
//         })
// }





// function showData(usuario) {
//     var datosUsuario = document.getElementById("datos-usuario");
//     for (var i = 0; i < usuario.length; i++) {
//         datosUsuario.innerHTML += `<div >
//                                     <div class="form-group">
//                                         <label for="input-name">Nombre</label>
//                                         <input class="form-control" value=${usuario[i].nombre} id="input-name" placeholder="******">
//                                         <input class="form-control" value = ${usuario[i].apellido_paterno} id="input-ln" placeholder="********** ">
//                                         <input class="form-control" value=${usuario[i].apellido_materno} id="input-mln" placeholder="********** ">
//                                     </div>
//                                     <div >  
//                                         <label for="input-dir">direccion</label>
//                                         <input class="form-control"  value = ${usuario[i].direccion} id="input-dir" placeholder="********** ">
//                                     </div>
//                                     <div class="form-group">
//                                         <label for="input-zp">codigo postal</label>
//                                         <input class="form-control" value = ${usuario[i].codigo_postal} id="input-zp" placeholder="********** ">
//                                     </div>
//                                     <div class="form-group">
//                                         <label for="input-sta">estado</label>
//                                         <input class="form-control" value = ${usuario[i].estado} id="input-sta" placeholder="********** ">
//                                     </div>
//                                         <label for="input-tnum">número de teléfono</label>
//                                         <input class="form-control"value = ${usuario[i].numero_telefono} id="input-tnum" placeholder="********** ">
//                                     <div class="form-group">
                                       
//                                     </div>

//                                     <div class="form-group">
//                                         <label for="input-mail">correo electronico</label>
//                                         <input class="form-control" value = ${usuario[i].correo_electronico} id="input-mail" placeholder="********** ">
//                                     </div>
//                                     <div class="form-group">
//                                     </div>`;

//     }

//     const limpiarDivButton = document.createElement('button');
//     limpiarDivButton.textContent = "Limpiar";

//     limpiarDivButton.onclick = () => {
//         datosUsuario.innerHTML = "";
//     };
//     datosUsuario.appendChild(limpiarDivButton);

//     const btnUpdate = document.createElement('button');
//     btnUpdate.textContent = "Actualizar"
//     btnUpdate.onclick = update;
//     datosUsuario.appendChild(btnUpdate);

//     const btnA = document.createElement('button');
//     btnA.textContent = "Datos académicos";

//     // btnA.onclick = showDataA

//     datosUsuario.appendChild(btnA);



// }

//PUT 

function update() {

    var id = document.getElementById('input-id').value;
    var name = document.getElementById('input-name').value;
    var last_name = document.getElementById('input-ln').value;
    var mlast_name = document.getElementById('input-mln').value;
    var direc = document.getElementById('input-dir').value;
    var zp = document.getElementById('input-zp').value;
    var state = document.getElementById('input-sta').value;
    var mail = document.getElementById('input-mail').value;
    var Tnum = document.getElementById('input-tnum').value;
    var formacd = document.getElementById('input-formacd').value;
    var profexp = document.getElementById('input-profexp').value;
    var idioms = document.getElementById('input-idioms').value;

    axios({
        method: 'put',
        url: 'http://localhost:8081/usuarios/' + id,
        data: {
            // id_usuario:id,
            nombre: name,
            apellido_paterno: last_name,
            apellido_materno: mlast_name,
            direccion: direc,
            codigo_postal: zp,
            estado: state,
            correo_electronico: mail,
            numero_telefono: Tnum,
            formacion_academica: formacd,
            experiencia_profesional: profexp,
            idiomas_domina: idioms
        },
        headers: {
            'Authorization': "bearer " + localStorage.getItem("token"),
        }
    }).then(function (res) {
        if (res.data.code === 200) {
            console.log(res.data.message);
            alert("Datos actualizados");
        } else {
            alert("Algo salió mal");
        }
    }).catch(function (err) {
        console.log(err);
    });
}



