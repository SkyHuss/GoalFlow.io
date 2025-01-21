import { SvgIconComponent } from '@mui/icons-material';
import { NavLink, useLocation } from 'react-router-dom';

import './SidebarItem.css'

export interface SidebarItemType {
    label: string,
    icon: SvgIconComponent,
    path: string,
}

interface Props {
    item: SidebarItemType,
    isCollapsed: boolean,
}


export default function SidebarItem({item, isCollapsed}: Props) {

    const Icon = item.icon;
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    }

    return (
        <NavLink 
            to={item.path}
            className={`sidebar-item-container ${isActive(item.path) && 'active'}`} 
            style={{justifyContent: `${isCollapsed ? 'center' : 'start'}`}}
        >
            <Icon className='icon'/>
            {!isCollapsed && 
                <div className="item-content">
                    <div className="label">{item.label}</div>
                </div>
            }
        </NavLink>
    )
}