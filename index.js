const { ApolloServer, gql } = require('apollo-server');




//?<------------------SERVIDOR----------------------->*//
const server = new ApolloServer();


//Arrancar el Servidor
server.listen().then(({url}) => {
    console.log(`Server list in the URL ${url}`)
});