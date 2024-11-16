import Current2024Map from "./maps/Current2024Map";
import BlankMap from "./maps/BlankMap";
import Actual2024Map from "./maps/Actual2024Map";

export interface MapOption {
    readonly value: string;
    readonly label: string;
    readonly data: typeof Current2024Map;
}

export const mapOptions: readonly MapOption[] = [
    { value: "Actual2024Map", label: "2024 Actual", data: Actual2024Map },
    { value: 'Current2024Map', label: 'Current 2024 Map', data: Current2024Map },
    { value: 'BlankMap', label: 'Blank Map', data: BlankMap },
]
