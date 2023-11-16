const { getCityCoordinates, getWeatherConditions } = require('./api/weatherAPI');

async function main() {
    try {
        const cityName = 'Limeira'; // Exemplo de cidade
        const coordinates = await getCityCoordinates(cityName);
        if (coordinates) {
            const { feels_like, description } = await getWeatherConditions(coordinates.lat, coordinates.lon);
            console.log(`Cidade: ${cityName}`);
            console.log(`Latitude: ${coordinates.lat}, Longitude: ${coordinates.lon}`);
            console.log(`Sensação Térmica: ${feels_like}°C`);
            console.log(`Descrição: ${description}`);
        } else {
            console.log(`Não foi possível encontrar a cidade: ${cityName}`);
        }
    } catch (error) {
        console.error(`Erro: ${error.message}`);
    }
}

main();
