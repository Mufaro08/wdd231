const firstParagraph = document.getElementById("myName");
const secondParagraph = document.getElementById("copyright");
const thirdParagraph = document.getElementById("lastModified");


const currentYear = new Date().getFullYear();
const lastModified = document.lastModified;


firstParagraph.textContent = `Mufaro Justice Tapera`;
secondParagraph.textContent = `© ${currentYear} Harare Chamber of Commerce. All rights reserved.`;
thirdParagraph.textContent = `Last Modified: ${lastModified}`;


const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
navMenu.classList.toggle('active');
});


const HARARE_LAT = -17.8248;
const HARARE_LON = 31.0530;


const API_KEY = '23bd5a286af8b011b2674afcb1bd4040';

const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${HARARE_LAT}&lon=${HARARE_LON}&appid=${API_KEY}&units=metric`;

const CURRENT_LOCATION = "Harare, ZW";


function getDayName(offset) {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    
    if (offset === 0) {
        return "Today";
    }
    
    const options = { weekday: 'short' };
    return date.toLocaleDateString('en-US', options);
}


function getWeatherEmoji(iconCode) {
    if (iconCode.includes('01')) return '☀️'; 
    if (iconCode.includes('02')) return '🌤️'; 
    if (iconCode.includes('03') || iconCode.includes('04')) return '☁️'; 
    if (iconCode.includes('09') || iconCode.includes('10')) return '🌧️'; 
    if (iconCode.includes('11')) return '🌩️';
    if (iconCode.includes('13')) return '❄️';
    if (iconCode.includes('50')) return '🌫️';
    return '🌎';
}


function loadEvents() {
    const eventsList = document.getElementById('events-list');
    eventsList.innerHTML = ''; 

   
    const events = [
        { title: "Annual Business Summit 2025", date: "Oct 15, 2025", location: "Rainbow Towers Hotel" },
        { title: "Harare Tech Startup Pitch Day", date: "Nov 03, 2025", location: "Chamber Conference Hall" },
        { title: "Export Opportunities Workshop", date: "Nov 28, 2025", location: "Online Webinar" },
    ];
    
    if (events.length === 0) {
        eventsList.innerHTML = '<p class="placeholder" role="status">No upcoming events scheduled right now. Check back soon!</p>';
        return;
    }

    events.forEach(event => {
        const eventItem = document.createElement('article');
        eventItem.className = 'event-item';
        
        eventItem.innerHTML = `
            <h3>${event.title}</h3>
            <p>🗓️ Date: ${event.date} | 📍 Location: ${event.location}</p>
        `;
        eventsList.appendChild(eventItem);
    });
}

function loadSpotlights() {
    const spotlightContainer = document.getElementById('spotlight-container');
    spotlightContainer.innerHTML = ''; 

    const spotlights = [
        { name: "Zim-Agri Solutions", industry: "Agricultural Tech", image: "https://tse1.explicit.bing.net/th/id/OIP.diskZIJSdmvuzcuQ9c6kDwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3" },
        { name: "Harare Impact Hub", industry: "IT & Software Development", image: "https://tse3.mm.bing.net/th/id/OIP.KY26zVokbiK_noTovcF9sgHaEy?rs=1&pid=ImgDetMain&o=7&rm=3" },
        { name: "Capital City Logistics", industry: "Freight & Transport", image: "https://th.bing.com/th/id/OIP.Sg7S301jxLwRY3QJCUEdYgHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" },
    ];

    spotlights.forEach(company => {
        const spotlightItem = document.createElement('a');
        spotlightItem.className = 'spotlight-item';
        spotlightItem.href = `#company-${company.name.replace(/\s/g, '')}`; 
        spotlightItem.setAttribute('aria-label', `Learn more about ${company.name}, a member in the ${company.industry} sector.`);

        spotlightItem.innerHTML = `
            <img src="${company.image}" alt="${company.name} Logo" class="company-logo" loading="lazy">
            <div class="company-details">
                <h3>${company.name}</h3>
                <p>${company.industry}</p>
            </div>
        `;
        spotlightContainer.appendChild(spotlightItem);
    });
}

async function loadWeather() {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = '<p class="placeholder" role="status">Fetching live weather data...</p>';

    try {
        const response = await fetch(FORECAST_URL);
        const data = await response.json();

        if (data.cod !== "200") {
             weatherInfo.innerHTML = `<p class="placeholder" role="alert">Error: Could not retrieve weather data (${data.message || 'Check API key/endpoint'}).</p>`;
             console.error("API Error:", data.message);
             return;
        }

        
        const dailyForecast = [];
        const forecastList = data.list;

        
        dailyForecast.push(forecastList[0]); 

        
        if (forecastList.length > 8) dailyForecast.push(forecastList[8]); 

        
        if (forecastList.length > 16) dailyForecast.push(forecastList[16]); 
        
        
        if (dailyForecast.length === 0) {
            weatherInfo.innerHTML = '<p class="placeholder" role="alert">No forecast data available.</p>';
            return;
        }

        const currentDayData = dailyForecast[0];

        
        let weatherHTML = `
            <div class="current-weather">
                <div class="weather-icon" aria-hidden="true">${getWeatherEmoji(currentDayData.weather[0].icon)}</div>
                <div class="temperature">${Math.round(currentDayData.main.temp)}°C</div>
                <div class="location">${CURRENT_LOCATION}</div>
                <div class="condition">${currentDayData.weather[0].description}</div>
            </div>
            <h3>3-Day Forecast</h3>
        `;
        
        
        weatherHTML += '<div class="forecast-container">';
        
        dailyForecast.slice(0, 3).forEach((dayData, index) => {
            const dayName = getDayName(index);
            const temp = Math.round(dayData.main.temp) + '°C';
            const condition = dayData.weather[0].description;
            const icon = getWeatherEmoji(dayData.weather[0].icon);

            weatherHTML += `
                <div class="forecast-day" aria-label="${dayName}: ${temp}, ${condition}">
                    <span class="day-label">${dayName}</span>
                    <span class="day-icon" aria-hidden="true">${icon}</span>
                    <span class="day-temp">${temp}</span>
                </div>
            `;
        });
        
        weatherHTML += '</div>'; 

        weatherInfo.innerHTML = weatherHTML;

    } catch (error) {
        weatherInfo.innerHTML = '<p class="placeholder" role="alert">Connection error. Check console for details.</p>';
        console.error("Weather API fetch failed:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    loadSpotlights();
    loadWeather(); 
});