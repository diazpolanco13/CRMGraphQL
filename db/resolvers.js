const Usuario = require('../models/Usuarios')
const bcrypt = require('bcryptjs')


//?<------- RESOLVERS-------------------------->*//
const resolvers = {
    
    Query: {
        obtenerCurso: () => "algo"
    },
    Mutation: {
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
        }
    }
};

module.exports = resolvers;