const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)
searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]
    if (place == null) return
    const latitude = place.geometry.location.lat()
    const longitude = place.geometry.location.lng()
    console.log(place.name)
    fetch('/weather', {
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

const setWeatherData = (data, place) => {
    iconElement.src = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`
    locationElement.textContent = place.formatted_address
    statusElement.textContent = data.current.weather[0].description
    temperatureElement.textContent  = `${data.current.temp} °F`
    humidityElement.textContent = `${data.current.humidity}%`
    windElement.textContent = `${data.current.wind_speed} mph`
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${place.name}')`
}