const Usuario = require('../models/Usuarios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

const crearToken = (usuario, palabraSecreta, expiresIn ) => {
    console.log(usuario);
    const { id, email, nombre, apellido } = usuario;

    return jwt.sign( { id, email, nombre, apellido }, palabraSecreta, { expiresIn } )
}



//?<------------------------- RESOLVERS-------------------------->*//
const resolvers = {
    
    Query: {
        obtenerCurso: () => "algo"
    },
    Mutation: {
        //?<------------ Mutation para crear usuario--------------->*//
        nuevoUsuario: async (_, { input }) => {

            const { email, password } = input;
            // Revisar si el usuario ya esta registrado
            const existeUsuario = await Usuario.findOne({ email });
            
            if (existeUsuario) {
                throw new Error('El usuario ya esta registrado');
            }

            //Ocultar password
            try {
                const salt = await bcrypt.genSaltSync(10);
                input.password = await bcrypt.hash(password, salt);
            
            } catch (error) {
                console.log(error)
            }
            
            
            // Guardarlo en la base de datos
            try {
                const usuario = new Usuario(input);
                usuario.save(); // guardarlo en la BD
                
                return usuario;
                
            } catch (error) {
                console.log(error);
            }
        },
        //?<------------ Mutation para Autenticar usuario--------------->*//
        autenticarUsuario: async (_, { input }) => {
            const { email, password } = input

            //Verificar si el usuario existe
            const usuarioDB = await Usuario.findOne({ email });
            if (!usuarioDB) {
                throw new Error('El usuario no existe')
            }

            //Verificar si el password es correcto
            const passwordCorrecto = await bcrypt.compare(password, usuarioDB.password);

            if (!passwordCorrecto) {
                throw new Error('El password no es correcto');
            }

            //Hacer el Token
            return {
                token: crearToken(usuarioDB, process.env.PALABRASECRETA, '24h')
            }


        }
    }
};

module.exports = resolvers;