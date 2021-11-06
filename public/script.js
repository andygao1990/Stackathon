const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)
searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]
    if (place == null) return
    const latitude = place.geometry.location.lat()
    const longitude = place.geometry.location.lng()
    console.log(place.name)
    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
    }).then(res => res.json()).then(data => {
        console.log(data)
        setWeatherData(data, place)
    })
 })

const iconElement = document.querySelector('[data-icon]')
const locationElement = document.querySelector('[data-location]') 
const statusElement = document.querySelector('[data-status]') 
const temperatureElement = document.querySelector('[data-temperature]') 
const humidityElement = document.querySelector('[data-humidity]') 
const windElement = document.querySelector('[data-wind]')
const forecastElement1 = document.querySelector('[data-forecast-1]')
const forecastElement2 = document.querySelector('[data-forecast-2]')
const forecastElement3 = document.querySelector('[data-forecast-3]')
const forecastElement4 = document.querySelector('[data-forecast-4]')
const forecastElement5 = document.querySelector('[data-forecast-5]')
const forecastElement6 = document.querySelector('[data-forecast-6]')
const forecastElement7 = document.querySelector('[data-forecast-7]')


const setWeatherData = (data, place) => {
    iconElement.src = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`
    locationElement.textContent = place.formatted_address
    statusElement.textContent = data.current.weather[0].description
    temperatureElement.textContent  = `${data.current.temp} °F`
    humidityElement.textContent = `${data.current.humidity}%`
    windElement.textContent = `${data.current.wind_speed} mph`
    forecastElement1.innerHTML = `<div>${window.moment(data.daily[1].dt*1000).format('ddd')}</div><div>${data.daily[1].temp.min} °F</div><div>${data.daily[1].temp.max} °F</div><div>${data.daily[1].weather[0].description}</div>`
    forecastElement2.innerHTML = `<div>${window.moment(data.daily[2].dt*1000).format('ddd')}</div><div>${data.daily[2].temp.min} °F</div><div>${data.daily[2].temp.max} °F</div><div>${data.daily[2].weather[0].description}</div>`
    forecastElement3.innerHTML = `<div>${window.moment(data.daily[3].dt*1000).format('ddd')}</div><div>${data.daily[3].temp.min} °F</div><div>${data.daily[3].temp.max} °F</div><div>${data.daily[3].weather[0].description}</div>`
    forecastElement4.innerHTML = `<div>${window.moment(data.daily[4].dt*1000).format('ddd')}</div><div>${data.daily[4].temp.min} °F</div><div>${data.daily[4].temp.max} °F</div><div>${data.daily[4].weather[0].description}</div>`
    forecastElement5.innerHTML = `<div>${window.moment(data.daily[5].dt*1000).format('ddd')}</div><div>${data.daily[5].temp.min} °F</div><div>${data.daily[5].temp.max} °F</div><div>${data.daily[5].weather[0].description}</div>`
    forecastElement6.innerHTML = `<div>${window.moment(data.daily[6].dt*1000).format('ddd')}</div><div>${data.daily[6].temp.min} °F</div><div>${data.daily[6].temp.max} °F</div><div>${data.daily[6].weather[0].description}</div>`
    forecastElement7.innerHTML = `<div>${window.moment(data.daily[7].dt*1000).format('ddd')}</div><div>${data.daily[7].temp.min} °F</div><div>${data.daily[7].temp.max} °F</div><div>${data.daily[7].weather[0].description}</div>`
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${place.name}')`
}