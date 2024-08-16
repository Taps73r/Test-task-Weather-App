import { Card, CardBody } from "@nextui-org/react";

interface IConditionCardProps {
    conditionText?: string;
    conditionIcon?: string;
}

export function ConditionCard(props: IConditionCardProps) {
    return (
        <Card className="w-[180px] p-2 text-white backgroundColor">
            <CardBody className="flex flex-col items-center">
                <p className="text-2xl font-bold">{props.conditionText}</p>
                <img
                    className="w-[80px] h-[80px]"
                    src={`https://openweathermap.org/img/wn/${props.conditionIcon}@2x.png`}
                    alt={props.conditionText}
                />
            </CardBody>
        </Card>
    );
}
