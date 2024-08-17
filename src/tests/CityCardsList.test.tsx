import { render, screen } from "@testing-library/react";
import { CityCardsList } from "../components/CityCardsList";
import { useSelector } from "react-redux";

jest.mock("../components/CityCard/CityCard", () => ({
    CityCard: ({ city }: { city: string }) => (
        <div data-testid="city-card">{city}</div>
    ),
}));

jest.mock("react-redux", () => ({
    useSelector: jest.fn(),
}));

describe("CityCardsList", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders CityCard components when cities data is available", () => {
        (useSelector as unknown as jest.Mock).mockReturnValue({
            cities: [
                {
                    cityName: "New York",
                    weather: {
                        sys: { country: "US" },
                        main: { temp_max: 25, humidity: 50 },
                        weather: [{ main: "Clear", icon: "01d" }],
                        wind: { speed: 10 },
                        clouds: { all: 20 },
                    },
                },
                {
                    cityName: "Los Angeles",
                    weather: {
                        sys: { country: "US" },
                        main: { temp_max: 28, humidity: 60 },
                        weather: [{ main: "Sunny", icon: "02d" }],
                        wind: { speed: 8 },
                        clouds: { all: 10 },
                    },
                },
            ],
        });

        render(<CityCardsList />);

        const cityCards = screen.getAllByTestId("city-card");
        expect(cityCards).toHaveLength(2);
        expect(cityCards[0]).toHaveTextContent("New York");
        expect(cityCards[1]).toHaveTextContent("Los Angeles");
    });

    test("does not render CityCard components when cities data is empty", () => {
        (useSelector as unknown as jest.Mock).mockReturnValue({ cities: [] });

        render(<CityCardsList />);

        const cityCards = screen.queryAllByTestId("city-card");
        expect(cityCards).toHaveLength(0);
    });

    test("renders correct number of CityCard components when cities data changes", () => {
        (useSelector as unknown as jest.Mock).mockReturnValue({
            cities: [
                {
                    cityName: "Chicago",
                    weather: {
                        sys: { country: "US" },
                        main: { temp_max: 20, humidity: 70 },
                        weather: [{ main: "Cloudy", icon: "03d" }],
                        wind: { speed: 12 },
                        clouds: { all: 90 },
                    },
                },
            ],
        });

        render(<CityCardsList />);

        const cityCards = screen.getAllByTestId("city-card");
        expect(cityCards).toHaveLength(1);
        expect(cityCards[0]).toHaveTextContent("Chicago");
    });

    test("renders nothing when cities data is undefined", () => {
        (useSelector as unknown as jest.Mock).mockReturnValue({
            cities: undefined,
        });

        render(<CityCardsList />);

        const cityCards = screen.queryAllByTestId("city-card");
        expect(cityCards).toHaveLength(0);
    });
});
