import { useState } from 'react'
import { User } from '../../models/User'
import './Profile.css'
import { ArrowDropDown } from '@mui/icons-material';
import { generateColorFromName } from '../../utils/color';

export default function Profile() {

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

    const openProfile = () => {
        console.log("Open profil !");
        setIsProfileOpen(true);
    }

    return <div className="profile-container" onClick={openProfile}>
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

        {/* Todo: implement profil dropdown*/}
    </div>
}