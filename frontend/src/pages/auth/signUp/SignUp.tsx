import { ToastContainer } from 'react-toastify'
import SignUpForm from '../../../components/auth/signUp/SignUpForm'
import './SignUp.css'

export default function SignUp() {
    return <div className="sign-up-container">
    <div className="sign-up-bg-image">
        <div className="app-title-wrapper">
            <div className="app-title">GoalFlow.io</div>
        </div>
    </div>
    <div className="sign-up-content">
        <div className="mobile app-title">GoalFlow.io</div>
        <div className="sign-up-wrapper">
            <SignUpForm />
        </div>
    </div>
    <ToastContainer position='bottom-right' limit={4} closeOnClick={true} style={{ zIndex: 10000 }} theme="dark"/>
</div>
}