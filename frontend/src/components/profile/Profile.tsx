import { useEffect, useRef, useState } from 'react'
import { ArrowDropDown, Diversity1, ExitToApp, Payments, Person, Settings } from '@mui/icons-material';
import { generateColorFromName } from '../../utils/color';
import { User } from '../../models/User'
import ProfileItem from './profileItem/ProfilItem';
import './Profile.css'


export default function Profile() {

    const dropdownRef = useRef<HTMLDivElement>(null);

    const generateInitials = (user: User): string => {
        return user.firstname[0] + user.lastname[0]
    }

    const fakeUser: User = {
        id: '1',
        firstname: 'Florian',
        lastname: 'Gonzales',
        email: 'fl.gonzales5790@gmail.com',
        profilPicture: '/assets/fake/pp.PNG',
        hasProfilPicture: false,
    }

    const [currentUser] = useState<User>(fakeUser);
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
            {currentUser.hasProfilPicture && currentUser.profilPicture ? 
                <img src={currentUser.profilPicture} /> :
                <div className="no-avatar" style={{backgroundColor: generateColorFromName(currentUser.firstname + currentUser.lastname)}}>
                    {generateInitials(currentUser)}
                </div>
            }
        </div>
        <div className="infos">
            <div className="fullname">{currentUser.firstname} {currentUser.lastname.toLocaleUpperCase()}</div>
            <div className="mail">{currentUser.email}</div>
        </div>
        <ArrowDropDown className='icon'/>

        {isProfilOpen && 
            <div className='profile-dropdown-container' ref={dropdownRef}>
                <ProfileItem icon={Person} label='Personal information' link='/personal-info'/>
                {/* TODO: implementer les autres pages suivantes */}
                <ProfileItem icon={Diversity1} label='Contacts' link='/'/>
                <ProfileItem icon={Payments} label='Subscription' link='/'/>
                <ProfileItem icon={Settings} label='Settings' link='/'/>
                <ProfileItem icon={ExitToApp} label='Disconnect' link='/'/>
            </div>
        }
    </div>
}