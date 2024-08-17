import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const weatherThunk = createAsyncThunk(
    "weather/weatherThunk",
    async (cityName: string, { rejectWithValue }) => {
        try {
            const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

            if (!apiKey) {
                throw new Error("API key is missing");
            }

            const response = await axios.get(
                `${import.meta.env.VITE_WEATHER_API}/weather`,
                {
                    params: {
                        q: cityName,
                        appid: apiKey,
                        units: "metric",
                    },
                }
            );
            return { cityName, weather: response.data };
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
