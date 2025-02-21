import { PhotoCamera, Event, GraphicEq, Edit, Check, Close } from "@mui/icons-material";
import ActionButton from "../../generic/actionButton/ActionButton";
import { AppUser, useUserStore } from "../../../hooks/useUserStore";
import { displayDate } from "../../../utils/date";
import './UserBanner.css'
import { generateColorFromName } from "../../../utils/color";
import { generateInitials } from "../../../utils/strings";
import { useState } from "react";
import Modal from "../../generic/modal/Modal";
import FileInput from "../../generic/form/fileInput/FileInput";
import { resizeAndCropImage } from "../../../utils/images";
import { updateProfilPicture } from "../../../services/api/userService";
import { ButtonType } from "../../../constants/buttons/buttonsTypes";

interface Props {
    user: AppUser;
}

export default function UserBanner({user}: Props) {

    const [isUpdateImageOpen, setIsUpdateImageOpen] = useState<boolean>(false);
    const [userImage, setUserImage] = useState<string | null | undefined>(user.image)

    const {fetchCurrentUser} = useUserStore();

    const handleBgUpdate = () => {
        console.log("updating background for: ", user.name)
    }

    const handleProfilePicture = async (file: File | null) => {
        let image = null;
        if(file){
            image = await resizeAndCropImage(file, 300, 300);
        } 
        setUserImage(image);
    }

    const uploadProfilePicture = async () => {
        await updateProfilPicture(userImage);
        await fetchCurrentUser();
    }

    const closeProfilPictureModal = () => {
        setIsUpdateImageOpen(false);
        setUserImage(user.image);
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

            <div className="update-profile-picture-button" onClick={() => setIsUpdateImageOpen(true)}>
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

        
        {isUpdateImageOpen &&
            <Modal closeModal={closeProfilPictureModal} title='Update your profile picture'>
                <div className="profile-picture-modal-container">
                    <FileInput 
                        label="Select or drag and drop a new profile picture"
                        isRequired={true}
                        file={userImage}
                        setFile={(file: File | null) => handleProfilePicture(file)}
                        placeholder="No image..."
                    />
                    <div className="modal-actions">
                        <ActionButton 
                            label="Upload" 
                            icon={Check}
                            type={userImage !== user.image ? ButtonType.Primary : ButtonType.Disabled}
                            onClick={uploadProfilePicture}
                        />
                        <ActionButton 
                            label="Cancel"
                            icon={Close}
                            outlined
                            onClick={closeProfilPictureModal}
                        />
                    </div>
                </div>
            </Modal>
        }
    </div>
}