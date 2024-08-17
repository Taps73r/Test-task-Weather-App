import { render, screen, fireEvent } from "@testing-library/react";
import { CityWeatherDetails } from "../pages/CityWeatherDetails";
import { useDispatch, useSelector } from "react-redux";
import { hourlyWeatherThunk } from "../store/thunk/hourlyWeatherThunk";
import { weatherThunk } from "../store/thunk/weatherThunk";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";

jest.mock("react-redux", () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

jest.mock("../store/thunk/hourlyWeatherThunk", () => ({
    hourlyWeatherThunk: jest.fn(),
}));

jest.mock("../store/thunk/weatherThunk", () => ({
    weatherThunk: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
    useParams: jest.fn(),
}));

jest.mock("../components/WeatherHeader", () => ({
    WeatherHeader: () => <div data-testid="weather-header">Weather Header</div>,
}));

jest.mock("../components/WeatherDetails", () => ({
    WeatherDetails: () => (
        <div data-testid="weather-details">Weather Details</div>
    ),
}));

jest.mock("../components/TemperatureChart", () => ({
    TemperatureChart: () => (
        <div data-testid="temperature-chart">Temperature Chart</div>
    ),
}));

jest.mock("../components/ErrorMessage", () => ({
    ErrorMessage: ({
        message,
        buttonText,
        buttonAction,
    }: {
        message: string;
        buttonText: string;
        buttonAction: () => void;
    }) => (
        <div data-testid="error-message">
            {message}
            <button onClick={buttonAction}>{buttonText}</button>
        </div>
    ),
}));

describe("CityWeatherDetails", () => {
    const mockDispatch = jest.fn();
    const mockNavigate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useDispatch as unknown as jest.Mock<AppDispatch>).mockReturnValue(
            mockDispatch
        );
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    });

    test("renders weather details when city data is available", () => {
        (useParams as jest.Mock).mockReturnValue({ cityName: "New York" });

        (useSelector as unknown as jest.Mock<AppDispatch>).mockImplementation(
            (callback) =>
                callback({
                    citiesWeatherReducer: {
                        cities: [
                            {
                                cityName: "New York",
                                weather: {
                                    main: {
                                        temp: 20,
                                        humidity: 50,
                                        pressure: 1000,
                                    },
                                    clouds: { all: 75 },
                                    wind: { speed: 10 },
                                    weather: [{ main: "Clear", icon: "01d" }],
                                },
                            },
                        ],
                    },
                    cityHourlyWeatherReducer: {
                        data: {
                            list: [
                                {
                                    dt_txt: "2024-08-17 15:00:00",
                                    main: { temp: 22 },
                                },
                            ],
                        },
                        error: null,
                    },
                })
        );

        render(<CityWeatherDetails />);

        expect(screen.getByTestId("weather-header")).toBeInTheDocument();
        expect(screen.getByTestId("weather-details")).toBeInTheDocument();
        expect(screen.getByTestId("temperature-chart")).toBeInTheDocument();

        expect(weatherThunk).toHaveBeenCalledWith("New York");
        expect(hourlyWeatherThunk).toHaveBeenCalledWith("New York");
    });

    test("shows error message when city data is not found", () => {
        (useParams as jest.Mock).mockReturnValue({ cityName: "Unknown City" });

        (useSelector as unknown as jest.Mock<RootState>).mockImplementation(
            (callback) =>
                callback({
                    citiesWeatherReducer: {
                        cities: [],
                    },
                    cityHourlyWeatherReducer: {
                        data: null,
                        error: null,
                    },
                })
        );

        render(<CityWeatherDetails />);

        expect(screen.getByTestId("error-message")).toHaveTextContent(
            "City not found. Please add the city first."
        );

        expect(weatherThunk).not.toHaveBeenCalled();
        expect(hourlyWeatherThunk).not.toHaveBeenCalled();
    });

    test("shows error message when there is an error in fetching data", () => {
        (useParams as jest.Mock).mockReturnValue({ cityName: "New York" });

        (useSelector as unknown as jest.Mock<RootState>).mockImplementation(
            (callback) =>
                callback({
                    citiesWeatherReducer: {
                        cities: [
                            {
                                cityName: "New York",
                                weather: {
                                    main: {
                                        temp: 20,
                                        humidity: 50,
                                        pressure: 1000,
                                    },
                                    clouds: { all: 75 },
                                    wind: { speed: 10 },
                                    weather: [{ main: "Clear", icon: "01d" }],
                                },
                            },
                        ],
                    },
                    cityHourlyWeatherReducer: {
                        data: null,
                        error: "Failed to fetch data",
                    },
                })
        );

        render(<CityWeatherDetails />);

        expect(screen.getByTestId("error-message")).toHaveTextContent(
            "Error loading data: Failed to fetch data"
        );

        const tryAgainButton = screen.getByRole("button", {
            name: /Try Again/i,
        });
        fireEvent.click(tryAgainButton);

        expect(weatherThunk).toHaveBeenCalledWith("New York");
        expect(hourlyWeatherThunk).toHaveBeenCalledWith("New York");
    });

    test("navigates to homepage when 'Go to Homepage' button is clicked", () => {
        (useParams as jest.Mock).mockReturnValue({ cityName: "New York" });

        (useSelector as unknown as jest.Mock<RootState>).mockImplementation(
            (callback) =>
                callback({
                    citiesWeatherReducer: {
                        cities: [
                            {
                                cityName: "New York",
                                weather: {
                                    main: {
                                        temp: 20,
                                        humidity: 50,
                                        pressure: 1000,
                                    },
                                    clouds: { all: 75 },
                                    wind: { speed: 10 },
                                    weather: [{ main: "Clear", icon: "01d" }],
                                },
                            },
                        ],
                    },
                    cityHourlyWeatherReducer: {
                        data: null,
                        error: null,
                    },
                })
        );

        render(<CityWeatherDetails />);

        const goHomeButton = screen.getByRole("button", {
            name: /Go to Homepage/i,
        });
        fireEvent.click(goHomeButton);

        expect(mockNavigate).toHaveBeenCalledWith("/");
    });
});
