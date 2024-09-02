import { useEffect, useState } from 'react';
import './App.css';
import ElectoralVotes from './data/ElectoralVotes';
import { MapOption, mapOptions } from './data/maps';
import CountTracker from './components/CountTracker';
import MapLegend from './components/MapLegend';
import MapSelector from './components/MapSelector';
import StateColors from './models/StateColors';
import USAMap from "react-usa-map";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

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
    const [selectedOption, setSelectedOption] = useState<MapOption>(mapOptions[0]);
    const [refreshDisabled, setRefreshDisabled] = useState<boolean>(true);


    /* When state colors change, recalculate the votes for tracker */
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

    /* On first render, trigger initial map to load */
    useEffect(() => {
        mapSelected(selectedOption);
        // eslint-disable-next-line
    }, []);

    /* Enable "Clear Map" button when changes made to the current selected map */
    useEffect(() => {
        const current = JSON.stringify(stateData);
        const original = JSON.stringify(selectedOption.data);
        setRefreshDisabled(current === original);
    }, [stateData, selectedOption.data]);

    /* Change state color, based on index into StateColor enum */
    const toggleColor = (color: string) => {
        const values = Object.values(StateColors);
        const currentIndex = values.indexOf(color as any);

        if (currentIndex === -1 || currentIndex === values.length - 1) {
            return values[0];
        } else {
            return values[currentIndex + 1];
        }
    };

    /* callback for when a state is clicked on */
    const mapHandler = (event: any) => {
        const countryCode: string = event.target.dataset.name;

        let currentStates: { [key: string]: StateData } = { ...stateData };
        const newColor = toggleColor(currentStates[countryCode].fill);

        currentStates[countryCode].fill = newColor as StateColors;
        setStateData(currentStates);
    };

    /* callback for when a map is selected */
    const mapSelected = (selectedOption: MapOption | null): void => {
        if (selectedOption) {
            setSelectedOption(selectedOption);
            refreshMap();
        }
    };

    /* Use selected map data to fill out the map */
    const refreshMap = () => {
        setStateData(JSON.parse(JSON.stringify(selectedOption.data)));
    };

    return (
        <div className="App">
            <h1>270 FTW</h1>
            <div className="main-row">
                <div className="main-content">
                    <CountTracker
                        counts={votes}
                        colors={Object.values(StateColors)}
                    />
                    <USAMap title="270 FTW"
                        customize={stateData}
                        onClick={mapHandler}
                    />
                </div>
                <div className="sidebar">
                    <MapLegend />
                    <MapSelector selectedMap={selectedOption} onChange={mapSelected} />
                    <Button variant="primary"
                        onClick={refreshMap}
                        disabled={refreshDisabled}><i className="bi bi-arrow-clockwise"></i>Clear Map</Button>
                </div>
            </div>
        </div >
    );
}

export default App;
