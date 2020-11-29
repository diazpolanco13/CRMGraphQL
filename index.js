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
        
        // console.log('Headers',req.headers);

        //Se obtiene del headers el token del usuario 
        const token = req.headers['authorization'] || '';
        if (token) {
            try {
                //Si el token existe, desencriptar el token y guardarlo en la constante usuario, tambien se elimina la palabra Bearar que viene en el token del frontend
                const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.PALABRASECRETA);
                
                // console.log('Los datos con token', usuario);
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