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
        document.getElementById('btn1').addEventListener('click', searchCvs);
        document.getElementById('btn2').addEventListener('click', mostrarD);
        // document.getElementById('btn3').addEventListener('click', update);
        searchCvs();
    } else {
        window.location.href = "login.html";
    }


}


function searchid() {
    let idUsuario = document.getElementById("input-id").value;
    // const gruposDiv = document.getElementById('datos-usuario');
    axios.get(url + "/usuarios/" + idUsuario, headers)
        .then(function (res) {
            console.log(res.data.message);
            showData(res.data.message);

        })
}

function searchCvs() {
    axios.get(url + "/usuarios/cvs", headers)
        .then(function (res) {
            console.log(res.data.message);
            // showData(res.data.message);
            showCards(res.data.message);
        })
}


function mostrarD() {
    axios.get(url + "/usuarios/datos", headers)
        .then(function (res) {
            showData(res.data.message);
            console.log(res.data.message);
        })
}


function showCards(cvs) {

    const myCvs = document.getElementById('my-cvs');
    // const tarjeta = document.querySelector('tarjeta');


    cvs.forEach((item, index) => {
        // const tarjeta= document.createElement('div');
        // tarjeta.className='tarjeta';

        const div = document.createElement('div');
        div.className = `cv-card`;
        div.id = `cv-card${index + 1}`;

        div.innerHTML = `<h2 class= "titulo">${item.nombre}</h2> 
                         ${item.apellido_paterno}  
                         ${item.apellido_materno}`;
        myCvs.appendChild(div);
        // tarjeta.textContent=div;

    });

    //-----------------------------------


    // const myCvs = document.createElement("div");
    // myCvs.className= 
    // document.body.appendChild(myCvs);


    // le añado un id al elemento div
    // const div = document.getElementsByTagName("div")[0];
    // div.className = "flex-container";
    // div.id = "my-cvs";

    // const mostrarInfo = cvs.map(function (info) {
    //     return '<div>'
    //         + '<h2 class= "titulo">' +info.nombre + '</h2>'
    //         + '<p class= "cuerpo">' + info.apellido_paterno + '</p>'
    //         + '<p class= "cuerpo">' + info.apellido_materno+ '</p>'
    //         + '</div>';
    // }).join('')
    // document.getElementById("my-cvs").innerHTML = mostrarInfo;









    // for (var i = 0; i < cvs.length; i++) {
    //     myCvs.innerHTML += `<div >
    //                                     <div class="form-group">
    //                                         <h3>${cvs[i].nombre} ${cvs[i].apellido_paterno}  ${cvs[i].apellido_materno} </h3>
    //                                     </div>

    //                         </div>`;


    //     // const cuerpo = document.querySelector('cuerpo');
    //     tarjeta.appendChild(myCvs.innerHTML);
    //     myCvs.textContent = myCvs.innerHTML;


    // }




}


function showData(usuario) {
    var datosUsuario = document.getElementById("datos-usuario");
    for (var i = 0; i < usuario.length; i++) {
        datosUsuario.innerHTML += `<div >
                                    <div class="form-group">
                                        <label for="input-name">Nombre</label>
                                        <input class="form-control" value=${usuario[i].nombre} id="input-name" placeholder="******">
                                        <input class="form-control" value = ${usuario[i].apellido_paterno} id="input-ln" placeholder="********** ">
                                        <input class="form-control" value=${usuario[i].apellido_materno} id="input-mln" placeholder="********** ">
                                    </div>
                                    <div >  
                                        <label for="input-dir">direccion</label>
                                        <input class="form-control"  value = ${usuario[i].direccion} id="input-dir" placeholder="********** ">
                                    </div>
                                    <div class="form-group">
                                        <label for="input-zp">codigo postal</label>
                                        <input class="form-control" value = ${usuario[i].codigo_postal} id="input-zp" placeholder="********** ">
                                    </div>
                                    <div class="form-group">
                                        <label for="input-sta">estado</label>
                                        <input class="form-control" value = ${usuario[i].estado} id="input-sta" placeholder="********** ">
                                    </div>
                                        <label for="input-tnum">número de teléfono</label>
                                        <input class="form-control"value = ${usuario[i].numero_telefono} id="input-tnum" placeholder="********** ">
                                    <div class="form-group">
                                       
                                    </div>

                                    <div class="form-group">
                                        <label for="input-mail">correo electronico</label>
                                        <input class="form-control" value = ${usuario[i].correo_electronico} id="input-mail" placeholder="********** ">
                                    </div>
                                    <div class="form-group">
                                    </div>`;

    }

    const limpiarDivButton = document.createElement('button');
    limpiarDivButton.textContent = "Limpiar";

    limpiarDivButton.onclick = () => {
        datosUsuario.innerHTML = "";
    };
    datosUsuario.appendChild(limpiarDivButton);

    const btnUpdate = document.createElement('button');
    btnUpdate.textContent = "Actualizar"
    btnUpdate.onclick = update;
    datosUsuario.appendChild(btnUpdate);

    const btnA = document.createElement('button');
    btnA.textContent = "Datos académicos";

    // btnA.onclick = showDataA

    datosUsuario.appendChild(btnA);



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



