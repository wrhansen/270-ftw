import Select from 'react-select';

import { MapOption, mapOptions } from '../data/maps';

interface MapSelectorProps {
    selectedMap: MapOption;
    onChange: (selectedOption: MapOption | null) => void;
}

const MapSelector = ({ selectedMap, onChange }: MapSelectorProps) => {
    return (
        <>
            <h2>Map Select</h2>
            <Select options={mapOptions} value={selectedMap} onChange={onChange} />
        </>
    );
}

export default MapSelector;
