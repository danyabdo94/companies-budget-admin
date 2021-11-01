import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

interface IStatusCircleProps {
    color: string;
    size?: number | string;
    value: number;
    label?: string;
}

export default function StatusCircle({ color, size = "3rem", label, value }: IStatusCircleProps): JSX.Element {
    return (
        <CircularProgress value={value} color={color} size={size}>
            {label && <CircularProgressLabel>{label}</CircularProgressLabel>}
        </CircularProgress>
    );
}
