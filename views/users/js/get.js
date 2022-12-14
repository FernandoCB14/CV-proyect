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

        // document.getElementById('btn-delete').addEventListener('click', deleteCv);
        
        // document.addEventListener("DOMContentLoaded", searchCvs());

        // mycvs.addEventListener('click', e=>{
        //     deleteCv(e); 
        // })

        searchCvs();


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


    const items = document.getElementById('mycvs')
    // const templateCard = document.getElementById('template-card').content
    const fragment = document.createDocumentFragment();



    // // const myCvs = document.getElementById('my-cvs');
    // // const fragment = document.createDocumentFragment();
    // // const tarjeta = document.querySelector('tarjeta');


    // cvs.forEach((item, index) => {
    //     templateCard.querySelector('h1').textContent = item.nombre;
    //     templateCard.querySelector('h5').textContent = item.apellido_materno;
    //     templateCard.querySelector('.btn-delete').dataset= item.id;
    //     const clone = templateCard.cloneNode(true);
    //     fragment.appendChild(clone);

    // });
    // items.appendChild(fragment);

    //sin templates

    cvs.forEach((item, index) => {
    const tarjeta= document.createElement('div');
    tarjeta.className='tarjeta';

        const div = document.createElement('div');
        div.className = `cv-card`;
        div.id = `cv-card${index + 1}`;

        div.innerHTML = `<h2 class= "titulo">${item.nombre}</h2> 
                         ${item.apellido_paterno}  
                         ${item.apellido_materno}
                         <div class="dropdown">
                         <button><i class='bx bx-list-ul'></i></button>
                         <div class="dropdown-content"> 
                             <a rel="noopener" target="_blank" href="editcva.html">Editar</a> 
                             <a rel="noopener" target="_blank" onClick="deleteCv (${item.id_usuario})">Eliminar</a>
                             <a rel="noopener" target="_blank" onClick="window.print()">Imprimir</a>
                         </div>
                     </div>`;
        fragment.appendChild(div);
    });
    items.appendChild(fragment);

}

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


function deleteCv(id){
    axios({
            method: 'delete',
            url: 'http://localhost:8081/usuarios/' + id,
            date:{
                id_usuario: id
            },
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token"),
            }
      })
      .then(function (res) {
        location.reload();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

// function deleteCv() {

//     // console.log(e.target.classList.contains('btn-delete'));
//     // const templateCard = document.getElementById('template-card').content
//     // var id = templateCard.getElementById('btn-delete').value;
//     if(e.target.classList.contains('btn-delete')){
//         console.log(e.target.parentElement);
//         axios({
//                 method: 'delete',
//                 url: 'http://localhost:8081/usuarios/id' + id,
//                 date:{
//                     id_usuario: id
//                 },
//                 headers: {
//                     'Authorization': "bearer " + localStorage.getItem("token"),
//                 }
//             }).then(function (res) {
//                 if (res.data.code === 200) {
//                     console.log(res.data.message);
//                     alert("CV eliminado");
//                 } else {
//                     alert("Algo salió mal");
//                 }
//             }).catch(function (err) {
//                 console.log(err);
//             });

//     }
//     e.stopPropagation();
// }




