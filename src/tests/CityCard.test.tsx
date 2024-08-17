import { render, screen, fireEvent } from "@testing-library/react";
import { CityCard } from "../components/CityCard/CityCard";
import { useDispatch } from "react-redux";
import { weatherThunk } from "../store/thunk/weatherThunk";
import { removeCity } from "../store/slices/citiesWeatherSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store/store";

jest.mock("react-redux", () => ({
    useDispatch: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
}));

jest.mock("../store/thunk/weatherThunk", () => ({
    weatherThunk: jest.fn(),
}));

jest.mock("../store/slices/citiesWeatherSlice", () => ({
    removeCity: jest.fn(),
}));

jest.mock("../components/CityCard/CityCardBody", () => ({
    CityCardBody: jest.fn(() => (
        <div data-testid="city-card-body">CityCardBody</div>
    )),
}));

jest.mock("../components/CityCard/CityCardHeader", () => ({
    CityCardHeader: jest.fn(({ handleDeleteCard, handleUpdateCard }) => (
        <div>
            <button onClick={handleDeleteCard} data-testid="delete-button">
                Delete
            </button>
            <button onClick={handleUpdateCard} data-testid="update-button">
                Update
            </button>
        </div>
    )),
}));

describe("CityCard", () => {
    const mockDispatch = jest.fn();
    const mockNavigate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useDispatch as unknown as jest.Mock<AppDispatch>).mockReturnValue(
            mockDispatch
        );
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    });

    const defaultProps = {
        maxTemp: 25,
        conditionIcon: "01d",
        conditionText: "Clear Sky",
        windSpeed: 10,
        clouds: 50,
        city: "New York",
        humidity: 60,
        country: "US",
    };

    test("renders CityCard with header and body components", () => {
        render(<CityCard {...defaultProps} />);

        expect(screen.getByTestId("city-card-body")).toBeInTheDocument();
        expect(screen.getByText("Delete")).toBeInTheDocument();
        expect(screen.getByText("Update")).toBeInTheDocument();
    });

    test("dispatches removeCity action on clicking delete button", () => {
        render(<CityCard {...defaultProps} />);

        fireEvent.click(screen.getByTestId("delete-button"));

        expect(mockDispatch).toHaveBeenCalledWith(removeCity("New York"));
    });

    test("dispatches weatherThunk action on clicking update button", () => {
        render(<CityCard {...defaultProps} />);

        fireEvent.click(screen.getByTestId("update-button"));

        expect(mockDispatch).toHaveBeenCalledWith(weatherThunk("New York"));
    });

    test("navigates to city page on card click", () => {
        render(<CityCard {...defaultProps} />);

        fireEvent.click(screen.getByRole("article"));

        expect(mockNavigate).toHaveBeenCalledWith("/city/New York");
    });
});
