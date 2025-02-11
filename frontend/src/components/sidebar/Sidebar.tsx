import { useState } from 'react';
import './Sidebar.css';
import { ExpandCircleDownOutlined, Menu } from '@mui/icons-material';

import { sidebarItems } from '../../constants/menu/navigation';
import SidebarItem from './sidebarItem/SidebarItem';
import { useUserStore } from '../../hooks/useUserStore';


export default function Sidebar() {

    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const {user} = useUserStore();

    const collapseSidebar = () => {
        setIsCollapsed(!isCollapsed);
    }

    return <div className={`sidebar-container ${isCollapsed && 'collapsed'}`}>
        <div className="collapse-button" onClick={collapseSidebar}>
            { isCollapsed ? <Menu/> : <ExpandCircleDownOutlined style={{rotate: '90deg'}}/> }
        </div>

        <div className="global-menu-container">                
            {sidebarItems
                .filter(item => !(item.role === 'admin' && user?.role !== 'admin'))
                .map(item => (
                <SidebarItem key={item.label} item={item} isCollapsed={isCollapsed} />
            ))}
        </div>

        <div className="footer">
            {!isCollapsed && 
                <>© 2025 - GONZALES Florian <br /> All rights reserved</>
            }

        </div>
    </div>
}