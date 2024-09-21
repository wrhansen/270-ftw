import { MouseEventHandler } from 'react';
import Select from 'react-select';
import './MapSelector.css';

import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import { MapOption, mapOptions } from '../data/maps';

interface MapSelectorProps {
    selectedMap: MapOption;
    onChange: (selectedOption: MapOption | null) => void;
    onButtonClick: MouseEventHandler;
    buttonDisabled: boolean;
}

const MapSelector = ({ selectedMap, onChange, onButtonClick, buttonDisabled }: MapSelectorProps) => {
    return (
        <div className="map-selector">
            <h2 className="map-selector-title">Map Select</h2>
            <Select options={mapOptions} value={selectedMap} onChange={onChange} isSearchable={false} />
            <div>
                <Button variant="primary"
                    onClick={onButtonClick}
                    disabled={buttonDisabled}>
                    <i className="bi bi-arrow-clockwise"></i> Reset Map
                </Button>
            </div>
        </div>
    );
}

export default MapSelector;
