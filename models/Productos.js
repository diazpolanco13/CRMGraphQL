const mongoose = require('mongoose');

const ProductosSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        require: true
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
        type: String,
        require: true,
    },
    creado: {
        type: Date,
        default: Date.now()
    }
});

ProductosSchema.index({
    nombre: 'text'
});

module.exports = mongoose.model('Producto', ProductosSchema);