import { SvgIconComponent } from '@mui/icons-material';
import './navButton.css'

interface Props {
    icon: SvgIconComponent;
    notification?: number;
    onClick?: () => void;
}

export default function NavButton ({icon: Icon, notification, onClick}: Props) {

    return <div className="nav-button-container" onClick={onClick}>
        {Icon && <Icon />}
        {notification && 
                <div className="notifications">{notification}</div>
        }
    </div>
}