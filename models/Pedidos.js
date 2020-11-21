const mongoose = require('mongoose');


const PedidosSchema = mongoose.Schema({
    
    pedido: {
        type: Array,
        require: true
    },
    total: {
        type: Number,
        require: true
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Cliente"
    },
    vendedor: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Usuario"
    },
    estado: {
        trype: String,
        default: "PENDIENTE"
    },
    creado: {
        type: Date,
        detault: Date.now()
    }
});

module.exports = mongoose.model('Pedido', PedidosSchema);