import { LightMode, NotificationsOutlined } from '@mui/icons-material'
import NavButton from '../generic/navButton/NavButton'
import './Navbar.css'

export default function Navbar() {

    const toggleColorTheme = () => {
        //TODO: implement theme toggle
        console.log("Color theme toggled !")
    }

    
    const displayNotifications = () => {
        //TODO: implement notification pannel
        console.log("Open notification panel !");
    }

    return <div className="navbar-container">
        <div className="app-title">GoalFlow.io</div>
        <div className="nav-actions">
            <div className="nav-buttons">
                <NavButton icon={LightMode} onClick={toggleColorTheme}/>
                <NavButton icon={NotificationsOutlined} notification={3} onClick={displayNotifications}/>
            </div>
            <div className="profil">emplacement du profil</div>
        </div>
    </div>
}