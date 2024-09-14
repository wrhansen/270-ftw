import { useEffect, useState } from 'react';

import USAMap from "react-usa-map";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import { renderToString } from 'react-dom/server';

import './App.css';
import ElectoralVotes from './data/ElectoralVotes';
import stateDistricts from './data/stateDistricts';
import { MapOption, mapOptions } from './data/maps';
import stateCodePositions from './data/stateCodePositions';
import SmallStates from './data/smallStates';
import StateColors from './models/StateColors';
import CountTracker from './components/CountTracker';
import MapLegend from './components/MapLegend';
import MapSelector from './components/MapSelector';
import StateLabel, { StateLabelProps } from './components/StateLabel';
import SmallStateGrid from './components/SmallStateGrid';
import SplitVotes from './components/SplitVotes';
import StateData from './models/StateData';

const defaultState: StateData = { fill: StateColors.TossUp, votes: 0 };
const initDefaultState = () => {
    let defaultStatesMap: { [key: string]: StateData } = {};

    for (const [key, value] of Object.entries(ElectoralVotes)) {
        let newState = { ...defaultState };
        newState.votes = value;
        defaultStatesMap[key] = newState;
        if (stateDistricts[key]) {
            let districts = [];
            for (let i = 0; i < stateDistricts[key]; i++) {
                districts.push({ ...defaultState });
            }
            defaultStatesMap[key].splits = districts;
        }
    }

    return defaultStatesMap;
};

const initDefaultVotes = () => {
    return [0, 0, 0, 0, 0, 0, 0];
}

const hackObjects = () => {
    const objs = document.getElementsByTagName("foreignObject");
    for (let i = 0; i < objs.length; i++) {
        objs[i].remove();
    }
    let svg = document.getElementsByTagName("svg")[0];
    let outlines = svg.getElementsByClassName("outlines")[0];

    for (const stateCodePosition of stateCodePositions) {
        let props = { ...stateCodePosition } as StateLabelProps;
        props.votes = ElectoralVotes[props.stateCode];
        outlines.insertAdjacentHTML("beforeend", renderToString(<StateLabel {...props} />));
    }
};

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
        hackObjects();
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

        if (countryCode in SmallStates) {
            currentStates[countryCode].clickHandler = (event: any) => onSmallStateClick;
        }
        setStateData(currentStates);
    };

    /* callback for when a map is selected */
    const mapSelected = (selectedOption: MapOption | null): void => {
        if (selectedOption) {
            setSelectedOption(selectedOption);
            refreshMap(selectedOption.data);
        }
    };

    /* Use selected map data to fill out the map */
    const refreshMap = (selectedOptionData: { [key: string]: StateData } | null) => {
        const option = selectedOptionData ?? selectedOption.data;
        setStateData(JSON.parse(JSON.stringify(option)));
    };

    const refreshHandler = () => {
        refreshMap(null);
    }

    const onSmallStateClick = (event: any) => {
        const stateClicked = event.target.innerText.split('\n')[0];
        let currentStateData = { ...stateData };
        currentStateData[stateClicked].fill = toggleColor(currentStateData[stateClicked].fill);
        setStateData(currentStateData);
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
                    <div className="map-row">
                        <USAMap title="270 FTW"
                            customize={stateData}
                            onClick={mapHandler}
                        />
                        <div className="small-state-grid">
                            <SmallStateGrid stateData={stateData} onClick={onSmallStateClick} />
                        </div>
                    </div>
                </div>
                <div className="sidebar">
                    <MapLegend />
                    <MapSelector selectedMap={selectedOption} onChange={mapSelected} />
                    <div>
                        <Button variant="primary"
                            onClick={refreshHandler}
                            disabled={refreshDisabled}>
                            <i className="bi bi-arrow-clockwise"></i> Reset Map
                        </Button>
                    </div>
                    <SplitVotes stateData={stateData} />
                </div>
            </div>
        </div>
    );
}

export default App;
