const moongose = require('mongoose');

const ClientesSchema = moongose.Schema({

    imagen: {
        type: String,
        require: false
    },
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
    profesion: {
        type: String,
        require: false,
        trim: true
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
        estado: {
            type: String,
            require: false
        },
        municipio: {
            type: String,
            require: false
        },
        lugar: {
            type: String,
            require: false       
        }
    },
    planAfiliacion: {
        ofertas: {
            type: Boolean,
            require: false,
            default: false
        },
        recordatorio: {
            type: Boolean,
            require: false,
            default: false
        },
        suscripcion: {
            type: Boolean,
            require: false,
            default: false
        },
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