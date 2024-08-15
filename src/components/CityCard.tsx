import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { DeleteIcon } from "./DeleteIcon";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { removeCity } from "../store/slices/citiesWeatherSlice";
import { RefreshIcon } from "./RefreshIcon";

interface ICityCardProps {
    maxTemp: number;
    conditionIcon: string;
    conditionText: string;
    windSpeed: number;
    clouds: number;
    city: string;
    humidity: number;
    country: string;
}

export function CityCard(props: ICityCardProps) {
    const dispatch = useDispatch<AppDispatch>();

    const backgroundStyle = {
        background: "linear-gradient(150deg, #6CCDB0 0%, #1E3A8A 100%)",
    };

    const handleDeleteCard = () => {
        dispatch(removeCity(props.city));
        //Add delete from locale storage
    };

    const handleUpdateCard = () => {
        //Add Refetch Weather for this city;
    };

    return (
        <article className="flex flex-col items-center">
            <Card
                className="w-[320px] p-2 text-white"
                style={{
                    ...backgroundStyle,
                }}
            >
                <CardHeader className="w-full flex flex-row justify-between">
                    <Button
                        title="Delete card"
                        className="p-2 "
                        isIconOnly
                        color="danger"
                        aria-label="Delete"
                        onPress={handleDeleteCard}
                    >
                        <DeleteIcon />
                    </Button>
                    <Button
                        title="Update card"
                        className="p-2 "
                        isIconOnly
                        color="primary"
                        aria-label="Update"
                        onPress={handleUpdateCard}
                    >
                        <RefreshIcon />
                    </Button>
                </CardHeader>
                <CardBody className="flex flex-col items-center">
                    <div className="flex flex-row justify-center pb-3 w-full items-center font-medium">
                        <p className="text-2xl font-bold">
                            {props.conditionText}
                        </p>
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
            </Card>
        </article>
    );
}
