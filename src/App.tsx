import { useEffect, useState } from 'react';
import './App.css';
import ElectoralVotes from './data/ElectoralVotes';
import CountTracker from './components/CountTracker';
import StateColors from './models/StateColors';
import USAMap from "react-usa-map";


interface StateData {
    fill: StateColors;
    votes: number;
};

const defaultState: StateData = { fill: StateColors.TossUp, votes: 0 };
const initDefaultState = () => {
    let defaultStatesMap: { [key: string]: StateData } = {};

    for (const [key, value] of Object.entries(ElectoralVotes)) {
        let newState = { ...defaultState };
        newState.votes = value;
        defaultStatesMap[key] = newState;
    }
    return defaultStatesMap;
};

const initDefaultVotes = () => {
    return [0, 0, 0, 0, 0, 0, 0];
}

const App = () => {
    const [stateData, setStateData] = useState(initDefaultState() as { [key: string]: StateData });
    const [votes, setVotes] = useState<number[]>(initDefaultVotes());


    useEffect(() => {
        let currentVotes = initDefaultVotes();
        const keys = Object.values(StateColors);

        for (const data of Object.values(stateData)) {
            const color = data.fill;
            const index = keys.indexOf(color);
            currentVotes[index] += data.votes;
        }
        setVotes(currentVotes);
    }, [stateData]);

    const toggleColor = (color: string) => {
        const values = Object.values(StateColors);
        const currentIndex = values.indexOf(color as any);

        if (currentIndex === -1 || currentIndex === values.length - 1) {
            return values[0];
        } else {
            return values[currentIndex + 1];
        }
    };

    const mapHandler = (event: any) => {
        const countryCode: string = event.target.dataset.name;

        let currentStates: { [key: string]: StateData } = { ...stateData };
        const newColor = toggleColor(currentStates[countryCode].fill);

        currentStates[countryCode].fill = newColor as StateColors;
        setStateData(currentStates);
    };

    return (
        <div className="App">
            <h1>270 FTW</h1>
            <CountTracker
                counts={votes}
                colors={Object.values(StateColors)}
            />
            <USAMap title="270 FTW" customize={stateData} onClick={mapHandler} />
        </div >
    );
}

export default App;
