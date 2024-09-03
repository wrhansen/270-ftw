import './StateLabel.css';

export interface StateLabelProps {
    stateCode: string;
    x: number;
    y: number;
    votes: number;
    color?: string;

}
const StateLabel = (props: StateLabelProps) => {
    return (
        <foreignObject className="state" id={props.stateCode} width="20" height="25" x={props.x} y={props.y}>
            <div className={["state-details", props.color ?? "state-details-light"].join(' ')}>
                <span className="state-code">{props.stateCode}</span>
                <span className="state-votes">{props.votes}</span>
            </div>
        </foreignObject>
    )
}

export default StateLabel;
