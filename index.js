const { ApolloServer } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');


//?<-------- SERVER ------------------->*//
const server = new ApolloServer({
    typeDefs,
    resolvers    
});


//? Start Server ------->
server.listen().then(({url}) => {
    console.log(`Server listen in the URL ${url}`)
});