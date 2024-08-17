import axios from "axios";

export const fetchHourlyWeather = async (
    lat: number,
    lon: number,
    apiKey: string
) => {
    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast`,
        {
            params: {
                lat,
                lon,
                appid: apiKey,
                cnt: 7,
                units: "metric",
            },
        }
    );
    return response.data;
};
