import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeather = createAsyncThunk(
    "weather/fetchWeather",
    async (cityName: string, { rejectWithValue }) => {
        try {
            const apiKey = "7d3516e9a9e9546a12828d223956c0f8";

            if (!apiKey) {
                throw new Error("API key is missing");
            }

            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather`,
                {
                    params: {
                        q: cityName,
                        appid: apiKey,
                        units: "metric",
                    },
                }
            );
            console.log(response.data);
            return { cityName, weather: response.data };
        } catch (error) {
            console.error(error);
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
