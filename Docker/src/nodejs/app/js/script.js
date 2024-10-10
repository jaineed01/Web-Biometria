document.addEventListener('DOMContentLoaded', function() {
    // URL del servidor Docker marieta (cámbialo si es necesario)
    const API_URL = 'http://192.168.1.115:8080/api/values'; // Endpoint

    // Función para obtener los datos de ozono y temperatura del servidor
    function obtenerMediciones() {
        fetch(API_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la red');
                }
                return response.json();  // Convertir la respuesta a JSON
            })
            .then(data => {
                console.log(data); // Para depuración: ver los datos en la consola
                // Asumimos que los datos vienen en el formato { ozono: '10 ppm', temperatura: '22 °C' }
                document.getElementById('ozono-value').textContent = `${data.ozono} ppm`;
                document.getElementById('temperatura-value').textContent = `${data.temperatura} °C`;
            })
            .catch(error => {
                console.error('Error al obtener las mediciones:', error);
                document.getElementById('ozono-value').textContent = 'Error';
                document.getElementById('temperatura-value').textContent = 'Error';
            });
    }

    // Llamar a la función de obtener mediciones al cargar la página
    obtenerMediciones();

    // Si quieres que se actualicen cada cierto tiempo (e.g., cada 10 segundos)
    setInterval(obtenerMediciones, 10000);
});
