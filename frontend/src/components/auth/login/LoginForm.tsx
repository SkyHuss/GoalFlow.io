import { useState } from "react";
import TextInput from "../../generic/form/textInput/TextInput";
import PasswordInput from "../../generic/form/password/PasswordInput";
import ActionButton from "../../generic/actionButton/ActionButton";
import './LoginForm.css'
import { authClient } from "../../../utils/auth-client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LoginFormData } from "../../../services/api/authService";
import { globalUserUpdate } from "../../../hooks/useUserStore";

export default function LoginForm() {

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState<LoginFormData>({
        email: '',
        password: ''
    })

    const handleInputChange = (key: string, value: string) => {
        setCredentials((prev) => ({...prev, [key]: value})) ;
    }

    const navigateToSignUp = () => {
        navigate('/sign-up')
    }

    const handleLogIn = async () => {
        const response = await authClient.signIn.email({
            email: credentials.email,
            password: credentials.password
        })

        if(response.error) {
            toast.error(`Error: `+ response.error.message);
            return;
        }

        if(response.data) {
            globalUserUpdate(response.data.user);
            navigate('/');
        }
    }

    return <div className="login-form-container">
        <div className="header">
            <div className="title">Sign in</div>
            <div className="sub-header">Don't have an account yet? Create an account <span onClick={navigateToSignUp}>here</span></div>
        </div>

        <div className="form-content">
            <TextInput 
                isRequired={true}
                value={credentials.email}
                onChange={(newValue: string) => handleInputChange('email', newValue)}
                placeholder='Enter your email...'
                label='Email'
            />
            <PasswordInput 
                isRequired={true}
                value={credentials.password}
                onChange={(newValue: string) => handleInputChange('password', newValue)}
                placeholder='Enter your password...'
                label='Password'
            />
            <div className="form-actions">
                <ActionButton 
                    label="Sign in"
                    onClick={handleLogIn}
                    fullWidth={true}
                />
            </div>
        </div>

        <div className="separator">
            <div className="separator-label">or</div>
        </div>

        <div className="sso-login-container">
            <div className="label">login in with:</div>
            <div className="items">
                <div className="sso-login-item" onClick={() => {console.log("Google sso...")}}>
                    <img src="/assets/logo/google.png" alt="" />
                </div>
                <div className="sso-login-item" onClick={() => {console.log("Google sso...")}}>
                    <img src="/assets/logo/fb.png" alt="" />
                </div>
                <div className="sso-login-item" onClick={() => {console.log("Google sso...")}}>
                    <img src="/assets/logo/discord.png" alt="" />
                </div>
            </div>
        </div>

    </div>
}