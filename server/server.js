require('./config/config.js');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose= require('mongoose');
const colors = require ('colors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use( require('./rutas/usuario') );

//coneccion BD
mongoose.connect(process.env.URLDB, (err, res)=> {
    if( err ) throw colors.red(err);

    console.log(colors.green('Online'));
});

app.listen(process.env.PORT, ()=>{
  console.log(colors.green(`Escuchando el puerto: ${process.env.PORT}`));
});
