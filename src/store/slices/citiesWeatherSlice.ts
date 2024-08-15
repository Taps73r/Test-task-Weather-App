import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICityWeather } from "../../types/CityWeather";
import { fetchWeather } from "../thunk/fetchWeather";

interface WeatherState {
    cities: ICityWeather[];
    loading: boolean;
    error: string | null;
}

const initialState: WeatherState = {
    cities: [],
    loading: false,
    error: null,
};

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        removeCity(state, action: PayloadAction<string>) {
            state.cities = state.cities.filter(
                (city) => city.cityName !== action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.loading = false;
                state.cities.push(action.payload);
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { removeCity } = weatherSlice.actions;

export default weatherSlice.reducer;
