

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
        searchCvsa();
        
    } else {
        window.location.href = "login.html";
    }
}

function searchCvsa() {
    axios.get(url + "/Pacademic/cvs", headers)
        .then(function (res) {
            console.log(res.data.message);
            showCards(res.data.message);
            
            
        })
}

function showCards(cvs) {
    const myCvs = document.getElementById('my-cvs');
    const fragment = document.createDocumentFragment();

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
                            <a rel="noopener" target="_blank" onClick="update(${item.id_usuario}, '${item.tipo}')">Editar</a> 
                            <a rel="noopener" target="_blank" onClick="deleteCv(${item.id_usuario})">Eliminar</a>
                            <a rel="noopener" target="_blank" onClick="btnpdf(${item.id})">Imprimir</a>
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

function update(id, tipo) {
    localStorage.setItem("id", id)

    if(tipo=="Profesional"){
        window.location= "editcvp.html"
    }else{
        window.location= "editcva.html"
    }
     
}

function btnpdf(id) {
    var doc = new jsPDF('p', 'pt', 'letter');
    var margin = 10;
    var scale = (doc.internal.pageSize.width - margin * 2 )/ document.body.scrollWidth;
    doc.html(document.body,{
        x:margin,
        y: margin,
        html2canvas:{
            scale: scale,

        },
        callback: function(doc){
            doc.output('dataurlnewwindow', {filname: 'fiche'});
        }
    }); 
}





