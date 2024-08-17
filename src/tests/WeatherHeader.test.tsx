import { render, screen } from "@testing-library/react";
import { WeatherHeader } from "../components/WeatherHeader";

describe("WeatherHeader", () => {
    it("renders the WeatherHeader component with all props", () => {
        const props = {
            cityName: "New York",
            date: "2024-08-17",
            temperature: 25,
            conditionText: "Sunny",
            conditionIcon: "01d",
        };

        render(<WeatherHeader {...props} />);

        expect(screen.getByText("New York")).toBeInTheDocument();
        expect(screen.getByText("2024-08-17")).toBeInTheDocument();
        expect(screen.getByText("Weather: Sunny")).toBeInTheDocument();
        expect(screen.getByAltText("Sunny")).toBeInTheDocument();
        expect(screen.getByText("25°C")).toBeInTheDocument();
    });

    it("renders the WeatherHeader component without optional props", () => {
        const props = {
            cityName: "Los Angeles",
            date: "2024-08-17",
            temperature: 30,
        };

        render(<WeatherHeader {...props} />);

        expect(screen.getByText("Los Angeles")).toBeInTheDocument();
        expect(screen.getByText("2024-08-17")).toBeInTheDocument();
        expect(screen.getByText("30°C")).toBeInTheDocument();
        expect(screen.queryByText("Weather:")).not.toBeInTheDocument();
        expect(screen.queryByAltText("")).not.toBeInTheDocument();
    });
});
