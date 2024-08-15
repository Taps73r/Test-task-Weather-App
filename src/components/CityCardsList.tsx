import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { CityCard } from "./CityCard";

export function CityCardsList() {
    const { cities, error } = useSelector(
        (state: RootState) => state.citiesWeatherReducer
    );

    return (
        <section>
            {cities?.map((item, index) => (
                <CityCard
                    country={item.weather.sys.country}
                    city={item.cityName}
                    key={index}
                    maxTemp={item.weather.main.temp_max}
                    conditionIcon={item.weather.weather[0].icon}
                    conditionText={item.weather.weather[0].main}
                    humidity={item.weather.main.humidity}
                    windSpeed={item.weather.wind.speed}
                    clouds={item.weather.clouds.all}
                />
            ))}
        </section>
    );
}
