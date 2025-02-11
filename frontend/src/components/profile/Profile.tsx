import { useEffect, useRef, useState } from 'react'
import { ArrowDropDown, Autorenew, Diversity1, ExitToApp, Loop, NoPhotography, Payments, Person, Settings } from '@mui/icons-material';
import { generateColorFromName } from '../../utils/color';
import ProfileItem from './profileItem/ProfilItem';
import './Profile.css'
import { signOut } from '../../services/api/authService';
import { useUserStore } from '../../store/userStore';

export default function Profile() {

    const dropdownRef = useRef<HTMLDivElement>(null);

    const {user, loading, fetchCurrentUser, clearUser} = useUserStore();

    useEffect(() => {
        fetchCurrentUser();
        
        return () => {
            clearUser();
        }
    }, [fetchCurrentUser, clearUser])

    const generateInitials = (fullname: string): string => {
        const names = fullname.split(' ');
        return names[0][0] + names[1][0]
    }

    const [isProfilOpen, setIsProfileOpen] = useState<boolean>(false)

    const openProfileDropdown = () => {
        setIsProfileOpen(true);
    }

    const handleDropdownClickOutside = (event: MouseEvent) => {
        if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsProfileOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleDropdownClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleDropdownClickOutside)
        };
    }, [])

    return <div className="profile-container" onClick={openProfileDropdown}>
        <div className="avatar">
            {user && user.image && 
                <img src={user.image} />
            }
            {user && !user.image &&
                <div className="no-avatar" style={{backgroundColor: generateColorFromName(user.name)}}>
                    {generateInitials(user.name)}
                </div>
            }
            {loading && !user && 
                <NoPhotography />
            }
        </div>
        {!loading && user && 
            <div className="infos">
                <div className="fullname">{user.name.split(' ')[0]} {user.name.split(' ')[1].toLocaleUpperCase()}</div>
                <div className="mail">{user.email}</div>
            </div>
        }

        {loading && 
            <div className="animate-spin"><Autorenew/></div>
        }
        <ArrowDropDown className='icon'/>

        {isProfilOpen && 
            <div className='profile-dropdown-container' ref={dropdownRef}>
                <ProfileItem icon={Person} label='Personal information' link='/personal-info'/>
                {/* TODO: implementer les autres pages suivantes */}
                <ProfileItem icon={Diversity1} label='Contacts' link='/'/>
                <ProfileItem icon={Payments} label='Subscription' link='/'/>
                <ProfileItem icon={Settings} label='Settings' link='/'/>
                <ProfileItem icon={ExitToApp} label='Disconnect' link='/login' onClick={() => signOut()}/>
            </div>
        }
    </div>
}