
import axios from 'axios';
import type { SearchType, Weather } from '../types';

// TYPE GUARD O ASSERTION
function isWeatherResponse(weatherResult : unknown): weatherResult is Weather {
    return(
        Boolean(weatherResult) &&
        typeof weatherResult === 'object' &&
        typeof (weatherResult as Weather).name === 'string' &&
        typeof (weatherResult as Weather).main.temp === 'number' &&
        typeof (weatherResult as Weather).main.temp_max === 'number' &&
        typeof (weatherResult as Weather).main.temp_min === 'number' 
    )
}

export default function useWeather() {
 
    const fetchWeather = async(search: SearchType) => {
        
        const appId = import.meta.env.VITE_API_KEY
        try {
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;

           //console.log(geoUrl);

           const {data} = await axios.get(geoUrl);
           console.log(data)

           const lat = data[0].lat
           const lon = data[0].lon

           console.log(lat)
           console.log(lon)

           const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

        // Castear el type
        //    const {data: weatherResult} = await axios<Weather>(weatherUrl);
        //    console.log(weatherResult.name);
        //    console.log(weatherResult.main.temp);

        // Type Guards
        const {data: weatherResult} = await axios(weatherUrl);

        const result = isWeatherResponse(weatherResult)
        if(result){
            console.log(weatherResult.name)
        } else {
            console.log('Respuesta mal formada')
        }
        
     

        } catch (error) {
            console.log(error)
        }
    }

    return {
        fetchWeather
    }
}


