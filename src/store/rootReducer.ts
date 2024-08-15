import { combineReducers } from "@reduxjs/toolkit";
import citiesWeatherReducer from "./slices/citiesWeatherSlice";

const rootReducer = combineReducers({
    citiesWeatherReducer,
});

export default rootReducer;
