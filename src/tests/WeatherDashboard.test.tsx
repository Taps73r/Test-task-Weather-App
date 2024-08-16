import { render, screen } from "@testing-library/react";
import { WeatherDashboard } from "../pages/WeatherDashboard";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import citiesWeatherReducer from "../store/slices/citiesWeatherSlice";
import { weatherThunk } from "../store/thunk/weatherThunk";

jest.mock("../components/AddCityModal", () => ({
    AddCityModal: () => <div>AddCityModal Mock</div>,
}));

jest.mock("../components/CityCardsList", () => ({
    CityCardsList: () => <div>CityCardsList Mock</div>,
}));

jest.mock("../store/thunk/weatherThunk", () => ({
    weatherThunk: Object.assign(jest.fn(), {
        pending: { type: "weather/weatherThunk/pending" },
        fulfilled: { type: "weather/weatherThunk/fulfilled" },
        rejected: { type: "weather/weatherThunk/rejected" },
    }),
}));

const mockStore = configureStore({
    reducer: {
        weather: citiesWeatherReducer,
    },
});

describe("WeatherDashboard Component", () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    it("renders AddCityModal and CityCardsList", () => {
        render(
            <Provider store={mockStore}>
                <WeatherDashboard />
            </Provider>
        );

        expect(screen.getByText("AddCityModal Mock")).toBeInTheDocument();
        expect(screen.getByText("CityCardsList Mock")).toBeInTheDocument();
    });

    it("dispatches weatherThunk for each city in localStorage", () => {
        const cities = ["London", "Paris", "New York"];
        localStorage.setItem("cities", JSON.stringify(cities));

        render(
            <Provider store={mockStore}>
                <WeatherDashboard />
            </Provider>
        );

        expect(weatherThunk).toHaveBeenCalledTimes(cities.length);
        cities.forEach((city) =>
            expect(weatherThunk).toHaveBeenCalledWith(city)
        );
    });
});
