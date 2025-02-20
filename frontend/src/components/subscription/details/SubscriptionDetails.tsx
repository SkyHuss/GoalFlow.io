import { DateTime } from 'luxon';
import { useState } from 'react'
import './SubscriptionDetails.css'
import { SubscriptionPlan, UserPlan } from '../../../models/Subscription';
import { displayDate } from '../../../utils/date';
import { Close, Edit } from '@mui/icons-material';
import ActionButton from '../../generic/actionButton/ActionButton';

export default function SubscriptionDetails() {

    const fakeUserPlan: UserPlan = {type: SubscriptionPlan.Premium, startDate: DateTime.now(), billingDate: DateTime.now(), status: true}
    const fakeMissingFeature = ['Unlimited sprint sessions creations', 'More than 10 members per session', 'Team chat', 'All of my love']
    const [userPlan] = useState<UserPlan>(fakeUserPlan);

    const handleSubscriptionChange = () => {
        console.log("Todo: implement subscription change")
    }


    return <div className="subscription-details-container">
        <div className="summary">
            <div className="row">
                <div className="item">Plan: <span>{userPlan.type}</span></div>
                <div className="item">Start date: <span>{displayDate(userPlan.startDate.toJSDate())}</span></div>
            </div>
            <div className="row">
                <div className="item">Status: <span>{userPlan.status ? 'Active' : 'Expired'}</span></div>
                <div className="item">Billing date: <span>{displayDate(userPlan.startDate.toJSDate())}</span></div>
            </div>
        </div>

        <div className="missing-features">
            <div className="sub-header">Missing features: </div>
            <div className="list">
                {fakeMissingFeature.map(item => (
                    <div className="item"><Close />{item}</div>
                ))}
            </div>
        </div>

        <div className="change-subscription">
            <ActionButton label='Change subscription plan' outlined icon={Edit} onClick={handleSubscriptionChange} fullWidth/>
        </div>
    </div>
}