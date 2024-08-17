interface IWeatherHeaderProps {
    cityName: string;
    date: string;
    temperature: number;
    conditionText?: string;
    conditionIcon?: string;
}

export function WeatherHeader({
    cityName,
    date,
    temperature,
    conditionIcon,
    conditionText,
}: IWeatherHeaderProps) {
    return (
        <div className="flex justify-between m-8 text-white">
            <div>
                <h1 className="text-4xl pb-2 font-bold">{cityName}</h1>
                <p>{date}</p>
                <div className="mt-2 flex flex-row items-center">
                    {conditionText && (
                        <p className="text-4xl font-bold">
                            Weather: {conditionText}
                        </p>
                    )}
                    {conditionIcon && (
                        <img
                            className="w-[80px] h-[80px]"
                            src={`https://openweathermap.org/img/wn/${conditionIcon}@2x.png`}
                            alt={conditionText}
                        />
                    )}
                </div>
            </div>
            <div>
                <h2 className="text-4xl">{temperature}°C</h2>
            </div>
        </div>
    );
}
