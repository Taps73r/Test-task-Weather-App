import { render, screen, fireEvent } from "@testing-library/react";
import { ErrorMessage } from "../components/ErrorMessage";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe("ErrorMessage", () => {
    it("renders the message and button text", () => {
        render(
            <MemoryRouter>
                <ErrorMessage message="An error occurred" buttonText="Retry" />
            </MemoryRouter>
        );

        expect(screen.getByText("An error occurred")).toBeInTheDocument();
        expect(screen.getByText("Retry")).toBeInTheDocument();
    });

    it("calls the buttonAction function when provided", () => {
        const mockButtonAction = jest.fn();

        render(
            <MemoryRouter>
                <ErrorMessage
                    message="An error occurred"
                    buttonText="Retry"
                    buttonAction={mockButtonAction}
                />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText("Retry"));
        expect(mockButtonAction).toHaveBeenCalled();
    });

    it("navigates to the home page if no buttonAction is provided", () => {
        render(
            <MemoryRouter>
                <ErrorMessage message="An error occurred" buttonText="Retry" />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText("Retry"));
        expect(mockNavigate).toHaveBeenCalledWith("/");
    });
});
