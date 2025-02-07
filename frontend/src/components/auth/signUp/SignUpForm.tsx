import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../generic/actionButton/ActionButton";
import './SignUpForm.css';
import TextInput from "../../generic/form/textInput/TextInput";
import PasswordInput from "../../generic/form/password/PasswordInput";
import FileInput from "../../generic/form/fileInput/FileInput";
import { resizeAndCropImage } from "../../../utils/images";
import { signUp, SignUpFormData } from "../../../services/api/authService";
import { toast } from "react-toastify";


export default function SignUpForm() {

    
    const navigate = useNavigate();


    const [credentials, setCredentials] = useState<SignUpFormData>({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        profilePicture: null
    });



    const handleInputChange = (key: string, value: string | File | null) => {
        setCredentials((prev) => ({...prev, [key]: value})) ;
    }

    const handleProfilePicture = async (file: File | null) => {
        if(file){
            const resizedImage = await resizeAndCropImage(file, 300, 300);
            setCredentials((prev) => ({...prev, profilePicture: resizedImage}))
        }
    }

    const handleSignUp = async () => {

        const response = await signUp(credentials);

        if(response.error) {
            toast.error(`Error: `+ response.error.message);
            return;        
        }

        if(response.data) {
            toast.success(`User: ${credentials.email} created with success`)
            navigate('/');
        }

    }

    const navigateToSignIn = () => {
        navigate('/login')
    }

    return <div className="sign-up-form-container">
                <div className="header">
            <div className="title">Sign Up</div>
            <div className="sub-header">Already have an account? Login to an account <span onClick={navigateToSignIn}>here</span></div>
        </div>

        <div className="form-content">
            <TextInput 
                isRequired={true}
                value={credentials.email}
                onChange={(newValue: string) => handleInputChange('email', newValue)}
                placeholder='Enter your email...'
                label='Email'
            />

            <div className="form-row">
                <TextInput 
                    isRequired={true}
                    value={credentials.firstname}
                    onChange={(newValue: string) => handleInputChange('firstname', newValue)}
                    placeholder='Enter your firstname...'
                    label='Firstname'
                />

                <TextInput 
                    isRequired={true}
                    value={credentials.lastname}
                    onChange={(newValue: string) => handleInputChange('lastname', newValue)}
                    placeholder='Enter your lastname...'
                    label='Lastname'
                />
            </div>

            <PasswordInput 
                isRequired={true}
                value={credentials.password}
                onChange={(newValue: string) => handleInputChange('password', newValue)}
                placeholder='Enter your password...'
                label='Password'
            />

            <FileInput 
                label='Profil picture'
                isRequired={true}
                file={credentials.profilePicture}
                setFile={(file: File | null) => handleProfilePicture(file)}
                placeholder='Click here or drop a picture (SVG, PNG, JPG, JPEG or GIF)'
            />

            <div className="form-actions">
                <ActionButton 
                    label="Create account"
                    onClick={handleSignUp}
                    fullWidth={true}
                />
            </div>
        </div>
    </div>
}