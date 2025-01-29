
import { Delete, Edit, Event, MoreVert } from '@mui/icons-material';
import type { SprintSession } from "../../../models/SprintSession"
import './SprintSessionCard.css'
import { formatDate } from '../../../utils/date';
import { useEffect, useRef, useState } from 'react';
import api from '../../../services/api/api';

interface Props {
    session: SprintSession;
}

export default function SprintSessionCard ({session}: Props) {

    const [showDropdownMenu, setShowDropdownMenu] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const fakeMembers = [{id: 0, picture: '/assets/fake/fake1.jpg'},{id: 1, picture: '/assets/fake/fake2.jpg'},{id: 2, picture: '/assets/fake/fake3.jpg'}, {id: 3, picture: '/assets/fake/fake4.jpg'}, {id: 4, picture: '/assets/fake/fake5.jpg'},]
    

    const handleDropmenu = () => {
        setShowDropdownMenu(!showDropdownMenu);
    }

    const handleClickOutside = (event: MouseEvent) => {
        if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShowDropdownMenu(false);
        }
    }

    const handleSessionModify = () => {
        console.log("Modification de la session: ", session.name)
    }

    const handleSessionDelete = () => {
        console.log('Suppression de la session: ', session.name)
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, []);

    return <div className="sprint-session-container">
        <div className="card-actions" onClick={handleDropmenu}><MoreVert /></div>
        {showDropdownMenu && (
            <div className="dropdown-menu" ref={dropdownRef}>
                <div className="session-action" onClick={handleSessionModify}>
                    <Edit />
                    Modifier
                </div>
                <div className="session-action danger" onClick={handleSessionDelete}>
                    <Delete/>
                    Supprimer
                </div>
            </div>
        )}

        <div className="picture">
            {session.image && (
                <img src={import.meta.env.VITE_BASE_URL + session.image} alt="" />
            )}
        </div>
        <div className="name">
            {session.name}
        </div>
        <div className="description">
            {session.description}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae quae laborum atque, aliquam id quaerat necessitatibus magnam vel voluptatem veritatis odio laboriosam error rem ipsa a facilis alias, fuga praesentium?
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
    </div>
}