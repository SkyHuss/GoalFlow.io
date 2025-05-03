import { useEffect, useState } from 'react';
import './Clock.css'

interface Props {
    elapsedTime: {
        minutes: number;
        seconds: number;
    };
    sessionsCount?: number;
}

export default function Clock({ elapsedTime, sessionsCount }: Props) {

    const [progress, setProgress] = useState(0);

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

    useEffect(() => {
        // Calculer la progression en pourcentage
        const totalElapsedSeconds = elapsedTime.minutes * 60 + elapsedTime.seconds;
        const progressValue = (totalElapsedSeconds / 1800) * 100;
        setProgress(progressValue);
    }, [elapsedTime]);

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

            {/*Cercle de progression de la session */}
            <svg width="300" height="300" viewBox="0 0 300 300" className='svg-clock-progress' style={{ '--progress': progress } as React.CSSProperties}>
                <circle className="bg"></circle>
                <circle className="fg"></circle>
            </svg>
        </div>
    </div>
}