import axios from "axios";

export const fetchCityCoordinates = async (
    cityName: string,
    apiKey: string
) => {
    const response = await axios.get(`${import.meta.env.VITE_GEO_API}`, {
        params: {
            q: cityName,
            limit: 1,
            appid: apiKey,
        },
    });
    const { lat, lon } = response.data[0];
    return { lat, lon };
};
