const { Router } = require('express');
const express = require('express');
const academic = express.Router();
const db = require('../models/database');


academic.get("/:id([0-9]{1,3})", async (req, res, next) => {
    const id_usuario = req.user.user_id;
    const emp= await db.query(`SELECT * FROM perfil_academico a, perfil_general g WHERE g.id_usuario= ${req.params.id}`);
    try {
      return res.status(200).json({ code: 200, message: emp});
    } catch (error) {
      return res.status(404).json({ code: 404, message: "Empleado no encontrado" });
    }
  });

//Consultar los cvs del usuario actual
academic.get('/cvs', async (req, res) => {
    const id_usuario = req.user.user_id;
    console.log(id_usuario);
    let query= `SELECT * FROM perfil_general WHERE user_id = ${id_usuario}`;
    console.log(query);
    const emp = await db.query(query);

    const promesaPerfiles= emp.map(async (perfil)=>{
        let query=`SELECT * FROM perfil_profesional WHERE id_usuario =${perfil.id_usuario} `;
        const resP = await db.query(query);
        if(resP.length != 0){
            perfil.tipo="Profesional";
        }else{
            perfil.tipo="Academico";
        }
        return perfil;

    })
    const perfiles= await Promise.all(promesaPerfiles);
    console.log(perfiles);
    return res.status(200).json({ code: 200, message: perfiles });
});

academic.post("/insert", async (req, res, next) => {

    const { nombre, apellido_paterno, apellido_materno, direccion, codigo_postal, estado, correo_electronico, numero_telefono, formacion_academica, experiencia_profesional, idiomas_domina, habilidades_academico, otros_intereses } = req.body;
    const id_usuario = req.user.user_id;
    // console.log(id_usuario);
    // console.log(req.body);
    if (nombre && apellido_materno && apellido_materno && direccion && codigo_postal && estado && correo_electronico && numero_telefono && formacion_academica && experiencia_profesional && idiomas_domina && habilidades_academico && otros_intereses) {
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
        let query2 = "INSERT INTO perfil_academico(habilidades_academico,otros_intereses, id_usuario)";
        query2 += `VALUES(
        '${habilidades_academico}', 
        '${otros_intereses}', 
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

academic.put("/:id([0-9]{1,3})", async (req, res, next) => {

    const { nombre, apellido_paterno, apellido_materno, direccion, codigo_postal, estado,
        correo_electronico, numero_telefono, formacion_academica, experiencia_profesional, idiomas_domina, habilidades_academico, otros_intereses} = req.body;

    if (req.body.keys !== null || undefined && req.body.values !== null || undefined) {
        let query = `UPDATE perfil_general SET nombre='${nombre}', apellido_paterno='${apellido_paterno}',`;
        query += `apellido_materno='${apellido_materno}', direccion='${direccion}',codigo_postal= '${codigo_postal}',`;
        query += `estado='${estado}',correo_electronico ='${correo_electronico}', numero_telefono='${numero_telefono}', formacion_academica='${formacion_academica}', experiencia_profesional='${experiencia_profesional}', idiomas_domina='${idiomas_domina}' WHERE id_usuario = ${req.params.id};`;
        const userResult = await db.query(query);
        console.log(userResult);

        let query2 = `UPDATE perfil_academico SET habilidades_academico='${habilidades_academico}', otros_intereses='${otros_intereses}' WHERE id_usuario = ${req.params.id};`;
        const result = await db.query(query2);
        console.log(result);

        if (result.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Empleado actualizado" });
        }

        return res.status(500).json({ code: 500, message: "ocurrió un error" });
    }

    return res.status(400).json({ code: 400, message: "Campos incompletos" });

});

academic.delete("/:id([0-9]{1,3})", async (req, res, next) => {

    const query = `DELETE FROM perfil_general WHERE id_usuario=${req.params.id}`;
    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: "Usuario eliminado correctamente" });
    }
    return res.status(404).json({ code: 404, message: "Usuario no encontrado" });
});



module.exports = academic;