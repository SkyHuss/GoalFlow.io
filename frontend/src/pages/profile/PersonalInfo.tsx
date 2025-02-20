import SubscriptionDetails from '../../components/subscription/details/SubscriptionDetails';
import { useUserStore } from '../../hooks/useUserStore'
import UserBanner from '../../components/profile/userBanner/UserBanner';
import UserForm from '../../components/profile/userForm/UserForm';
import './PersonalInfo.css'

export default function PersonalInfo() {

    const {user} = useUserStore();

    return <div className="personal-info-container">
        <UserBanner user={user!}/>
        <div className="content">
            <div className="form-container card">
                <div className="header">
                    Details
                </div>
                <UserForm user={user!}/>
            </div>
            <div className="stats-container card">
                <div className="header">
                    Statistics
                </div>
            </div>
            <div className="subscription-container card">
                <div className="header">
                    Subscription
                </div>
                <SubscriptionDetails />
            </div>
        </div>
    </div>
}