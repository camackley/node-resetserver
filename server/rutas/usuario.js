const express = require('express');
const app = express();

const colors = require('colors');

const bcrypt = require('bcryptjs');
const _ = require('underscore');

const Usuario = require('../modelos/usuario');
const {verificaToken, verificacionRole} = require('../middlewares/autenticacion')

app.get('/usuario', verificaToken, ( req,res) =>{

  return res.json({
    usuario: req.usuario,
    nombre: req.usuario.nombre,
    email: req.usuario.email,
  })

  let desde = req.query.desde || 0;
  desde=Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);

  Usuario.find({}, 'nombre email role estado google img')
         .skip(desde)///Para saltar registros
         .limit(limite)//Para establecer un limite
         .exec((err, usuarios)=>{//Funcion de calback
      if ( err ){
         return res.status(400).json({
         ok: false,
         err
       });
     };
     Usuario.count({}, (err, conteo)=>{  //contar reguistros
     res.json({
       ok:true,
       usuarios,
       cuantos: conteo
     });
    })
});
});

app.post('/usuario',[verificaToken, verificacionRole],( req,res )=>{

  let body = req.body;


  usuario.save( (err, usuarioDB) =>{
      if ( err ){
        return res.status(400).json({
            ok: false,
          err
        });
      }
      res.json({
        ok: true,
        usuario: usuarioDB
      });
  });
});

app.put('/usuario/:id',[verificaToken, verificaToken],( req,res)=>{
  let id = req.params.id;
  let body =_.pick(req.body,['nombre', 'email', 'img', 'role', 'estado']);

  Usuario.findByIdAndUpdate( id, body, { new: true, runValidators: true}, (err, usuarioDB) =>{
    if ( err ){
      return res.status(400).json({
          ok: false,
        err
      });
    }

res.json({
  ok: true,
  usuario: usuarioDB
    });
})
});

app.delete('/usuario/:id', [verificaToken,verificacionRole], ( req,res)=>{

      let id = req.params.id;

      let cambiaEstado ={
        estado:false
      };

      Usuario.findByIdAndUpdate(id, cambiaEstado, {new: true}, (err, usuarioDeleted)=>{
        if ( err ){
          return res.status(400).json({
              ok: false,
            err
          });
        }

        res.json({
          ok:true,
          usuario: usuarioDeleted
        })
      })

  /*  let id = req.params.id;

    Usuario.findByIdAndRemove( id,(err, usuarioDeleted) =>{
      if ( err ){
        return res.status(400).json({
            ok: false,
          err
        });
      };
      if( !usuarioDeleted){
        return res.status(400).json({
            ok: false,
            err:{
            message: "Usuario no encontrado"
          }
        });
      }

      res.json({
        ok:true,
        usuario: usuarioDeleted
      })
    });*/
});

module.exports= app;
