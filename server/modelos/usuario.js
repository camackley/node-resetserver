const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;
let rolesValidos = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: "El '{VALUE}' no es un rol valido"
}

let usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, `El nombre es un campo obligatorio`]
  },
  email:{
    unique: true,
    type: String,
    required: [true, `El correo es un campo obligatorio`]
  },
  clave:{
    type: String,
    required: [true, `La clave es obligatoria`]
  },
  img:{
    type: String,
    required: false
  },
  role:{
    type: String,
    default: 'USER_ROLE',
    enum: rolesValidos
  },
  estado:{
    type: Boolean,
    default:true
  },
  google:{
    type: Boolean,
    default: false
  }
});

usuarioSchema.methods.toJSON = function (){
  let user = this;
  let userObject = user.toObject();
  delete userObject.clave;

  return userObject;
};

usuarioSchema.plugin( uniqueValidator, { message: 'El {PATH} ya está registrado'} );

module.exports = mongoose.model( 'Usuario', usuarioSchema );
