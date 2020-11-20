const { gql } = require('apollo-server');


//?<---- SCHEMA - (type Definition) -------------------------->*//

const typeDefs = gql`

    type Usuario {
        id: ID
        nombre: String
        apellido: String
        email: String
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

    input UsuarioInput {
        nombre: String!
        apellido: String!
        email: String!
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
        moneda: String!
        imagen: String
    }

    input ClienteInput {
        nombre: String!
        apellido: String!
        documentoIndentidad: String
        email: String!
        telefono: String
    }


#------- Query y Mutation------------
    type Query {
        #Usuarios
        obtenerUsuario(token: String!) : Usuario

        #Productos
        obtenerProductos: [Producto]
        obtenerProducto(id: ID!): Producto

        #Clientes
        obtenerClientes: [Cliente]
    }

    type Mutation {
        #Usuarios:
        nuevoUsuario( input: UsuarioInput ) : Usuario
        autenticarUsuario( input: AutenticarInput ): Token
        
        #Productos:
        nuevoProducto(input: ProductoInput) : Producto
        actualizarProducto(id: ID!, input: ProductoInput): Producto
        eliminarProducto(id: ID!): String 

        #Cliente
        nuevoCliente(input: ClienteInput) : Cliente
    }
`;

module.exports = typeDefs;