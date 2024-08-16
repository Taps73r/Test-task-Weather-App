import { Card } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { removeCity } from "../../store/slices/citiesWeatherSlice";
import { weatherThunk } from "../../store/thunk/weatherThunk";
import { useNavigate } from "react-router-dom";
import { CityCardBody } from "./CityCardBody";
import { CityCardHeader } from "./CityCardHeader";

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
    const navigate = useNavigate();

    const handleDeleteCard = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(removeCity(props.city));
    };

    const handleUpdateCard = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(weatherThunk(props.city));
    };

    const handleCardClick = () => {
        navigate(`/city/${props.city}`);
    };

    return (
        <article
            className="flex flex-col items-center cursor-pointer"
            onClick={handleCardClick}
        >
            <Card
                className="w-[320px] p-2 text-white backgroundColor"
                onClick={(e) => e.stopPropagation()}
            >
                <CityCardHeader
                    handleDeleteCard={handleDeleteCard}
                    handleUpdateCard={handleUpdateCard}
                />
                <CityCardBody {...props} />
            </Card>
        </article>
    );
}
