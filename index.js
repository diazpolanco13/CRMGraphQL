const { ApolloServer } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');

const conectarDB = require('./config/db');

//? Conectar a la base de datos -->
conectarDB();



//?<------------------ SERVER ------------------->*//
const server = new ApolloServer({
    typeDefs,
    resolvers    
});


//? Start Server ------->
server.listen().then(({url}) => {
    console.log(`Server listen in the URL ${url}`)
});