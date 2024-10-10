// Importamos los módulos necesarios
const express = require('express');
const bodyParser = require('body-parser');
const mariadb = require('mariadb');

// Creamos el pool de conexiones a la base de datos MariaDB
const pool = mariadb.createPool({
    host: 'localhost',  // Cambia esto si tu base de datos está en otro servidor
    user: 'root',       // Usuario de la base de datos
    password: 'password', // Contraseña de la base de datos
    database: 'PROBANDOKV', // Nombre de la base de datos
    connectionLimit: 5   // Límite de conexiones simultáneas
});

// Creamos una instancia de la aplicación Express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta que recibe las mediciones desde la app
app.post('/guardar-medicion', async (req, res) => {
    // Extraemos los datos enviados desde la app Android
    const { ozono, temperatura } = req.body;

    // Log para depurar
    console.log("Recibido ozono:", ozono);
    console.log("Recibido temperatura:", temperatura);

    if (!ozono || !temperatura) {
        return res.status(400).json({ message: 'Faltan datos: ozono y temperatura son requeridos' });
    }

    try {
        // Conectamos a la base de datos
        const connection = await pool.getConnection();

        // Insertamos los datos en la tabla key_value
        await connection.query("INSERT INTO key_value (`key`, `value`) VALUES ('ozono', ?), ('temperatura', ?)", [ozono, temperatura]);

        // Cerramos la conexión
        connection.release();

        // Respondemos con éxito a la app Android
        res.status(200).json({ message: 'Datos guardados correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al guardar los datos' });
    }
});


// Iniciar el servidor en el puerto 8080
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
