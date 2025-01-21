import BottomNavItem from './bottomNavItem/BottomNavItem';
import {bottomNavItems} from '../../../constants/menu/navigation';

import './BottomNavBar.css';


export default function BottomNavBar() {
    return <div className='bottom-navbar-container'>
        {bottomNavItems.map(item => (
            <BottomNavItem key={item.path} item={item}/>
        ))}
    </div>
}