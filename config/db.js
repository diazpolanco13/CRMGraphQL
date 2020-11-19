const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

//?<----------------- CONEXION A BASE DE DATOS ------------------->*//
const conectarDB = async () => {
    
    try {
        //* Metodo de conexion a BD
        await mongoose.connect(process.env.DB_MONGO, {
            //Evita errores de version en mongoose 
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('DB conectada');
        
    } catch (error) {
        console.log('Hubo un error', error);
        process.exit(1) //! Detener la aplicacion
    };

};

module.exports = conectarDB;