const Usuario = require('../models/Usuarios');
const Producto = require('../models/Productos');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Productos = require('../models/Productos');
require('dotenv').config({ path: 'variables.env' });

const crearToken = (usuario, palabraSecreta, expiresIn ) => {
    console.log(usuario);
    const { id, email, nombre, apellido } = usuario;

    return jwt.sign( { id, email, nombre, apellido }, palabraSecreta, { expiresIn } )
}



//?<------------------------- RESOLVERS-------------------------->*//
const resolvers = {
//*<------------ QUERYS--------------->*//
    Query: {
        // Obtener ID de usuario leido del JWT--------------->*//
        obtenerUsuario: async (_, { token }) => {
            const usuarioId = jwt.verify(token, process.env.PALABRASECRETA);
            
            return usuarioId;
        },
        // Obtener Productos de la BD--------------->*//

        obtenerProductos: async () => {
            try {
                const productos = await Productos.find({});//Buscar todos los productos en al BD

                return productos; 
            } catch (error) {
                console.log(error)
            }
        },
        // Obtener un producto de la BD--------------->*//
        obtenerProducto: async (_, { id }) => {
            //Revisar si el producto existe o no
            const producto = await Producto.findById(id);

            if(!producto) {
                throw new Error('Producto no encontrado')
            }

            return producto;
        }

    },

//*<------------ MUTATIONS--------------->*//
    Mutation: {
        //? ---------- Mutation  USUARIOS--------------->*//
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
                
                const usuarioGuardado = await usuario.save(); // guardarlo en la BD
                
                return usuarioGuardado;
                
            } catch (error) {
                console.log(error);
            }
        },
        // Mutation para Autenticar usuario--------------->*//
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
        },

//? ---------- Mutation  PRODUCTOS --------------->*//
        nuevoProducto: async (_, {input}) => {
            try {
                const producto = new Producto(input);
                
                const productoGuardado = await producto.save(); //Guardar en BD
                
                return productoGuardado;
            
            } catch (error) {
                console.log(error)
            }
        },
        actualizarProducto: async (_, {id, input}) => {
             //Revisar si el producto existe o no
             let producto = await Producto.findById(id);

             if(!producto) {
                 throw new Error('Producto no encontrado')
            }
            
            //gardarlo en la Base de datos
            producto = await Producto.findOneAndUpdate({ _id: id }, input, { new: true });

            return producto;
        },
        eliminarProducto: async (_, { id }) => {
            let producto = await Producto.findById(id);

             if(!producto) {
                 throw new Error('Producto no encontrado')
            }

            //eliminar Producto de la BD
            producto = await Producto.findByIdAndRemove({ _id: id });

            return "Proucto Eliminado"
        }
    }
};

module.exports = resolvers;