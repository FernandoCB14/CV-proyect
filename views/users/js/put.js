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
        // document.getElementById('btn1').addEventListener('click', newdata);
        searchCvs();
        // document.getElementById('btn2').addEventListener('click', searchname);  
    }else{
        window.location.href="login.html";   
    }    
      
}
function searchCvs(id_usuario) {
   
    axios.get(url + "/usuarios/" + id_usuario ,headers)
        .then(function (res) {
            console.log( localStorage.getItem("id", res.data.message));
            console.log(res.data.message);
            showData(res.data.message);
           
        })
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


function update(){

    var id = document.getElementById('input-id').value;
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
        url:'http://localhost:8081/usuarios/' + id, 
        data:{
            id_usuario:id,
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
            console.log(res.data.message);
            alert("Datos actualizados");
        }else{
            alert("Algo salió mal");
        }
    }).catch(function(err){
        console.log(err);
    });
}