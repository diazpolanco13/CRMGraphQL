const mongoose = require('mongoose');

const ProductosSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    imagen: {
        type: String,
        require: false,
        trim: true
    },
    existencia: {
        type: Number,
        require: true,
        trim: true
    },
    precio: {
        type: Number,
        require: true,
        trim: true
    },
    moneda: {
        type: Number,
        require: true,
    },
    creado: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Producto', ProductosSchema);