import { render, screen } from "@testing-library/react";
import { App } from "../App";

jest.mock("../pages/WeatherDashboard", () => ({
    WeatherDashboard: () => <div>WeatherDashboard Mock</div>,
}));

jest.mock("../pages/CityWeatherDetails", () => ({
    CityWeatherDetails: () => <div>CityWeatherDetails Mock</div>,
}));

describe("App Component", () => {
    it("renders WeatherDashboard on default route", () => {
        render(<App />);

        expect(screen.getByText("WeatherDashboard Mock")).toBeInTheDocument();
    });

    it("renders CityWeatherDetails on /city/:cityName route", () => {
        window.history.pushState({}, "Test Page", "/city/London");

        render(<App />);

        expect(screen.getByText("CityWeatherDetails Mock")).toBeInTheDocument();
    });

    it("renders WeatherDashboard on /Abrara route", () => {
        window.history.pushState({}, "Test Page", "/Abrara");

        render(<App />);

        expect(screen.getByText("WeatherDashboard Mock")).toBeInTheDocument();
    });
});
