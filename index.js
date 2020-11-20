const { ApolloServer } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const jwt = require('jsonwebtoken')
const conectarDB = require('./config/db');
require('dotenv').config({ path: 'variables.env' });


//? Conectar a la base de datos -->
conectarDB();



//?<------------------ SERVER ------------------->*//
const server = new ApolloServer({
    typeDefs, //Schema
    resolvers,    // Resolver
    context: ({ req }) => {
        // console.log(req.headers['authorization'])
        
        //Se obtiene del headers el token del usuario 
        const token = req.headers['authorization'] || '';
        
        if (token) {
            try {
                //Si el token existe, desencriptar el token y guardarlo en la constante usuario
                const usuario = jwt.verify(token, process.env.PALABRASECRETA)
                
                // console.log(usuario);
                return {
                    usuario
                }
            } catch (error) {
                console.log('Hubo un error')
                console.log(error)
            }
        }
    }
});


//? Start Server ------->
server.listen().then(({url}) => {
    console.log(`Server listen in the URL ${url}`)
});