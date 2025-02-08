
import { Delete, Edit, Event, MoreVert, NoPhotography } from '@mui/icons-material';
import type { SprintSession } from "../../../models/SprintSession"
import './SprintSessionCard.css'
import { formatDate } from '../../../utils/date';
import { useEffect, useRef, useState } from 'react';
import { deleteSprintSession, putSprintSession } from '../../../services/api/sprintSessionService';
import ConfirmDialog from '../../generic/confirmDialog/ConfirmDialog';
import SprintSessionForm, { SprintSessionFormData } from '../form/SprintSessionForm';
import Modal from '../../generic/modal/Modal';

interface Props {
    session: SprintSession;
    removeSession: (sessionId: string) => void; 
    updateSession: (updatedSession: SprintSession) => void;
}

export default function SprintSessionCard ({session, removeSession, updateSession}: Props) {

    const [showDropdownMenu, setShowDropdownMenu] = useState<boolean>(false);
    const [isModifyModalOpen, setIsModifyModalOpen] = useState<boolean>(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const fakeMembers = [{id: 0, picture: '/assets/fake/fake1.jpg'},{id: 1, picture: '/assets/fake/fake2.jpg'},{id: 2, picture: '/assets/fake/fake3.jpg'}, {id: 3, picture: '/assets/fake/fake4.jpg'}, {id: 4, picture: '/assets/fake/fake5.jpg'},]
    
    const modifySession = async (formData: SprintSessionFormData) => {
       const modifiedSession: SprintSession = await putSprintSession(formData);
       setIsModifyModalOpen(false);
       updateSession(modifiedSession);
    }

    const handleDropmenu = () => {
        setShowDropdownMenu(!showDropdownMenu);
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (isConfirmDialogOpen) return;

        if (
            dropdownRef.current && !dropdownRef.current.contains(event.target as Node)
        ) {
            setShowDropdownMenu(false); 
        }
    };

    const handleSessionModify = () => {
        setIsModifyModalOpen(true)
    }

    const handleDialogCancel = () => {
        setIsConfirmDialogOpen(false)
        setShowDropdownMenu(false)
    }

    const handleSessionDelete = async () => {
        await deleteSprintSession(session.id);        
        removeSession(session.id);
        setIsConfirmDialogOpen(false);
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isConfirmDialogOpen]);

    return <div className="sprint-session-container">
        <div className="card-actions" onClick={handleDropmenu}><MoreVert /></div>
        {showDropdownMenu && (
            <div className="dropdown-menu" ref={dropdownRef}>
                <div className="session-action" onClick={handleSessionModify}>
                    <Edit />
                    Modifier
                </div>
                <div className="session-action danger" onClick={() => setIsConfirmDialogOpen(true)}>
                    <Delete/>
                    Supprimer
                </div>
                {isConfirmDialogOpen && 
                    <ConfirmDialog 
                        messageTitle='Are you sure ?'
                        message={`You are about to delete an sprint session: ${session.name}`}
                        onCancel={handleDialogCancel}
                        onConfirm={handleSessionDelete}
                    />
                }
            </div>
        )}

        <div className="picture">
            {session.image && (
                <img src={import.meta.env.VITE_BASE_URL + session.image} alt="" />
            )}
            {!session.image && (
                <div className="no-image">
                    <NoPhotography />
                </div>
            )}
        </div>
        <div className="name">
            {session.name}
        </div>
        <div className="description">
            {session.description}
        </div>
        <div className="progress-container">
            <div className="progress-bar">
                <div className="bar" style={{width: '95%'}}></div>
            </div>
            <div className="percentage">95,6%</div>
        </div>

        <div className="footer">
            <div className="members">
                {fakeMembers.map(member => (
                    <img className='member-picture' src={member.picture} alt="" key={'picture' + member.id}/>
                ))}
                {fakeMembers.length > 4 &&
                    <div className='overflow-picture'>
                        +{fakeMembers.length}
                    </div>
                }
            </div>
            <div className="due-date"><Event />{formatDate(session.dueDate)}</div>
        </div>

        {isModifyModalOpen && 
            <Modal closeModal={() => setIsModifyModalOpen(false)} title='Modify a sprint session'>
                <SprintSessionForm closeModal={() => setIsModifyModalOpen(false)} handleFormSubmit={modifySession} session={session}/>
            </Modal>
        }
    </div>
}