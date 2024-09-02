import StateColors from '../models/StateColors';
import './CountTracker.css';

interface CountTrackerProps {
    counts: number[];
    colors: string[];
};

const CountTracker = ({ counts, colors }: CountTrackerProps) => {
    const total = counts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    let percentages = counts.map((value) => (value / total) * 100);
    const demCount = counts.slice(0, 3).reduce((a, b) => a + b, 0);
    const repCount = counts.slice(4, 7).reduce((a, b) => a + b, 0);

    return (
        <>
            <div className="label-container">
                <div style={{ color: `${StateColors.DemocratSafe}` }}>
                    <b>Democrats {demCount}</b>
                </div>
                <div style={{ color: `${StateColors.RepublicanSafe}` }} >
                    <b>{repCount} Republicans</b>
                </div>
            </div >
            <div className="container">
                <div className="caret" />
                <div className="flex-container">
                    {percentages.map((percent, index) => (
                        <div
                            key={index}
                            className="flex-item"
                            style={{
                                flexBasis: `${percent}%`,
                                backgroundColor: `${colors[index]}`,
                                display: `${percent > 0 ? 'block' : 'none'}`
                            }}
                        >
                            {`${counts[index]}`}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CountTracker;
