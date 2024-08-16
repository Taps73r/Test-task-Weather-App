import { Card } from "@nextui-org/react";
import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LabelList,
    Area,
    AreaChart,
} from "recharts";

interface ITemperatureChartProps {
    temperatureData?: { temperature: number; hour: string }[];
}

export function TemperatureChart({ temperatureData }: ITemperatureChartProps) {
    return (
        <div className="w-full flex flex-row justify-center">
            <Card className="w-full m-8 text-blue-400 backgroundColor p-3">
                <ResponsiveContainer className="p-2" width="100%" height={220}>
                    <AreaChart data={temperatureData}>
                        <XAxis
                            dataKey="hour"
                            tick={{ fill: "#fff" }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            hide={true}
                            tick={{ fill: "#fff" }}
                            domain={["dataMin - 2", "dataMax + 2"]}
                        />
                        <Tooltip cursor={{ stroke: "none" }} />
                        <Area
                            type="monotone"
                            dataKey="temperature"
                            stroke="#06153f"
                            fill="rgba(6, 21, 63, 0.3)"
                            activeDot={{ r: 6 }}
                        >
                            <LabelList
                                dataKey="temperature"
                                position="top"
                                stroke="#fff"
                                fill="#fff"
                                offset={10}
                            />
                        </Area>
                    </AreaChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
}
