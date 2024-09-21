import StateData from "../models/StateData";
import './SplitVotes.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';


interface SplitVotesProps {
    stateData: { [key: string]: StateData },
    onClick: CallableFunction
}

const SplitVotes = (props: SplitVotesProps) => {
    const districtStates = Object.keys(props.stateData).filter((state) => props.stateData[state].splits ? true : false);
    const districtSplits = Object.values(props.stateData).filter(x => x.splits ? true : false);
    const districtCountMax = districtSplits.reduce((max, current) => {
        return current.splits && max.splits && (current.splits.length > max.splits.length) ? current : max
    }).splits?.length;

    const districtCols = [];
    for (let i = 0; i < districtCountMax; i++) {
        districtCols.push(<th key={i + 1} className="cell cell-header">{i + 1}</th>);
    }

    const emptyDistricts = [];
    for (let stateData of districtSplits) {
        const emptyDistrict = [];
        for (let i = 0; i < districtCountMax - stateData.splits.length; i++) {
            emptyDistrict.push(<th className="cell" style={{ fontSize: "1.25rem" }} key={i}><i className="bi bi-question-circle"></i></th>);
        }
        emptyDistricts.push(emptyDistrict);
    }

    return (
        <div>
            <h2 className="title-header">Split Votes</h2>
            <table className="split-table">
                <thead>
                    <tr>
                        <th></th>
                        <th className="col-state header-cell" rowSpan={2}>State</th>
                        <th className="header-cell" colSpan={3}>District</th>
                    </tr>
                    <tr></tr>
                    <tr>
                        <th></th><th className="col-state"></th>
                        {districtCols}
                    </tr>
                </thead>
                <tbody>
                    {districtSplits.map((stateData, index) => (
                        <tr key={index}>
                            <td className="state-label split-cell">{districtStates[index]}</td>
                            <td
                                className="vote-label cell col-state"
                            >
                                <div
                                    className="state-div split-cell"
                                    style={{ backgroundColor: props.stateData[districtStates[index]].fill }}
                                    onClick={(event) => props.onClick(districtStates[index], null, event)}
                                >
                                    {props.stateData[districtStates[index]].votes}
                                </div>
                            </td>
                            {stateData.splits.map((data, i) => (
                                <td
                                    key={i}
                                    className="vote-label cell split-cell"
                                    style={{ backgroundColor: data.fill }}
                                    onClick={(event) => props.onClick(districtStates[index], i, event)}>{data.votes}</td>
                            ))}
                            {emptyDistricts[index]}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export default SplitVotes;
