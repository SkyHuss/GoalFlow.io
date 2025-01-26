import { AddCircleOutline, Tune } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useServices } from '../../hooks/useServices'
import { SprintSession } from '../../models/SprintSession';
import './SessionList.css'
import SprintSessionCard from '../../components/sprintSession/card/SprintSessionCard';
import ActionButton from '../../components/generic/actionButton/ActionButton';
import Tab, { TabItem } from '../../components/generic/tab/Tab';

export default function SessionList() {

    // TODO: replace count by future list length
    const tabsItems: TabItem[] = [
        {id: 0, label: 'In progress', count: 8},
        {id: 1, label: 'Not started', count: 2},
        {id: 2, label: 'Completed', count: 265},
    ];

    const { sprintSessionService } = useServices();
    const [sessionsList, setSessionList] = useState<SprintSession[]>([]);
    const [selectedTabId, setSelectedTabId] = useState<number>(0);
    


    const fetchSprintSessionList = async () => {
        const sessions: SprintSession[] = await sprintSessionService.getSprintSessionList();
        if(sessions) {
            setSessionList(sessions);
        }
    }

    const handleCreateSession = () => {
        console.log("Todo: Creation d une session")
    }

    const handleFilters = () => {
        console.log('Todo: filtrer les elements')
    }

    useEffect(() => {
        fetchSprintSessionList();
    }, [])

    return <div className='session-list-container'>
        <div className="header">
            <div className="page-title">Sprint Sessions</div>
            <div className="page-sub-title">Here is a list of your ongoing sprint sessions </div>
        </div>

        <div className="filter-bar">
            <Tab tabs={tabsItems} selectTabId={selectedTabId} setSelectedTabId={setSelectedTabId}/>
            <div className="filter-actions">
                <ActionButton label='Filters' icon={Tune} outlined={true} onClick={handleFilters}/>
                <ActionButton label='Create new session' icon={AddCircleOutline} onClick={handleCreateSession}/>
            </div>
        </div>
        <div className="session-list">
            {sessionsList.map(session => (
                <SprintSessionCard session={session} key={session.id}/>
            ))}
        </div>

    </div>
}