import StateColors from './StateColors';

interface StateData {
    fill: StateColors;
    votes: number;
    clickHandler?: Function | null;
    splits?: StateData[] | null;
};

export default StateData;
