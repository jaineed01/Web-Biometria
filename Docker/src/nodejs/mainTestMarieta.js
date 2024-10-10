const mysql = require('mysql2');

// Configurar la conexión a la base de datos
const db = mysql.createConnection({
  host: 'marieta', // Nombre del contenedor MariaDB desde Docker Compose
  user: 'root',
  password: '1234', // Contraseña definida en docker-compose.yml
  database: 'PROBANDOKV'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);
  } else {
    console.log('Conexión exitosa a la base de datos MariaDB');

    // Ejecutar una consulta para obtener todos los datos de la tabla key_value
    const query = 'SELECT * FROM key_value';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error ejecutando la consulta:', err);
      } else {
        console.log('Datos obtenidos de la tabla key_value:');
        console.log(results);
      }

      // Cerrar la conexión
      db.end();
    });
  }
});
