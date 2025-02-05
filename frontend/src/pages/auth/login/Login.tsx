import LoginForm from "../../../components/auth/login/LoginForm";
import './Login.css';

export default function Login() {

    return <div className="login-container flex p-4 bg-secondary-400 h-screen">
        <div className="w-2/3 bg-[url(assets/logo/bgLogin.jpg)] rounded-md">
            <div className="w-full h-full rounded-md flex justify-center items-center bg-text-primary/15">
                <div className="app-title">GoalFlow.io</div>
            </div>
        </div>
        <div className="w-1/3 flex justify-center items-center">
            <LoginForm/>
        </div>
    </div>


}