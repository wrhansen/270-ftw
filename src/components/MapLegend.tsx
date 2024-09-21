import StateColors from "../models/StateColors";
import './MapLegend.css';

interface PaletteSquareProps {
    color: string;
}

const PaletteSquare = ({ color }: PaletteSquareProps) => {
    return (
        <div className="palette-square" style={{ backgroundColor: `${color}` }}>&nbsp;</div>
    )
}

const MapLegend = () => {
    return (
        <table className="map-legend">
            <thead>
                <tr><th><h2>Legend</h2></th></tr>
                <tr>
                    <th className="map-header">Democrat</th>
                    <th className="map-header title"></th>
                    <th className="map-header">Republican</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="map-cell"><PaletteSquare color={StateColors.DemocratSafe} /></td>
                    <td className="map-cell title"><b>Safe</b></td>
                    <td className="map-cell"><PaletteSquare color={StateColors.RepublicanSafe} /></td>
                </tr>
                <tr>
                    <td className="map-cell"><PaletteSquare color={StateColors.DemocratLikely} /></td>
                    <td className="map-cell title"><b>Likely</b></td>
                    <td className="map-cell"><PaletteSquare color={StateColors.RepublicanLikely} /></td>
                </tr>
                <tr>
                    <td className="map-cell"><PaletteSquare color={StateColors.DemocratLeans} /></td>
                    <td className="map-cell title"><b>Leans</b></td>
                    <td className="map-cell"><PaletteSquare color={StateColors.RepublicanLeans} /></td>
                </tr>
                <tr>
                    <td className="map-cell"></td>
                    <td className="map-cell title"><b>Toss Up</b></td>
                    <td className="map-cell"></td>
                </tr>
                <tr>
                    <td className="map-cell"></td>
                    <td className="map-cell title"><PaletteSquare color={StateColors.TossUp} /></td>
                    <td className="map-cell"></td>
                </tr>
            </tbody>
        </table>
    );
}
export default MapLegend;
