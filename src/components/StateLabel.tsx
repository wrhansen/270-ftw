import StateColors from '../models/StateColors';
import StateData from '../models/StateData';
import './StateLabel.css';

export interface StateLabelProps {
    stateCode: string;
    x: number;
    y: number;
    votes: number;
    color?: string;
    fill: string;
    splits?: StateData[] | null;

}
const StateLabel = (props: StateLabelProps) => {
    let stateDistricts = [];
    let stateColorCounts = {};
    Object.values(StateColors).forEach((color) => {
        stateColorCounts[color] = 0;
    });
    console.log("stateColorCounts: ", stateColorCounts);

    let stateVote = props.votes;
    if (props.splits) {
        for (const split of props.splits) {
            if (split.fill === props.fill) {
                stateVote += split.votes;
            }
            else {
                stateColorCounts[split.fill] += split.votes;
            }
        }

        Object.entries(stateColorCounts).forEach(([key, value]) => {
            if (value) {
                stateDistricts.push({ color: key, votes: value });
            }
        });
        console.log("districts: ", stateDistricts);
    }
    return (
        <foreignObject className="state" id={props.stateCode} data-name={props.stateCode} width="20" height="25" x={props.x} y={props.y}>
            <div className={["state-details", props.color ?? "state-details-light"].join(' ')}>
                <span className="state-code">{props.stateCode}</span>

                {!props.splits && (
                    <span className="state-votes">{props.votes}</span>
                )}

                {props.splits && (
                    <span className="state-votes">{stateVote}</span>
                )}

                {stateDistricts?.map((state) => (
                    <span className="state-votes district-votes" style={{ backgroundColor: state.color }}>{state.votes}</span>
                ))}
            </div>
        </foreignObject >
    )
}

export default StateLabel;
