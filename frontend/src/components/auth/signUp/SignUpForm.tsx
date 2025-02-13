import ActionButton from "../../generic/actionButton/ActionButton";
import './SignUpForm.css';
import TextInput from "../../generic/form/textInput/TextInput";
import PasswordInput from "../../generic/form/password/PasswordInput";
import FileInput from "../../generic/form/fileInput/FileInput";
import { resizeAndCropImage } from "../../../utils/images";
import { SignUpFormData } from "../../../services/api/authService";

interface Props {
    credentials: SignUpFormData;
    displayImage?: boolean;
    setCredentials: React.Dispatch<React.SetStateAction<SignUpFormData>>;
    handleSignUp: () => void;
}

export default function SignUpForm({credentials, displayImage = true, setCredentials, handleSignUp}: Props) {

    const handleInputChange = (key: string, value: string | File | null) => {
        setCredentials((prev: SignUpFormData) => ({...prev, [key]: value})) ;
    }

    const handleProfilePicture = async (file: File | null) => {
        if(file){
            const resizedImage = await resizeAndCropImage(file, 300, 300);
            setCredentials((prev: SignUpFormData) => ({...prev, profilePicture: resizedImage}))
        }
    }

    return <div className="sign-up-form-container">
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

            {displayImage && 
                <FileInput 
                    label='Profil picture'
                    isRequired={true}
                    file={credentials.profilePicture}
                    setFile={(file: File | null) => handleProfilePicture(file)}
                    placeholder='Click here or drop a picture (SVG, PNG, JPG, JPEG or GIF)'
                />
            }

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