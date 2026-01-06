
import axios from 'axios';
import type { SearchType } from '../types';
import { z } from 'zod';

// TYPE GUARD O ASSERTION
// function isWeatherResponse(weatherResult : unknown): weatherResult is Weather {
//     return(
//         Boolean(weatherResult) &&
//         typeof weatherResult === 'object' &&
//         typeof (weatherResult as Weather).name === 'string' &&
//         typeof (weatherResult as Weather).main.temp === 'number' &&
//         typeof (weatherResult as Weather).main.temp_max === 'number' &&
//         typeof (weatherResult as Weather).main.temp_min === 'number' 
//     )
// }

    // Zod
    // schema
const Weather = z.object({
    name : z.string(),
    main: z.object({
            temp: z.number(),
            temp_max: z.number(),
            temp_min: z.number(),
            })
})
type Weather = z.infer<typeof Weather>

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
        // const {data: weatherResult} = await axios(weatherUrl);

        // const result = isWeatherResponse(weatherResult)
        // if(result){
        //     console.log(weatherResult.name)
        // } else {
        //     console.log('Respuesta mal formada')
        // }
        
        // Zod
        const {data: weatherResult} = await axios( weatherUrl);
        const result = Weather.safeParse(weatherResult);
        if(result.success){
            console.log(result.data.name)
            console.log(result.data.main.temp)
        }
       


        } catch (error) {
            console.log(error)
        }
    }

    return {
        fetchWeather
    }
}


