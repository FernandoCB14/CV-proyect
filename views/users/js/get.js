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
        // document.getElementById('btn-delete').addEventListener('click', deleteCv);
        
        // document.addEventListener("DOMContentLoaded", searchCvs());

        // mycvs.addEventListener('click', e=>{
        //     deleteCv(e); 
        // })

        searchCvsa();


    } else {
        window.location.href = "login.html";
    }
}

function searchCvsa() {
    axios.get(url + "/Pacademic/cvs", headers)
        .then(function (res) {
            // localStorage.setItem("id", res.data.message.id_usuario);
            console.log(res.data.message);
            // showData(res.data.message);
            showCards(res.data.message);
        })
}

function showCards(cvs) {
    //con templates
    // const items = document.getElementById('mycvs')
    // const templateCard = document.getElementById('template-card').content
    // const fragment = document.createDocumentFragment();

    // cvs.forEach((item, index) => {
    //     templateCard.querySelector('h1').textContent = item.nombre;
    //     templateCard.querySelector('h5').textContent = item.apellido_materno;
    //     templateCard.querySelector('.btn-delete').dataset.id= item.id_usuario;

    //     const clone = templateCard.cloneNode(true);
    //     fragment.appendChild(clone);

    // });
    // items.appendChild(fragment);

    //sin templates
    const myCvs = document.getElementById('my-cvs');
    const fragment = document.createDocumentFragment();
    const tarjeta = document.querySelector('tarjeta');

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
                             <a rel="noopener" target="_blank" onClick="update(${item.id_usuario})">Editar</a> 
                             <a rel="noopener" target="_blank" onClick="deleteCv(${item.id_usuario})">Eliminar</a>
                             <a rel="noopener" target="_blank" onClick="window.print()">Imprimir</a>
                         </div>
                     </div>`;
        fragment.appendChild(div);
    });
    myCvs.appendChild(fragment);

}

//PUT
function deleteCv(id) {
        axios({
            method: 'delete',
            url: 'http://localhost:8081/Pacademic/' + id,
            date: {
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


function update(id) {
    localStorage.setItem("id", id)
    window.location= "editcva.html"
}


// function deleteCv(e, id) {
//     // console.log(e.target);
//     console.log(e.target.classList.contains('btn-delete'));
    
    
//     const templateCard = document.getElementById('template-card').content
//     // templateCard.querySelector('.btn-delete').dataset.id= item.id_usuario;
//     var id= templateCard.getElementById('data-id').dataset.id;

//     if (e.target.classList.contains('btn-delete')) {
//         axios({
//             method: 'delete',
//             url: 'http://localhost:8081/usuarios/' + id,
//             date: {
//                 id_usuario: id
//             },
//             headers: {
//                 'Authorization': "bearer " + localStorage.getItem("token"),
//             }
//         })
//             .then(function (res) {
//                 location.reload();
//             })
//             .catch(function (err) {
//                 console.log(err);
//             });
//     }
//     e.stopPropagation();
    
// };




