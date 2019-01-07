const express = require('express');
const app = express();

const colors = require('colors');

const bcrypt = require('bcryptjs');
const _ = require('underscore');

const jwt = require ('jsonwebtoken');

const Usuario = require('../modelos/usuario');


app.post('/login', (req, res) =>{

  let body = req.body;

    Usuario.findOne({ email:body.email },(err, usuarioDB)=>{

        if (err){
          return res.status(500).json({
            ok:false,
            err
          });
        }

        if( !usuarioDB ){
            return res.status(400).json({
              ok:false,
              err:{
                message: '(Usuario) o contraseña incorrectos'
              }
            });
          }

      if (!bcrypt.compareSync (body.clave, usuarioDB.clave )){
          return res.status(400).json({
          ok:false,
          err:{
            message: 'Usuario o (contraseña) incorrectos'
          }
      });
    }

    let token = jwt.sign({
      usuario: usuarioDB
    },process.env.SEED,{ expiresIn: process.env.CADUCIDAD_TOKEN});

    res.json({
      ok: true,
      usuario: usuarioDB,
      token
    });
  });
});

module.exports = app;
