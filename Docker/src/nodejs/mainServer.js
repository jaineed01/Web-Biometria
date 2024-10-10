const express = require('express');
const mysql = require('mysql2');
const path = require('path');

// Crear una aplicación Express
const app = express();
const port = 8080;

// Configurar la conexión a la base de datos MariaDB
const db = mysql.createConnection({
    host: 'marieta', // Nombre del servicio del contenedor MariaDB
    user: 'root',
    password: '1234', // La misma contraseña que definiste en docker-compose.yml
    database: 'PROBANDOKV'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos MariaDB');
    }
});

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para obtener los datos de la tabla key_value
app.get('/api/values', (req, res) => {
    const query = 'SELECT * FROM key_value WHERE `key` IN ("ozono", "temperatura")';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error ejecutando la consulta:', err);
            res.status(500).send('Error en el servidor');
        } else {
            const responseData = {};
            results.forEach(item => {
                responseData[item.key] = item.value;
            });
            console.log('Datos enviados al cliente:', responseData)
            res.json(responseData); // Envía el objeto como respuesta
        }
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Node.js escuchando en el puerto ${port}`);
});