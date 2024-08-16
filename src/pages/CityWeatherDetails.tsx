import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { hourlyWeatherThunk } from "../store/thunk/hourlyWeatherThunk";
import { useParams } from "react-router-dom";
import { TemperatureChart } from "../components/TemperatureChart";
import { weatherThunk } from "../store/thunk/weatherThunk";
import { WeatherHeader } from "../components/WeatherHeader";
import { WeatherDetails } from "../components/WeatherDetails";

export function CityWeatherDetails() {
    const { cityName } = useParams();

    const cityData = useSelector((state: RootState) =>
        state.citiesWeatherReducer.cities.find(
            (city) => city.cityName === cityName
        )
    );

    const { data, error } = useSelector(
        (state: RootState) => state.cityHourlyWeatherReducer
    );

    const dispatch = useDispatch<AppDispatch>();

    const temperatureData = data?.list.map((item) => {
        const hour = item.dt_txt.split(" ")[1].substring(0, 5);
        return {
            temperature: Math.floor(item.main.temp),
            hour,
        };
    });

    useEffect(() => {
        if (cityName && cityName === cityData?.cityName) {
            dispatch(hourlyWeatherThunk(cityName));
            dispatch(weatherThunk(cityName));
        }
    }, [dispatch, cityName, cityData?.cityName]);

    return (
        <>
            <WeatherHeader
                cityName={cityName || ""}
                date={new Date().toLocaleDateString()}
                temperature={cityData?.weather.main.temp || 0}
                conditionText={cityData?.weather.weather[0].main}
                conditionIcon={cityData?.weather.weather[0].icon}
            />
            <WeatherDetails
                clouds={cityData?.weather.clouds.all || 0}
                humidity={cityData?.weather.main.humidity || 0}
                pressure={cityData?.weather.main.pressure || 0}
                windSpeed={cityData?.weather.wind.speed || 0}
            />
            <TemperatureChart temperatureData={temperatureData} />
        </>
    );
}
