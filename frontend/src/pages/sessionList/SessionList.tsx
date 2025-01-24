import { useEffect, useState } from 'react';
import { useServices } from '../../hooks/useServices'
import { SprintSession } from '../../models/SprintSession';
import './SessionList.css'
import SprintSessionCard from '../../components/sprintSession/card/SprintSessionCard';

export default function SessionList() {

    const { sprintSessionService } = useServices();
    const [sessionsList, setSessionList] = useState<SprintSession[]>([]);

    const fetchSprintSessionList = async () => {
        const sessions: SprintSession[] = await sprintSessionService.getSprintSessionList();
        if(sessions) {
            setSessionList(sessions);
        }
    }

    useEffect(() => {
        fetchSprintSessionList();
    }, [])

    return <div className='session-list-container'>
        {sessionsList.map(session => (
            <SprintSessionCard session={session} key={session.id}/>
        ))}
    </div>
}