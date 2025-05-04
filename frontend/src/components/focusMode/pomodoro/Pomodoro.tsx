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
    const [startTime, setStartTime] = useState<DateTime | null>(null); // A récupérer depuis les paramètres.
    const [sessionsCount, setSessionsCount] = useState(1);


    //TODO: verifier si il y a une session active en back

    useEffect(() => {
        if(isSessionRunning && startTime) {
            const interval = setInterval(() => {
                const now = DateTime.now();
                const diff = now.diff(startTime, ['minutes', 'seconds']);
                const totalMinutes = Math.floor(diff.as('minutes'));
    
                // Calculer les minutes et secondes dans la session actuelle
                const currentMinutes = totalMinutes % 30;
                const currentSeconds = Math.floor(diff.seconds) % 60;
    
                // Mettre à jour l'état
                setElapsedTime({ minutes: currentMinutes, seconds: currentSeconds });
                setSessionsCount(Math.floor(totalMinutes / 30) + 1);
            }, 1000);
    
            return () => clearInterval(interval);
        }

    }, [startTime, isSessionRunning]);

    const startSession = () => {
        //TODO: lancer une requete back pour creer la session
        setIsSessionRunning(true);
        setStartTime(DateTime.now());
    };

    const stopSession = () => {
        //TODO: lancer une requete back pour arreter la session
        setIsSessionRunning(false);
        setStartTime(null);
        setElapsedTime({ minutes: 0, seconds: 0 });
        setSessionsCount(1);
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
                    <Clock elapsedTime={elapsedTime} sessionsCount={sessionsCount} />
                    <ActionButton 
                        label='Stop session' 
                        type={ButtonType.Danger} 
                        icon={StopCircle}
                        onClick={stopSession}
                    />

                    <StateCarrousel />
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