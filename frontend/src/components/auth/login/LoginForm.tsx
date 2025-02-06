import { useState } from "react";
import TextInput from "../../generic/form/textInput/TextInput";
import PasswordInput from "../../generic/form/password/PasswordInput";
import ActionButton from "../../generic/actionButton/ActionButton";
import './LoginForm.css'

export interface LoginFormData {
    email: string;
    password: string;
}

export default function LoginForm() {

    const [credentials, setCredentials] = useState<LoginFormData>({
        email: '',
        password: ''
    })

    const handleInputChange = (key: string, value: string) => {
        setCredentials((prev) => ({...prev, [key]: value})) ;
    }

    const handleLogIn = () => {
        console.log("TODO: implement log in with: ", credentials)
    }

    return <div className="login-form-container">
        <div className="header">
            <div className="title">Sign in</div>
            <div className="sub-header">Don't have an account yet? Create an account <span>here</span></div>
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