import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AddCityModal } from "../components/AddCityModal";
import { CityCardsList } from "../components/CityCardsList";
import { fetchWeather } from "../store/thunk/fetchWeather";
import { AppDispatch } from "../store/store";

export function WeatherDashboard() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const storedCities = JSON.parse(localStorage.getItem("cities") || "[]");
        storedCities.forEach((cityName: string) => {
            dispatch(fetchWeather(cityName));
        });
    }, [dispatch]);

    return (
        <>
            <AddCityModal />
            <CityCardsList />
        </>
    );
}
