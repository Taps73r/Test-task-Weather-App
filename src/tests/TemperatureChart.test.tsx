import { render, screen } from "@testing-library/react";
import { TemperatureChart } from "../components/TemperatureChart";

jest.mock("recharts", () => ({
    XAxis: () => <div data-testid="x-axis"></div>,
    YAxis: () => <div data-testid="y-axis"></div>,
    Tooltip: () => <div data-testid="tooltip"></div>,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="responsive-container">{children}</div>
    ),
    AreaChart: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="area-chart">{children}</div>
    ),
    Area: () => <div data-testid="area"></div>,
    LabelList: () => <div data-testid="label-list"></div>,
}));

describe("TemperatureChart", () => {
    test("renders the chart with data", () => {
        const testData = [
            { temperature: 22, hour: "10 AM" },
            { temperature: 24, hour: "11 AM" },
            { temperature: 26, hour: "12 PM" },
        ];

        render(<TemperatureChart temperatureData={testData} />);

        expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
        expect(screen.getByTestId("area-chart")).toBeInTheDocument();
    });

    test("renders the correct number of data points", () => {
        const testData = [
            { temperature: 22, hour: "10 AM" },
            { temperature: 24, hour: "11 AM" },
            { temperature: 26, hour: "12 PM" },
        ];

        render(<TemperatureChart temperatureData={testData} />);

        expect(screen.getByTestId("area")).toBeInTheDocument();
    });

    test("renders nothing when data is undefined", () => {
        render(<TemperatureChart temperatureData={undefined} />);

        expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
        expect(screen.getByTestId("area-chart")).toBeInTheDocument();
    });
});
