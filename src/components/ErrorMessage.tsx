import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

interface ErrorMessageProps {
    message: string;
    buttonText: string;
    buttonAction?: () => void;
}

export function ErrorMessage({
    message,
    buttonText,
    buttonAction,
}: ErrorMessageProps) {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        if (buttonAction) {
            buttonAction();
        } else {
            navigate("/");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen p-4">
            <p className="text-2xl font-semibold text-red-500 mb-4">
                {message}
            </p>
            <Button onClick={handleButtonClick} color="primary">
                {buttonText}
            </Button>
        </div>
    );
}
