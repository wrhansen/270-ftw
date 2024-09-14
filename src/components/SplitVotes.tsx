import StateData from "../models/StateData";

interface SplitVotesProps {
    stateData: { [key: string]: StateData }
}

const SplitVotes = (props: SplitVotesProps) => {
    const districtStates = Object.keys(props.stateData).filter((state) => props.stateData[state].splits ? true : false);
    const districtSplits = Object.values(props.stateData).filter(x => x.splits ? true : false);
    const districtCountMax = districtSplits.reduce((max, current) => {
        return current.splits && max.splits && (current.splits.length > max.splits.length) ? current : max
    }).splits?.length;

    const districtCols = [];
    for (let i = 0; i < districtCountMax; i++) {
        districtCols.push(<th key={i + 1}>{i + 1}</th>);
    }

    const emptyDistricts = [];
    districtSplits.map((stateData) => {
        const emptyDistrict = [];
        for (let i = 0; i < districtCountMax - stateData.splits.length; i++) {
            emptyDistrict.push(<th key={i}>N/A</th>);
        }
        emptyDistricts.push(emptyDistrict);
    })

    return (
        <div>
            <h2 style={{ textAlign: 'left' }}>Split Votes</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th rowSpan={2}>State</th>
                        <th colSpan={3}>District</th>
                    </tr>
                    <tr></tr>
                    <tr>
                        <th></th><th></th>
                        {districtCols}
                    </tr>
                </thead>
                <tbody>
                    {
                        districtSplits.map((stateData, index) => (
                            <tr key={index}>
                                <td>{districtStates[index]}</td>
                                <td style={{ backgroundColor: props.stateData[districtStates[index]].fill }}>{props.stateData[districtStates[index]].votes}</td>
                                {stateData.splits.map((data, i) => (
                                    <td key={i} style={{ backgroundColor: data.fill }}>{data.votes}</td>
                                ))}
                                {emptyDistricts[index]}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div >
    );
};

export default SplitVotes;
