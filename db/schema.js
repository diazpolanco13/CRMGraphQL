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
        existencia: Int
        precio: Float
        moneda: String
        creado: String
    }
    type Cliente {
        id: ID
        nombre: String
        apellido: String
        documentoIndentidad: String
        email: String
        telefono: String
        vendedor: ID
    }
    type Pedido {
        id: ID
        pedido: [PedidoGrupo]
        total: Float
        cliente: ID
        vendedor: ID
        creado: String
        estado: EstadoPedido
    }
    type PedidoGrupo {
        id: ID,
        cantidad: Int
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
        nombre: String
        descripcion: String
        existencia: Int!
        precio: Float!
        moneda: TipoMoneda
        imagen: String
    }

    input ClienteInput {
        nombre: String!
        apellido: String!
        documentoIndentidad: String
        email: String!
        telefono: String
    }
    input PedidoProductoInput {
        id: ID
        cantidad: Int
    }

    input PedidoInput {
        pedido: [PedidoProductoInput]
        total: Float
        cliente: ID
        estado: EstadoPedido
    }

#---ENUM----------------------------->

    enum EstadoPedido {
        PENDIENTE
        COMPLETADO
        CANCELADO
    }

    enum TipoMoneda {
        DOLARES
        EUROS
        BOLIVARES
    }

#----------------------------------------------------
#-------------------Query y Mutation-----------------
#----------------------------------------------------
    type Query {
        #Usuarios
        obtenerUsuario(token: String!) : Usuario

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