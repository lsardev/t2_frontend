// src/api/weatherAPI.js
const axios = require('axios');

const apiKey = 'ef0b0973b783e0614ac87612ec04344b';
const geocodingApiUrl = 'http://api.openweathermap.org/geo/1.0/direct';
const weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather';

async function getCityCoordinates(cityName) {
    try {
        const response = await axios.get(`${geocodingApiUrl}?q=${cityName}&appid=${apiKey}`);
        //console.log(response.data); // Adicione este log para ver o que a API retorna
        if (Array.isArray(response.data) && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            return { lat, lon };
        } else {
            throw new Error(`Não foram encontradas coordenadas para a cidade: ${cityName}`);
        }
    } catch (error) {
        console.error(`Erro ao buscar coordenadas: ${error.message}`);
        throw error;
    }
}


async function getWeatherConditions(lat, lon) {
    try {
        const response = await axios.get(`${weatherApiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt`);
        
        if (response.data && response.data.main && response.data.weather && response.data.weather.length > 0) {
            const feels_like = response.data.main.feels_like;
            const description = response.data.weather[0].description; // Descrição em português
            return { feels_like, description };
        } else {
            throw new Error('Dados climáticos não encontrados');
        }
    } catch (error) {
        console.error(`Erro ao buscar condições climáticas: ${error.message}`);
        throw error;
    }
}




module.exports = { getCityCoordinates, getWeatherConditions };
