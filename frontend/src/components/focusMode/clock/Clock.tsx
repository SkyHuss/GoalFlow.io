import './Clock.css'

interface Props {
    elapsedTime: {
        minutes: number;
        seconds: number;
    };
    sessionsCount?: number;
}

export default function Clock({ elapsedTime, sessionsCount }: Props) {

    const displayTime = (minutes: number, seconds: number) => {
        return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }

    const sessionsCountDisplay = (sessionsCount: number) => {
        if (sessionsCount === 1) {
            return '1st session';
        } else if (sessionsCount === 2) {
            return '2nd session';
        } else if (sessionsCount === 3) {
            return '3rd session';
        } else {
            return `${sessionsCount}th session`;
        }
    }

    return <div className="clock-container">
        <div className="clock-content">
            {(sessionsCount || sessionsCount === 0) && 
                <div className="sessions-count-label">
                    {sessionsCountDisplay(sessionsCount)}
                </div>
            }

            <div className="time">
                {displayTime(elapsedTime.minutes, elapsedTime.seconds)}
            </div>
        </div>
    </div>
}