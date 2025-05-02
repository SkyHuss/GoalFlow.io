import { useEffect, useState } from 'react';
import TextInput from '../../generic/form/textInput/TextInput.tsx';
import { AppUser, useUserStore } from '../../../hooks/useUserStore.ts';
import './UserForm.css';
import ActionButton from '../../generic/actionButton/ActionButton.tsx';
import { ButtonType } from '../../../constants/buttons/buttonsTypes.ts';
import { Check, Close, Edit } from '@mui/icons-material';
import { updateUserName } from '../../../services/api/userService.ts';

interface Props {
    user: AppUser
}

interface UserProfileFormData {
    firstname: string, 
    lastname: string,
}

export default function UserForm({user}: Props) {
    const [isNewValues, setIsNewValues] = useState<boolean>(false);
    const [userFormData, setUserFormData] = useState<UserProfileFormData>({
        firstname: '',
        lastname: ''
    })

    const {fetchCurrentUser} = useUserStore();

    const handleInputChange = (key: string, value: string) => {
        setUserFormData((prev) => ({...prev, [key]: value})) ;
    }

    const handlePasswordChange = () => {
        console.log("todo: implement password change")
    }

    const handleEmailChange = () => {
        console.log("todo: implement email change")
    }

    const handleFormSubmit = async () => {
        const firstname = userFormData.firstname !== '' ? userFormData.firstname : user.name.split(' ')[0];
        const lastname = userFormData.lastname !== '' ? userFormData.lastname : user.name.split(' ')[1];
        await updateUserName(firstname + ' ' + lastname);
        await fetchCurrentUser();
    }

    const handleFormReset = () => {
        setUserFormData({
            firstname: '',
            lastname: ''
        })
    }

    useEffect(() => {
        if(userFormData.firstname !== '' || userFormData.lastname !== ''){
            setIsNewValues(true);
        } else {
            setIsNewValues(false);
        }
    }, [userFormData.firstname, userFormData.lastname])

    return <div className="user-form-container">
        <div className="form">
            <TextInput 
                label='Firstname' 
                placeholder={user.name.split(' ')[0]}
                value={userFormData.firstname} 
                onChange={(newValue: string) => handleInputChange('firstname', newValue)}
                isRequired={false}
            />
            <TextInput 
                label='Lastname' 
                placeholder={user.name.split(' ')[1]}
                value={userFormData.lastname} 
                onChange={(newValue: string) => handleInputChange('lastname', newValue)}
                isRequired={false}
            />
            <div className="email-change">
                <div className="label">Email</div>
                <ActionButton icon={Edit} label='Change email here' outlined fullWidth onClick={handleEmailChange}/>
            </div>
            <div className="password-change">
                <div className="label">Password</div>
                <ActionButton icon={Edit} label='Change password here' outlined fullWidth onClick={handlePasswordChange}/>
            </div>
        </div>
        <div className="form-actions">
            <ActionButton type={isNewValues ? ButtonType.Success : ButtonType.Disabled} icon={Check} onClick={handleFormSubmit} label='Save'/>
            <ActionButton type={ButtonType.Secondary} icon={Close} onClick={handleFormReset} label='Cancel'/>
        </div>
    </div>
}