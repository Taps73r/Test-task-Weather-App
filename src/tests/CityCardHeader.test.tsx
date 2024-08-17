import { render, screen, fireEvent } from "@testing-library/react";
import { CityCardHeader } from "../components/CityCard/CityCardHeader";
import { Card } from "@nextui-org/react";

describe("CityCardHeader", () => {
    const handleDeleteCard = jest.fn();
    const handleUpdateCard = jest.fn();

    const props = {
        handleDeleteCard,
        handleUpdateCard,
    };

    test("renders delete button", () => {
        render(
            <Card>
                <CityCardHeader {...props} />
            </Card>
        );
        const deleteButton = screen.getByTitle(/Delete card/i);
        expect(deleteButton).toBeInTheDocument();
    });

    test("renders update button", () => {
        render(
            <Card>
                <CityCardHeader {...props} />
            </Card>
        );
        const updateButton = screen.getByTitle(/Update card/i);
        expect(updateButton).toBeInTheDocument();
    });

    test("calls handleDeleteCard on delete button click", () => {
        render(
            <Card>
                <CityCardHeader {...props} />
            </Card>
        );
        const deleteButton = screen.getByTitle(/Delete card/i);
        fireEvent.click(deleteButton);
        expect(handleDeleteCard).toHaveBeenCalledTimes(1);
    });

    test("calls handleUpdateCard on update button click", () => {
        render(
            <Card>
                <CityCardHeader {...props} />
            </Card>
        );
        const updateButton = screen.getByTitle(/Update card/i);
        fireEvent.click(updateButton);
        expect(handleUpdateCard).toHaveBeenCalledTimes(1);
    });
});
