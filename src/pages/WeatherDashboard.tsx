import { AddCityModal } from "../components/AddCityModal";
import { CityCardsList } from "../components/CityCardsList";

export function WeatherDashboard() {
    return (
        <>
            <AddCityModal />
            <CityCardsList />
        </>
    );
}
