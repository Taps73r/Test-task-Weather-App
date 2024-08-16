import { combineReducers } from "@reduxjs/toolkit";
import citiesWeatherReducer from "./slices/citiesWeatherSlice";
import cityHourlyWeatherReducer from "./slices/cityHourlyWeatherSlice";

const rootReducer = combineReducers({
    citiesWeatherReducer,
    cityHourlyWeatherReducer,
});

export default rootReducer;
