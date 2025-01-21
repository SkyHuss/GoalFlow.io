import { useState } from 'react'
import './MobileSidebar.css'
import { ExpandCircleDownOutlined } from '@mui/icons-material';
import Profile from '../../profile/Profile';

export default function MobileSidebar() {

    const [isOpen, setIsOpen] = useState<boolean>(true);

    return <div className={`mobile-sidebar-container ${isOpen && 'open'}`}>
        {!isOpen && 
            <div className="dragger" onClick={() => setIsOpen(true)}></div>
        }

        <div className="header">
            <div className="app-title">GoalFlow.io</div>
            <div className="close-sidebar" onClick={() => setIsOpen(false)}>
                <ExpandCircleDownOutlined style={{rotate: '90deg'}}/>
            </div>
        </div>

        <div className="session-menu">
            {/* TODO: remplacer par le nom de la session en cours */}
            <div className="session-name">Session name</div>
        </div>

        <div className="mobile-profile">
            <Profile />
        </div>
    </div>
}