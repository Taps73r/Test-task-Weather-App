import { createSlice } from "@reduxjs/toolkit";
import { hourlyWeatherThunk } from "../thunk/hourlyWeatherThunk";
import { IHourlyWeatherResponse } from "../../types/HourlyWeather";
import { ICityWeather } from "../../types/CityWeather";

interface IHourlyWeatherState {
    data: IHourlyWeatherResponse | null;
    cityData: ICityWeather | null;
    loading: boolean;
    error: string | null;
}

const initialState: IHourlyWeatherState = {
    data: null,
    cityData: null,
    loading: false,
    error: null,
};

const hourlyWeatherSlice = createSlice({
    name: "hourlyWeather",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(hourlyWeatherThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(hourlyWeatherThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(hourlyWeatherThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default hourlyWeatherSlice.reducer;
