import './CountTracker.css';

interface CountTrackerProps {
    counts: number[];
    colors: string[];
};

const CountTracker = ({ counts, colors }: CountTrackerProps) => {
    const total = counts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    let percentages = counts.map((value) => (value / total) * 100);

    return (
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
    );
};

export default CountTracker;
