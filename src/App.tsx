import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { WeatherDashboard } from "./pages/WeatherDashboard";
import { CityWeatherDetails } from "./pages/CityWeatherDetails";

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<WeatherDashboard />} />
                <Route
                    path="/city/:cityName"
                    element={<CityWeatherDetails />}
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}
