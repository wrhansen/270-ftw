import Current2024Map from "./maps/Current2024Map";
import BlankMap from "./maps/BlankMap";

export interface MapOption {
    readonly value: string;
    readonly label: string;
    readonly data: typeof Current2024Map;
}

export const mapOptions: readonly MapOption[] = [
    { value: 'Current2024Map', label: 'Current 2024 Map', data: Current2024Map },
    { value: 'BlankMap', label: 'Blank Map', data: BlankMap },
]
