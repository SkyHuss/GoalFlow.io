import { useEffect, useRef, useState } from 'react'
import { ArrowDropDown, Diversity1, ExitToApp, Payments, Person, Settings } from '@mui/icons-material';
import { generateColorFromName } from '../../utils/color';
import ProfileItem from './profileItem/ProfilItem';
import './Profile.css'
import { authClient } from '../../utils/auth-client';
import { User } from 'better-auth';
import { signOut } from '../../services/api/authService';
import { toast } from 'react-toastify';

export default function Profile() {

    const dropdownRef = useRef<HTMLDivElement>(null);

    const generateInitials = (fullname: string): string => {
        const names = fullname.split(' ');
        return names[0][0] + names[1][0]
    }

    const fakeUser: User = {
        id: 'fakeid',
        email: 'fakeEmail@gmail.com',
        name: 'Jean-Michel Fake',
        emailVerified: false, 
        createdAt: new Date(),
        updatedAt: new Date()
    }

    const [connectedUser, setConnectedUser] = useState<User | null>(fakeUser);
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
        const fetchUser = async () => {
            try {
                const session = await authClient.getSession();

                if (session?.data?.user) {
                    setConnectedUser(session.data.user);
                }
            } catch {
                toast.error("Error : Can't get the user session");
            }
        };
    
        fetchUser();
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleDropdownClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleDropdownClickOutside)
        };
    }, [])

    return <div className="profile-container" onClick={openProfileDropdown}>
        <div className="avatar">

            {connectedUser && connectedUser.image && 
                <img src={connectedUser.image} />

            }

            {connectedUser && !connectedUser.image &&
                <div className="no-avatar" style={{backgroundColor: generateColorFromName(connectedUser.name)}}>
                    {generateInitials(connectedUser.name)}
                </div>
            }
        </div>
        {connectedUser && 
            <div className="infos">
                <div className="fullname">{connectedUser.name.split(' ')[0]} {connectedUser.name.split(' ')[1].toLocaleUpperCase()}</div>
                <div className="mail">{connectedUser.email}</div>
            </div>
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