import { Add, AddCircleOutline, Tune } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { SprintSession } from '../../models/SprintSession';
import './SessionList.css'
import SprintSessionCard from '../../components/sprintSession/card/SprintSessionCard';
import ActionButton from '../../components/generic/actionButton/ActionButton';
import Tab, { TabItem } from '../../components/generic/tab/Tab';
import Modal from '../../components/generic/modal/Modal';
import SprintSessionForm from '../../components/sprintSession/form/SprintSessionForm';
import { getSprintSessionList } from '../../services/api/sprintSessionService';

export default function SessionList() {

    // TODO: replace count by future list length
    const tabsItems: TabItem[] = [
        {id: 0, label: 'In progress', count: 8},
        {id: 1, label: 'Not started', count: 2},
        {id: 2, label: 'Completed', count: 265},
    ];

    const [sessionsList, setSessionList] = useState<SprintSession[]>([]);
    const [selectedTabId, setSelectedTabId] = useState<number>(0);
    const [isCreateSessionModalOpen, setIsCreateSessionModalOpen] = useState<boolean>(false);

    const addSession = (newSession: SprintSession) => {
        setSessionList((prevSessions) => [...prevSessions, newSession]);
    };

    const removeSession = (sessionId: number) => {
        setSessionList((prevSession) => prevSession.filter(session => session.id !== sessionId));
    };
    
    const fetchSprintSessionList = async () => {
        const sessions: SprintSession[] = await getSprintSessionList();
        if(sessions) {
            setSessionList(sessions);
        }
    }

    const handleCreateSession = () => {
        setIsCreateSessionModalOpen(true)
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
                <div className="create-button">
                    <ActionButton label='Create new session' icon={AddCircleOutline} onClick={handleCreateSession}/>
                </div>
            </div>
        </div>
        <div className="session-list">
            {sessionsList.map(session => (
                <SprintSessionCard session={session} key={session.id} removeSession={removeSession}/>
            ))}
        </div>

        {isCreateSessionModalOpen && (
            <Modal title='Create a sprint session'  closeModal={() => setIsCreateSessionModalOpen(false)}>
                <SprintSessionForm closeModal={() => setIsCreateSessionModalOpen(false)} addSession={addSession} />
            </Modal>
        )}

        <div className="mobile-create-button" onClick={handleCreateSession}>
            <Add />
        </div>
    </div>
}