import { render, screen } from "@testing-library/react";
import { WeatherDetails } from "../components/WeatherDetails";

describe("WeatherDetails", () => {
    it("renders the weather details correctly", () => {
        render(
            <WeatherDetails
                humidity={50}
                pressure={1015}
                windSpeed={5}
                clouds={20}
            />
        );

        expect(screen.getByText("Humidity")).toBeInTheDocument();
        expect(screen.getByText("50%")).toBeInTheDocument();

        expect(screen.getByText("Pressure")).toBeInTheDocument();
        expect(screen.getByText("1015 hPa")).toBeInTheDocument();

        expect(screen.getByText("Wind Speed")).toBeInTheDocument();
        expect(screen.getByText("5 m/s")).toBeInTheDocument();

        expect(screen.getByText("Clouds")).toBeInTheDocument();
        expect(screen.getByText("20%")).toBeInTheDocument();
    });
});
