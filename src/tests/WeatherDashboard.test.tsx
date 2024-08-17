import { render, screen } from "@testing-library/react";
import { WeatherDashboard } from "../pages/WeatherDashboard";
import { useDispatch } from "react-redux";
import { weatherThunk } from "../store/thunk/weatherThunk";
import { AppDispatch } from "../store/store";

jest.mock("react-redux", () => ({
    useDispatch: jest.fn(),
}));

jest.mock("../store/thunk/weatherThunk", () => ({
    weatherThunk: jest.fn(),
}));

jest.mock("../components/AddCityModal", () => ({
    AddCityModal: () => <div data-testid="add-city-modal">Add City Modal</div>,
}));

jest.mock("../components/CityCardsList", () => ({
    CityCardsList: () => (
        <div data-testid="city-cards-list">City Cards List</div>
    ),
}));

describe("WeatherDashboard", () => {
    const localStorageMock = (function () {
        let store: { [key: string]: string } = {};
        return {
            getItem: (key: string) => store[key] || null,
            setItem: (key: string, value: string) => {
                store[key] = value;
            },
            clear: () => {
                store = {};
            },
        };
    })();

    beforeEach(() => {
        jest.clearAllMocks();

        Object.defineProperty(window, "localStorage", {
            value: localStorageMock,
        });

        window.localStorage.clear();
    });

    test("dispatches weatherThunk for stored cities", () => {
        const mockDispatch = jest.fn();
        (useDispatch as unknown as jest.Mock<AppDispatch>).mockReturnValue(
            mockDispatch
        );

        const storedCities = ["New York", "Los Angeles"];
        window.localStorage.setItem("cities", JSON.stringify(storedCities));

        render(<WeatherDashboard />);

        expect(weatherThunk).toHaveBeenCalledTimes(2);
        expect(weatherThunk).toHaveBeenCalledWith("New York");
        expect(weatherThunk).toHaveBeenCalledWith("Los Angeles");

        expect(screen.getByTestId("add-city-modal")).toBeInTheDocument();
        expect(screen.getByTestId("city-cards-list")).toBeInTheDocument();
    });

    test("renders without cities in localStorage", () => {
        const mockDispatch = jest.fn();
        (useDispatch as unknown as jest.Mock<AppDispatch>).mockReturnValue(
            mockDispatch
        );

        window.localStorage.setItem("cities", JSON.stringify([]));

        render(<WeatherDashboard />);

        expect(weatherThunk).not.toHaveBeenCalled();

        expect(screen.getByTestId("add-city-modal")).toBeInTheDocument();
        expect(screen.getByTestId("city-cards-list")).toBeInTheDocument();
    });
});
