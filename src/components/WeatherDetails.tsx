interface IWeatherDetailsProps {
    humidity: number;
    pressure: number;
    windSpeed: number;
    clouds: number;
}

export function WeatherDetails({
    humidity,
    pressure,
    windSpeed,
    clouds,
}: IWeatherDetailsProps) {
    return (
        <div className="mx-8 flex flex-row justify-center gap-8 sm:justify-around flex-wrap">
            <div className="detail-item">
                <p className="text-lg">Humidity</p>
                <p className="text-2xl">{humidity}%</p>
            </div>
            <div className="detail-item">
                <p className="text-lg">Pressure</p>
                <p className="text-2xl">{pressure} hPa</p>
            </div>
            <div className="detail-item">
                <p className="text-lg">Wind Speed</p>
                <p className="text-2xl">{windSpeed} m/s</p>
            </div>
            <div className="detail-item">
                <p className="text-base">Clouds</p>
                <p className="text-xl">{clouds}%</p>
            </div>
        </div>
    );
}
