import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { StopCircle } from '@mui/icons-material';
import Clock from '../clock/Clock';
import './Pomodoro.css';
import ActionButton from '../../generic/actionButton/ActionButton';
import { ButtonType } from '../../../constants/buttons/buttonsTypes';
import StateCarrousel from './stateCaroussel/StateCarrousel';

export default function Pomodoro() {
    const [isSessionRunning, setIsSessionRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState({ minutes: 0, seconds: 0 });
    const [startTime, setStartTime] = useState<DateTime | null>(null);
    const [sessionsCount, setSessionsCount] = useState(1);
    const [isBreak, setIsBreak] = useState(false);
    
    // Durées en minutes pour le travail et la pause
    const WORK_DURATION = 25;
    const BREAK_DURATION = 5;

    useEffect(() => {
        if(isSessionRunning && startTime) {
            const interval = setInterval(() => {
                const now = DateTime.now();
                const diff = now.diff(startTime, ['minutes', 'seconds']);
                const totalMinutes = Math.floor(diff.as('minutes'));
                
                // Calculer les cycles complets (travail + pause)
                const cycleLength = WORK_DURATION + BREAK_DURATION;
                const completeCycles = Math.floor(totalMinutes / cycleLength);
                
                // Calculer le temps restant dans le cycle actuel
                const minutesInCurrentCycle = totalMinutes % cycleLength;
                
                // Déterminer si nous sommes en pause ou en travail
                const currentIsBreak = minutesInCurrentCycle >= WORK_DURATION;
                setIsBreak(currentIsBreak);
                
                // Calculer les minutes et secondes dans la phase actuelle
                let currentPhaseMinutes;
                if (currentIsBreak) {
                    // Pendant la pause
                    currentPhaseMinutes = minutesInCurrentCycle - WORK_DURATION;
                } else {
                    // Pendant le travail
                    currentPhaseMinutes = minutesInCurrentCycle;
                }
                
                const currentPhaseSeconds = Math.floor(diff.seconds) % 60;
                
                setElapsedTime({
                    minutes: currentPhaseMinutes,
                    seconds: currentPhaseSeconds
                });
                
                setSessionsCount(completeCycles + 1);
            }, 1000);
            
            return () => clearInterval(interval);
        }
    }, [startTime, isSessionRunning]);

    const startSession = () => {
        //TODO: lancer une requete back pour creer la session
        setIsSessionRunning(true);
        setStartTime(DateTime.now());
        setIsBreak(false);
    };

    const stopSession = () => {
        //TODO: lancer une requete back pour arreter la session
        setIsSessionRunning(false);
        setStartTime(null);
        setElapsedTime({ minutes: 0, seconds: 0 });
        setSessionsCount(1);
        setIsBreak(false);
    };

    //Supprimer cette fonction
    const add5Minutes = () => {
        const newStartTime = startTime!.minus({ minutes: 5 });
        setStartTime(newStartTime);
    };

    //Supprimer cette fonction
    const addMinute = () => {
        const newStartTime = startTime!.minus({ minutes: 1 });
        setStartTime(newStartTime);
    };

    return (
        <div className="pomodoro-container">
            {isSessionRunning && 
                <>
                    <div>
                        <button onClick={add5Minutes}>+5</button>
                        <button onClick={addMinute}>+1</button>
                    </div>
                    <Clock 
                        elapsedTime={elapsedTime} 
                        sessionsCount={sessionsCount}
                        isBreak={isBreak}
                        maxMinutes={isBreak ? BREAK_DURATION : WORK_DURATION}
                    />
                    <ActionButton 
                        label='Stop session' 
                        type={ButtonType.Danger} 
                        icon={StopCircle}
                        onClick={stopSession}
                    />
                    {startTime && 
                        <StateCarrousel 
                            isBreak={isBreak}
                            startTime={startTime}
                        />
                    }
                </>
            }
            {!isSessionRunning &&
                <div className="start-session-button" onClick={startSession}>
                    Start a new Pomodoro session
                </div>
            }
        </div>
    );
}