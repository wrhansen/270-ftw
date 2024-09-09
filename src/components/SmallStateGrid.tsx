import SmallStates from "../data/smallStates";
import './SmallStateGrid.css';

const SmallStateGrid = (props: any) => {
    return (
        <div className="grid-container">
            {SmallStates.map((state, index) => (
                <div className="grid-row" style={{ backgroundColor: `${props.stateData[state].fill}` }} key={index} onClick={props.onClick}>
                    <div className="state-cell">
                        {state}
                    </div>
                    <div className="votes-cell">
                        {props.stateData[state].votes}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SmallStateGrid;
