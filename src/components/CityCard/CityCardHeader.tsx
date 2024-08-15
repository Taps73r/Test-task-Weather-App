import { Button, CardHeader } from "@nextui-org/react";
import { DeleteIcon } from "../DeleteIcon";
import { RefreshIcon } from "../RefreshIcon";

interface ICityCardHeaderProps {
    handleDeleteCard: (e: React.MouseEvent) => void;
    handleUpdateCard: (e: React.MouseEvent) => void;
}

export function CityCardHeader(props: ICityCardHeaderProps) {
    return (
        <CardHeader className="w-full flex flex-row justify-between">
            <Button
                title="Delete card"
                className="p-2"
                isIconOnly
                color="danger"
                aria-label="Delete"
                onClick={props.handleDeleteCard}
            >
                <DeleteIcon />
            </Button>
            <Button
                title="Update card"
                className="p-2"
                isIconOnly
                color="primary"
                aria-label="Update"
                onClick={props.handleUpdateCard}
            >
                <RefreshIcon />
            </Button>
        </CardHeader>
    );
}
