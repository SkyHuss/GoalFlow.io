import { useUserStore } from '../../../hooks/useUserStore'
import './PersonalInfo.css'

export default function PersonalInfo() {

    const {user} = useUserStore();

    return <div className="personal-info-container">
        Personal info page: {user?.email}
    </div>
}