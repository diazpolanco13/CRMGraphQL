const Usuario = require('../models/Usuarios');
const Producto = require('../models/Productos');
const Productos = require('../models/Productos');
const Cliente = require('../models/Clientes');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findByIdAndRemove } = require('../models/Usuarios');

require('dotenv').config({ path: 'variables.env' });



const crearToken = (usuario, palabraSecreta, expiresIn ) => {
    console.log(usuario);
    const { id, email, nombre, apellido } = usuario;

    return jwt.sign( { id, email, nombre, apellido }, palabraSecreta, { expiresIn } )
}



//?<------------------ RESOLVERS-------------------------->*//
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
        },
     // Obtener clientes de la BD--------------->*// 
        obtenerClientes: async () => {
            try {
                const clientes = await Cliente.find({}); //buscar todos los clientes en la BD

                return clientes;
            } catch (error) {
                console.log(error)
            }
        },
    // Obtener clientes registrados por vendedor especifico--------------->*// 
        obtenerClientesVendedor: async (_, {}, ctx ) => {
            try {
               
                const clientes = await Cliente.find( { vendedor: ctx.usuario.id.toString() } ); //buscar todos los clientes en la BD en base al id del vendedor

                return clientes;
            } catch (error) {
                console.log(error)
            }
        },
    // Obtener cliente registrado por vendedor especifico--------------->*// 
        obtenerCliente: async (_, { id }, ctx) => {
            //Revisar si el cliente existe en la BD
            const cliente = await Cliente.findById(id);
            
            if(!cliente) {
                throw new Error('El cliente no existe en el sistema')
            }

            //Solo quien creo al cliente puede verlo
            if (cliente.vendedor.toString() !== ctx.usuario.id) {
                throw new Error('No tienes permiso para ver este usuario')
            }

            return cliente;
        }
    },

//*<------------ MUTATIONS--------------->*//
    Mutation: {
//? ---------------- Mutation  USUARIOS--------------->*//
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

    //? --------------- Mutation  PRODUCTOS --------------->*//
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
        },
    //? ---------------- Mutation  CLIENTES --------------->*//
        nuevoCliente: async (_, { input }, ctx) => {
            //ctx = contex; el context contiene los datos del usuario que inicio sesion, ver el index

            const { email, documentoIndentidad, telefono } = input;
            
            //verifricar si el cliente esta en la BD a traves de algunos datos
            const clienteE = await Cliente.findOne({ email });
            const clienteD = await Cliente.findOne({ documentoIndentidad });
            const clienteT = await Cliente.findOne({ telefono });
            
            //Activamos posibles errores
            if (clienteE) {
                throw new Error('Ya existe un cliente registrado con este correo');
            } else if (clienteD) {
                throw new Error('Ya existe un cliente registrado con este documento de identidad');
            } else if (clienteT) {
                throw new Error('Ya existe un cliente registrado con este telefono');
            };

            //Intanciamos la contante nuevo cliente con la estructura del modelo de la BD
            const nuevoCliente = new Cliente(input);
            
            // asignamos el ID del usuario(vendedor) a la propiedad vendedor del cliente que se esta registrando
            nuevoCliente.vendedor = ctx.usuario.id;
            
            //Guardardamos el nuevo cliente en la BD
            try {  
                const clienteGuardado = await nuevoCliente.save();

                return clienteGuardado; 
            } catch (error) {
                console.log(error);
            };
        },
        actualizarCliente: async (_, {id,  input }, ctx) => {

            //Revisar si el cliente existe o no
            let cliente = await Cliente.findById(id);
            
            if(!cliente) {
                throw new Error('Este cliente no existe en el sistema')
            }

            //Solo quien creo al cliente puede editarlo
            if (cliente.vendedor.toString() !== ctx.usuario.id) {
                throw new Error('No tienes permiso para editar a este cliente')
            }

            //gardarlo en la Base de datos
            try {
                cliente = await Cliente.findOneAndUpdate({ _id : id }, input, { new: true });
                return cliente;
                
            } catch (error) {
                console.log(error)
            }
        },
        eliminarCliente: async (_, { id }, ctx) => {
            //verificar si el cliente existe
            let cliente = await Cliente.findById(id);

            if (!cliente) {
                 throw new Error('El cliente no existe')
            }

            //Solo el usuario que lo creo puede eliminarlo
            if (cliente.vendedor.toString() !== ctx.usuario.id) {
                throw new Error('No tienes los permisos para eliminar a este cliente');
            }

            //Eliminar el clienet
            try {
                
                cliente = await Cliente.findByIdAndRemove({ _id: id })
                
                return "Cliente eliminado"
            } catch (error) {
                console.log(error)
            }


        }
        
    }
};

module.exports = resolvers;