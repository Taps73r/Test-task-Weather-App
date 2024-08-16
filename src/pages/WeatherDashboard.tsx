import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AddCityModal } from "../components/AddCityModal";
import { CityCardsList } from "../components/CityCardsList";
import { weatherThunk } from "../store/thunk/weatherThunk";
import { AppDispatch } from "../store/store";

export function WeatherDashboard() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const storedCities = JSON.parse(localStorage.getItem("cities") || "[]");
        storedCities.forEach((cityName: string) => {
            dispatch(weatherThunk(cityName));
        });
    }, [dispatch]);

    return (
        <>
            <AddCityModal />
            <CityCardsList />
        </>
    );
}
