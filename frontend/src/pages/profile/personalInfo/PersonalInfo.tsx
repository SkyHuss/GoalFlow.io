import { useUserStore } from '../../../hooks/useUserStore'
import UserBanner from '../userBanner/UserBanner';
import './PersonalInfo.css'

export default function PersonalInfo() {

    const {user} = useUserStore();

    return <div className="personal-info-container">
        <UserBanner user={user!}/>
        <div className="content">
            <div className="form-container">
                
            </div>
        </div>
    </div>
}