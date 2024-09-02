import StateColors from "../models/StateColors";

interface PaletteSquareProps {
    color: string;
}

const PaletteSquare = ({ color }: PaletteSquareProps) => {
    return (
        <div style={{ backgroundColor: `${color}` }}>&nbsp;</div>
    )
}

const MapLegend = () => {
    return (
        <table>
            <thead>
                <tr><th><h2>Legend</h2></th></tr>
                <tr>
                    <th>Democrat</th>
                    <th></th>
                    <th>Republican</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><PaletteSquare color={StateColors.DemocratSafe} /></td>
                    <td>Safe</td>
                    <td><PaletteSquare color={StateColors.RepublicanSafe} /></td>
                </tr>
                <tr>
                    <td><PaletteSquare color={StateColors.DemocratLikely} /></td>
                    <td>Likely</td>
                    <td><PaletteSquare color={StateColors.RepublicanLikely} /></td>
                </tr>
                <tr>
                    <td><PaletteSquare color={StateColors.DemocratLeans} /></td>
                    <td>Leans</td>
                    <td><PaletteSquare color={StateColors.RepublicanLeans} /></td>
                </tr>
                <tr>
                    <td></td>
                    <td>Toss Up</td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td><PaletteSquare color={StateColors.TossUp} /></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    );
}
export default MapLegend;
