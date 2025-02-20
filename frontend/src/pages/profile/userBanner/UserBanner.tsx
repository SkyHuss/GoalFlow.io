import { PhotoCamera, Event, GraphicEq, Edit } from "@mui/icons-material";
import ActionButton from "../../../components/generic/actionButton/ActionButton";
import { AppUser } from "../../../hooks/useUserStore";
import { displayDate } from "../../../utils/date";
import './UserBanner.css'
import { generateColorFromName } from "../../../utils/color";
import { generateInitials } from "../../../utils/strings";

interface Props {
    user: AppUser;
}

export default function UserBanner({user}: Props) {

    const handleBgUpdate = () => {
        console.log("updating background for: ", user.name)
    }

    const handleProfilePictureUpdate = () => {
        console.log("todo: implement profile picture update")
    }

    return <div className="user-banner-container">
        <div className="user-background">
            <img src="/assets/background/profileBg.jpg" alt="" />
            <div className="update-bg-button">
                <ActionButton type="info" onClick={handleBgUpdate} label="Update cover" icon={PhotoCamera}/>
            </div>
        </div>
        <div className="profile-picture-container">
            {user.image ? 
                <img src={user.image} alt="" /> :                 
                <div className="no-avatar" style={{backgroundColor: generateColorFromName(user.name)}}>
                    {generateInitials(user.name)}
                </div>}

            <div className="update-profile-picture-button" onClick={handleProfilePictureUpdate}>
                <Edit />
            </div>

        </div>
        <div className="user-infos">
            <div className="name">{user.name}</div>
            <div className="dates">
                <div className="item">
                    <Event /><div className="label">Member since {displayDate(user.createdAt)}</div>
                </div>
                <div className="item">
                    <GraphicEq /><div className="label">Last activity {displayDate(user.createdAt)}</div>
                </div>
            </div>
            <div className="achievements">
                <div className="achievement-item">
                    <img src="/assets/achivements/alarm.png" alt=""/>
                </div>
                <div className="achievement-item">
                    <img src="/assets/achivements/friends.png" alt=""/>
                </div>
                <div className="achievement-item">
                    <img src="/assets/achivements/medal-gold.png" alt=""/>
                </div>                
                <div className="achievement-item">
                    <img src="/assets/achivements/sprinter.png" alt=""/>
                </div>      
                <div className="achievement-item">
                    <img src="/assets/achivements/hero.png" alt=""/>
                </div>               
            </div>
        </div>     
    </div>
}