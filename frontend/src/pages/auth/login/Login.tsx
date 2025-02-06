import LoginForm from "../../../components/auth/login/LoginForm";
import './Login.css';

export default function Login() {

    return <div className="login-container">
    <div className="login-bg-image">
        <div className="app-title-wrapper">
            <div className="app-title">GoalFlow.io</div>
        </div>
    </div>
    <div className="login-content">
        <div className="mobile app-title">GoalFlow.io</div>
        <div className="login-wrapper">
            <LoginForm />
        </div>
    </div>
</div>
}