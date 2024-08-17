import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchCityCoordinates } from "../../utils/fetchCityCoordinates";
import { fetchHourlyWeather } from "../../utils/fetchHourlyWeather";

export const hourlyWeatherThunk = createAsyncThunk(
    "weather/hourlyWeatherThunk",
    async (cityName: string, { rejectWithValue }) => {
        try {
            const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

            if (!apiKey) {
                throw new Error("API key is missing");
            }

            const { lat, lon } = await fetchCityCoordinates(cityName, apiKey);

            return await fetchHourlyWeather(lat, lon, apiKey);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage =
                    error.response?.data?.error?.message ||
                    "Failed to fetch weather data";
                return rejectWithValue(errorMessage);
            } else {
                return rejectWithValue("An unknown error occurred");
            }
        }
    }
);
