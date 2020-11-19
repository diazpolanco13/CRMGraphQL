const { gql } = require('apollo-server');


//?<---- SCHEMA - (type Definition) -------------------------->*//

const typeDefs = gql`
#Crear Usuario
    type Usuario {
        id: ID
        nombre: String
        apellido: String
        email: String
        creado: String
    }

    input UsuarioInput {
        nombre: String!
        apellido: String!
        email: String!
        password: String!
    }
#Crear Token
    type Token {
        token: String
    }

    input AutenticarInput {
        email: String!
        password: String!
    }

    
#------- Query y Mutation------------
    type Query {
        obtenerUsuario(token: String!) : Usuario
    }

    type Mutation {
        nuevoUsuario( input: UsuarioInput ) : Usuario
        autenticarUsuario( input: AutenticarInput ): Token
    }
`;

module.exports = typeDefs;