import { CardBody } from "@nextui-org/react";

interface ICityCardBodyProps {
    maxTemp: number;
    conditionIcon: string;
    conditionText: string;
    windSpeed: number;
    clouds: number;
    city: string;
    humidity: number;
    country: string;
}

export function CityCardBody(props: ICityCardBodyProps) {
    return (
        <CardBody className="flex flex-col items-center">
            <div className="flex flex-row justify-center pb-3 w-full items-center font-medium">
                <p className="text-2xl font-bold">{props.conditionText}</p>
            </div>
            <p className="text-3xl pb-3 font-bold">{props.maxTemp}°C</p>
            <img
                className="pb-1 w-[80px] h-[80px]"
                src={`https://openweathermap.org/img/wn/${props.conditionIcon}@2x.png`}
                alt={props.conditionText}
            />
            <div className="flex flex-row pb-6 justify-center w-full gap-1 items-center font-normal text-xl">
                <p>{`${props.city}, `}</p>
                <p>{props.country}</p>
            </div>
            <div className="flex flex-col pb-2 text-md items-center w-full">
                <p className="text-xl">{props.windSpeed}m/s</p>
                <p className="text-base">Wind Speed</p>
            </div>
            <div className="flex flex-row justify-around w-full items-center font-medium">
                <div className="flex flex-col items-center">
                    <p className="text-xl">{props.clouds}%</p>
                    <p className="text-base">Clouds</p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-xl">{props.humidity}%</p>
                    <p className="text-base">Humidity</p>
                </div>
            </div>
        </CardBody>
    );
}
