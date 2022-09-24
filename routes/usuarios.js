const express = require('express');
const usuarios = express.Router();
const db = require('../models/database');



//TODOS: cambiar los atributos de las rutas 

usuarios.get('/', async(req, res) => {
    try {
        const usuario = await db.query("SELECT * from usuario");
        return res.status(200).json({code: 200, message: usuario});
    } catch (error) {
        return res.status(500).json({code: 500, message: error});
    }
    
});

usuarios.post("/insert", async (req, res, next) => {

    const { nombre, apellido_paterno, apellido_materno, direccion, codigo_postal,estado, correo_electronico, numero_telefono, formacion_academica, experiencia_profesional, idiomas_domina } = req.body;

    console.log(req.body);
    if (nombre && apellido_paterno && apellido_materno && direccion && codigo_postal && estado && correo_electronico && numero_telefono && formacion_academica && experiencia_profesional && idiomas_domina) {
        let query = "INSERT INTO usuario(nombre, apellido_paterno, apellido_materno, direccion, codigo_postal,estado, correo_electronico, numero_telefono, formacion_academica, experiencia_profesional, idiomas_domina)";
        query += `VALUES('${nombre}','${apellido_paterno}', '${apellido_materno}', '${direccion}', '${codigo_postal}', '${estado}', '${correo_electronico}', '${numero_telefono}','${formacion_academica}', '${experiencia_profesional}', '${idiomas_domina}')`;
        console.log(query)
        const rows = await db.query(query);
        console.log(rows);
        if (rows.affectedRows == 1) {

            return res.status(201).json({ code: 201, message: "usuario insertado correctamente" });
        }

        return res.status(500).json({ code: 500, message: "ocurrió un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});



usuarios.put("/:id([0-9]{1,3})", async (req, res, next) => {
    const {nombre, apellido_paterno, apellido_materno, direccion, codigo_postal,estado, 
        correo_electronico, numero_telefono, formacion_academica, experiencia_profesional, idiomas_domina } = req.body;

    if (nombre && apellido_paterno && apellido_materno && direccion && codigo_postal && estado && correo_electronico && numero_telefono && formacion_academica && experiencia_profesional && idiomas_domina) {
        let query = `UPDATE usuario SET nombre='${nombre}', apellido_paterno='${apellido_paterno}',`;
        query+= `apellido_materno='${apellido_materno}', direccion='${direccion}',codigo_postal= '${codigo_postal}',`;
        query+= `estado='${estado}',correo_electronico ='${correo_electronico}', numero_telefono='${numero_telefono}', formacion_academica='${formacion_academica}', experiencia_profesional='${experiencia_profesional}', idiomas_domina='${idiomas_domina}' WHERE id_usuario = ${req.params.id};`;
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Empleado actualizado" });
        }

        return res.status(500).json({ code: 500, message: "ocurrió un error" });
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});

});

usuarios.delete("/:id([0-9]{1,3})", async (req, res, next) =>{

    const query = `DELETE FROM usuario WHERE id_usuario = ${req.params.id} `;
    const rows = await db.query(query);

    if(rows.affectedRows == 1){
        return res.status(200).json({code: 200, message: "Usuario eliminado correctamente"});
    }
    return res. status(404).json({code: 404, message: "Usuario no encontrado"});
});

usuarios.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    if (id >= 0) {
        const emp = await db.query("SELECT * FROM usuario WHERE id_usuario =" + id + ";");
        return res.status(200).json({ code: 200, message: emp });
    }
    return res.status(404).send({ code: 404, message: "empleado no encontrado" });

});

//[A-Za-z]+) sirve para que acepte texto de cualquier tipo 
usuarios.get('/:name(([a-zA-Z]*(%20)?){1,5})', async (req, res, next) => {
    const name = req.params.name;
    const encoudname= decodeURI(name);
    console.log(encoudname);
    
    // document.write(encoudname);
    const emp = await db.query("SELECT * FROM usuario WHERE nombre ='" + encoudname + "';");
    // const emp =0;
    if (emp.length > 0) {
        
        return res.status(200).json({ code: 200, message: emp });
    }
    return res.status(404).json({ code: 404, message: "Empleado no encontrado" });
});


// router.app.pach('/', (req, res)=> {
//     res.json({
//         msg:'patch api'
//     });
//     });



module.exports = usuarios;