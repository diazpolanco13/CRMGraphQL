const { gql } = require('apollo-server');


//?<------------------SCHEMA-------------------------->*//
const typeDefs = gql`

    type Course {
        title: String
    }

    type Technology {
        technology: String
    }

    type Query {
        getCourse : [Course]
        getTechnology: [Technology]
    }

`;

module.exports = typeDefs;