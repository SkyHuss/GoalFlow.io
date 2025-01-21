import { NavLink, useLocation } from 'react-router-dom';
import { NavigationItem } from '../../../sidebar/sidebarItem/SidebarItem';
import './BottomNavItem.css';

interface Props {
    item: NavigationItem;
}

export default function BottomNavItem({item}: Props) {

    const Icon = item.icon;
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    }

    return (
        <NavLink 
            to={item.path}
            className={`bottom-navbar-item-container ${isActive(item.path) && 'active'}`} 
        >
            <Icon className='icon'/>
        </NavLink>
    )
}