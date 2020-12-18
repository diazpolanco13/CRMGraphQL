const { gql } = require('apollo-server');


//?<---- SCHEMA - (type Definition) -------------------------->*//

const typeDefs = gql`
#---- TYPES --------------------------->
    type Usuario {
        id: ID
        nombre: String
        apellido: String
        email: String
        telefono: String
        creado: String
    }
    type Token {
        token: String
    }
    type Producto {
        id: ID
        imagen: String
        nombre: String
        descripcion: String
        categoria: String
        existencia: Int
        precio: Float
        moneda: String
        creado: String
    }
    type Cliente {
        id: ID
        imagen: String
        nombre: String
        apellido: String
        documentoIndentidad: String
        profesion: String
        email: String
        telefono: String
        direccion: DireccionType
        planAfiliacion: AfiliacionesType
        vendedor: ID
        creado: String
    }
    type DireccionType {
        estado: String
        municipio: String
        lugar: String
    }
    type AfiliacionesType {
        ofertas: Boolean
        recordatorio: Boolean
        suscripcion: Boolean
    }


    type Pedido {
        id: ID
        pedido: [PedidoGrupo]
        total: Float
        cliente: Cliente
        vendedor: ID
        creado: String
        estado: EstadoPedido
    }
    type PedidoGrupo {
        id: ID,
        cantidad: Int,
        nombre: String,
        precio: Float
    }
    type TopCliente {
        total: Float
        cliente: [Cliente]
    }
    type TopVendedor {
        total: Float
        vendedor: [Usuario]
    }

#---INPUTS----------------------------->
    input UsuarioInput {
        nombre: String!
        apellido: String!
        email: String!
        telefono: String
        password: String!
    }
    input AutenticarInput {
        email: String!
        password: String!
    }
    input ProductoInput {
        nombre: String!
        descripcion: String!
        existencia: Int!
        precio: Float!
        categoria: String
        moneda: TipoMoneda
        imagen: String
    }
    input ClienteInput {
        imagen: String
        nombre: String!
        apellido: String!
        documentoIndentidad: String
        profesion: String
        email: String!
        telefono: String
        direccion: DireccionInput
        planAfiliacion: AfiliacionesInput
    }
    input DireccionInput {
        estado: String
        municipio: String
        lugar: String
    }
    input AfiliacionesInput {
        ofertas: Boolean
        recordatorio: Boolean
        suscripcion: Boolean
    }
    input PedidoInput {
        pedido: [PedidoProductoInput]
        total: Float
        cliente: ID
        estado: EstadoPedido
    }
    input PedidoProductoInput {
        id: ID,
        cantidad: Int,
        nombre: String,
        precio: Float
    }

#---ENUM----------------------------->

    enum EstadoPedido {
        PENDIENTE
        COMPLETADO
        CANCELADO
    }

    enum TipoMoneda {
        Dolares
        Euros
        Bolivares
    }

#----------------------------------------------------
#-------------------Query y Mutation-----------------
#----------------------------------------------------
    type Query {
        #Usuarios
        obtenerUsuario : Usuario

        #Productos
        obtenerProductos: [Producto]
        obtenerProducto(id: ID!): Producto

        #Clientes
        obtenerClientes: [Cliente]
        obtenerClientesVendedor: [Cliente]
        obtenerCliente(id: ID!): Cliente

        #Pedidos
        obtenerPedidos: [Pedido]
        obtenerPedidosVendedor: [Pedido]
        obtenerPedido(id: ID!): Pedido
        obtenerPedidoEstado(estado: String!): [Pedido]

        #Busquedas avanzadas
        mejoresClientes: [TopCliente]
        mejoresVendedores: [TopVendedor]
        buscarProductos(texto: String!) : [Producto]
    }

    type Mutation {
        #Usuarios:
        nuevoUsuario( input: UsuarioInput ) : Usuario
        autenticarUsuario( input: AutenticarInput ): Token
        actualizarUsuario( id: ID!, input: UsuarioInput ) : Usuario
        
        #Productos:
        nuevoProducto(input: ProductoInput) : Producto
        actualizarProducto(id: ID!, input: ProductoInput): Producto
        eliminarProducto(id: ID!): String 

        #Cliente
        nuevoCliente(input: ClienteInput) : Cliente
        actualizarCliente( id: ID!, input: ClienteInput): Cliente
        eliminarCliente(id: ID!): String

        #Pedidos
        nuevoPedido(input: PedidoInput): Pedido
        actualizarPedido(id:ID!, input: PedidoInput): Pedido
        eliminarPedido(id: ID) : String
    }
`;

module.exports = typeDefs;