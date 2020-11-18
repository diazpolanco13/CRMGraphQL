const mongoose = require('mongose');

const UsuariosSchema = mongoose.Schema({
    nombres: {
        type: String,
        require: true,
        trim: true
    },
    apellidos: {
        type: String,
        require: true,
        trim: true
    },
    ci: {
        type: Number,
        require: true,
        trim: true,
        unique: true
    },
    edad: {
        type: Number,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        trim: true,
    },
    direccion: {
        Estado: {
            type: String,
            require: true,
            trim: true,
        },
        Municipio: {
            type: String,
            require: true,
            trim: true,
        }
    }, 
    fechaCreacionUsuario: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Usuario', UsuariosSchema)