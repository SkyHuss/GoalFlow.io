import { toast, ToastContainer } from 'react-toastify'
import SignUpForm from '../../../components/auth/signUp/SignUpForm'
import './SignUp.css'
import { useNavigate } from 'react-router-dom'
import { signUp, SignUpFormData } from '../../../services/api/authService';
import { useState } from 'react';
import { defaultUserCredentials } from '../../../constants/initialisation/initialisation';

export default function SignUp() {

    const navigate = useNavigate();

    const navigateToSignIn = () => {
        navigate('/login')
    }

    const [credentials, setCredentials] = useState<SignUpFormData>(defaultUserCredentials);

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

    };

    return <div className="sign-up-container">
    <div className="sign-up-bg-image">
        <div className="app-title-wrapper">
            <div className="app-title">GoalFlow.io</div>
        </div>
    </div>
    <div className="sign-up-content">
        <div className="mobile app-title">GoalFlow.io</div>
        <div className="sign-up-wrapper">
            <div className="header">
                <div className="title">Sign Up</div>
                <div className="sub-header">Already have an account? Login to an account <span onClick={navigateToSignIn}>here</span></div>
            </div>
            <SignUpForm handleSignUp={handleSignUp} credentials={credentials} setCredentials={setCredentials}/>
        </div>
    </div>
    <ToastContainer position='bottom-right' limit={4} closeOnClick={true} style={{ zIndex: 10000 }} theme="dark"/>
</div>
}