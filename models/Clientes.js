const moongose = require('mongoose');

const ClientesSchema = moongose.Schema({

    nombre: {
        type: String,
        require: true,
        trim: true
    },
    apellido: {
        type: String,
        require: true,
        trim: true
    },
    documentoIndentidad: {
        type: String,
        require: false,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    telefono: {
        type: String,
        require: false,
        trim: true,
        unique: true
    },
    direccion: {
        Estado: {
            type: String,
            require: false
        },
        municipio: {
            type: String,
            require: false
        }
    },
    vendedor: {
        type: moongose.Schema.Types.ObjectId,
        require: true,
        ref: "Usuario"
    },
    creado: {
        type: Date,
        default: Date.now()
    }
});

module.exports = moongose.model('Cliente', ClientesSchema);