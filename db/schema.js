const { gql } = require('apollo-server');


//?<---- SCHEMA - (type Definition) -------------------------->*//
const typeDefs = gql`
    type Query {
        obtenerCurso: String
    }

`;

module.exports = typeDefs;