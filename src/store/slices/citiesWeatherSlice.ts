import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICityWeather } from "../../types/CityWeather";
import { weatherThunk } from "../thunk/weatherThunk";

interface IWeatherState {
    cities: ICityWeather[];
    loading: boolean;
    error: string | null;
}

const initialState: IWeatherState = {
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
            localStorage.setItem("cities", JSON.stringify(state.cities));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(weatherThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(weatherThunk.fulfilled, (state, action) => {
                state.loading = false;
                const existingCityIndex = state.cities.findIndex(
                    (city) => city.cityName === action.payload.cityName
                );
                if (existingCityIndex >= 0) {
                    state.cities[existingCityIndex] = action.payload;
                } else {
                    state.cities = [action.payload, ...state.cities];
                    localStorage.setItem(
                        "cities",
                        JSON.stringify(
                            state.cities.map((city) => city.cityName)
                        )
                    );
                }
            })
            .addCase(weatherThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { removeCity } = weatherSlice.actions;

export default weatherSlice.reducer;
