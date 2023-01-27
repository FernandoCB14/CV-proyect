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
        searchCvs();
    }else{
        window.location.href="login.html";   
    }          
}



function searchCvs() {
    id_usuario = localStorage.getItem("id")
    axios.get(url + "/Pprofesional/" + id_usuario ,headers)
        .then(function (res) {
            console.log(res.data.message);
            showData(res.data.message);
            
           
        })
}

function showData(usuario) {
    const userD = document.getElementById('datos-usuario');
    const fragment = document.createDocumentFragment();

    // usuario.forEach((item, index) => {
    
    const tarjeta= document.createElement('div');
    tarjeta.className='tarjeta';

        const div = document.createElement('div');
        const item= usuario[0];
        div.className = `user_data`;
        div.id = `user-data`;

        div.innerHTML = `<div>
                            <div class="contenido">
                                <div class="contenido1">
                                    <div class="nombres">
                                        <div class="form-group-names">
                                            <input class="form-control" value='${item.nombre}'id="input-name" placeholder="">
                                            <input class="form-control" value='${item.apellido_paterno}' id="input-ln" placeholder="">
                                            <input class="form-control" value='${item.apellido_materno}' id="input-mln" placeholder="">
                                        </div>
                                    </div>
                                    <div class="detalles">
                                            <h1>Datos de contacto</h1>
                                        </div>
                                        <div class="form-group1">
                                            <label for="input-dir">Dirección</label>
                                            <input class="form-control" value='${item.direccion}' id="input-dir" placeholder="">
                                        </div>
                                        <div class="form-group1">
                                            <label for="input-zp">Código postal</label>
                                            <input class="form-control" value='${item.codigo_postal}' id="input-zp" placeholder="">
                                        </div>
                                        <div class="form-group1">
                                            <label for="input-sta">estado</label>
                                            <input class="form-control" value='${item.estado}' id="input-sta" placeholder="">
                                        </div>
                                        <div class="form-group1">
                                            <label for="input-mail">correo electrónico</label>
                                            <input class="form-control" value='${item.correo_electronico}' id="input-mail" placeholder="">
                                        </div>
                                        <div class="form-group1">
                                            <label for="input-phone">Número telefónico</label>
                                            <input class="form-control" value='${item.numero_telefono}' id="input-phone" placeholder="">
                                        </div>
                                </div>
                                <div class="contenido2">
                                    <div class="perfil">
                                        <h1>Perfil</h1>
                                    </div>
                                    <div class="form-group2">
                                        <label for="input-formacd">Formación académica</label>
                                        <input class="form-control" value='${item.formacion_academica}' id="input-formacd" placeholder="">
                                    </div>   
                                    <div class="form-group2">
                                        <label for="input-profexp">Experiencia profesional </label>
                                        <input class="form-control" value='${item.experiencia_profesional}' id="input-profexp" placeholder="">
                                    </div>
                                    <div class="form-group2">
                                        <label for="input-idioms">Idiomas</label>
                                        <input class="form-control" value='${item.idiomas_domina}' id="input-idioms" placeholder="">
                                    </div>
                                    <div class="form-group2">
                                        <label for="input-profdesc">Descripción profesional</label>
                                        <input class="form-control" value='${item.descripcion_profesional}' id="input-profdesc" placeholder="">
                                    </div>
                                    <div class="form-group2">
                                        <label for="input-skillsP">habiliades profesionales</label>
                                        <input class="form-control" value='${item.habilidades_profesional}' id="input-skillsp" placeholder="">
                                    </div>
                                </div>
                            </div>
                            <div id="buttons">
                                <button id="btn1" rel="noopener" target="_blank" onClick="update(${item.id_usuario})">Actualizar</button>
                                <input id="btn1" type="button" value="Regresar" onClick="history.go(-1);">
                            </div>
                        </div>`;
        fragment.appendChild(div);
    // });
    userD.appendChild(fragment); 
    
}


function update(id){

    var name = document.getElementById('input-name').value;
    var last_name= document.getElementById('input-ln').value;
    var mlast_name= document.getElementById('input-mln').value;
    var direc= document.getElementById('input-dir').value;
    var zp= document.getElementById('input-zp').value;
    var state= document.getElementById('input-sta').value;
    var mail= document.getElementById('input-mail').value;
    var phone= document.getElementById('input-phone').value;
    var formacd= document.getElementById('input-formacd').value;
    var profexp= document.getElementById('input-profexp').value;
    var idioms= document.getElementById('input-idioms').value;
    var profdesc= document.getElementById('input-profdesc').value;
    var skillsp= document.getElementById('input-skillsp').value;
    
    
    axios({
        method: 'put',
        url:'http://localhost:8081/Pprofesional/' + id, 
        data:{
            id_usuario:id,
            nombre: name,
            apellido_paterno: last_name,
            apellido_materno: mlast_name,
            direccion: direc,
            codigo_postal: zp,
            estado:state,
            correo_electronico: mail,
            numero_telefono: phone,
            formacion_academica: formacd,
            experiencia_profesional: profexp,
            idiomas_domina: idioms,
            descripcion_profesional:profdesc,
            habilidades_profesional: skillsp
        },
        headers:{
            'Authorization': "bearer " + localStorage.getItem("token"),
        }
    }).then(function (res){
        if(res.data.code ===200){
             console.log(res.data.message);
            alert("Datos actualizados");
            window.location.href="opencv.html";
        }else{
            alert("Algo salió mal");
        }
    }).catch(function(err){
        console.log(err);
    });
}


