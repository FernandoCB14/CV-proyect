const express= require('express');
const profesional= express.Router();
const db = require('../models/database');

profesional.get("/:id([0-9]{1,3})", async (req, res, next) => {
    const id_usuario = req.user.user_id;
    const emp= await db.query(`SELECT * FROM perfil_profesional p, perfil_general g WHERE g.id_usuario= ${req.params.id}`);
    try {
      return res.status(200).json({ code: 200, message: emp});
    } catch (error) {
      return res.status(404).json({ code: 404, message: "Empleado no encontrado" });
    }
  });
//Consultar los cvs del usuario actual
profesional.get('/cvs', async (req, res) => {
    const id_usuario = req.user.user_id;
    console.log(id_usuario);
    let query= `SELECT * FROM perfil_general WHERE user_id = ${id_usuario}`;
    console.log(query);
    const emp = await db.query(query);
    return res.status(200).json({ code: 200, message: emp });
});

profesional.post("/insert", async (req, res, next) => {

    //TODOS: hacer insert en dos trablas
    // const id_usuario = req.user;
    // console.log(id_usuario);
    const { nombre, apellido_paterno, apellido_materno, direccion, codigo_postal, estado, correo_electronico, numero_telefono, formacion_academica, experiencia_profesional, idiomas_domina, descripcion_profesional, habilidades_profesional} = req.body;
    const id_usuario = req.user.user_id;
    console.log(id_usuario);
    console.log(req.body);
    if (nombre && apellido_materno && apellido_materno && direccion && codigo_postal && estado && correo_electronico && numero_telefono && formacion_academica && experiencia_profesional && idiomas_domina && descripcion_profesional && habilidades_profesional) {
        let query = "INSERT INTO perfil_general(nombre, apellido_paterno, apellido_materno, direccion, codigo_postal,estado, correo_electronico, numero_telefono, formacion_academica, experiencia_profesional, idiomas_domina, user_id)";
        query += `VALUES(
            '${nombre}',
            '${apellido_paterno}', 
            '${apellido_materno}', 
            '${direccion}', 
            '${codigo_postal}', 
            '${estado}', 
            '${correo_electronico}', 
            '${numero_telefono}',
            '${formacion_academica}', 
            '${experiencia_profesional}', 
            '${idiomas_domina}',
            '${id_usuario}')`;

        const userResult = await db.query(query);
        console.log(userResult);
        let query2 = "INSERT INTO perfil_profesional(descripcion_profesional, habilidades_profesional, id_usuario)";
        query2 += `VALUES(
        '${descripcion_profesional}', 
        '${habilidades_profesional}', 
        '${userResult.insertId}')`
        const result = await db.query(query2);
        console.log(result);
        if (result.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "usuario insertado correctamente" });
        }
        return res.status(400).json({ code: 400, message: "ocurrió un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

profesional.put("/:id([0-9]{1,3})", async (req, res, next) => {

    const { nombre, apellido_paterno, apellido_materno, direccion, codigo_postal, estado,
        correo_electronico, numero_telefono, formacion_academica, experiencia_profesional, idiomas_domina, descripcion_profesional, habilidades_profesional} = req.body;

    if (req.body.keys !== null || undefined && req.body.values !== null || undefined) {
        let query = `UPDATE perfil_general SET nombre='${nombre}', apellido_paterno='${apellido_paterno}',`;
        query += `apellido_materno='${apellido_materno}', direccion='${direccion}',codigo_postal= '${codigo_postal}',`;
        query += `estado='${estado}',correo_electronico ='${correo_electronico}', numero_telefono='${numero_telefono}', formacion_academica='${formacion_academica}', experiencia_profesional='${experiencia_profesional}', idiomas_domina='${idiomas_domina}' WHERE id_usuario = ${req.params.id};`;
        const userResult = await db.query(query);
        console.log(userResult);

        let query2 = `UPDATE perfil_profesional SET descripcion_profesional='${descripcion_profesional}',habilidades_profesional='${habilidades_profesional}' WHERE id_usuario = ${req.params.id};`;
        const result = await db.query(query2);
        console.log(result);

        if (result.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Empleado actualizado" });
        }

        return res.status(500).json({ code: 500, message: "ocurrió un error" });
    }

    return res.status(400).json({ code: 400, message: "Campos incompletos" });

});

profesional.delete("/:id([0-9]{1,3})", async (req, res, next) => {

    const query = `DELETE FROM perfil_general WHERE id_usuario=${req.params.id}`;
    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: "Usuario eliminado correctamente" });
    }
    return res.status(404).json({ code: 404, message: "Usuario no encontrado" });
});

module.exports= profesional;
