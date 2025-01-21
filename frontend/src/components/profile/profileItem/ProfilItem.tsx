import { SvgIconComponent } from "@mui/icons-material";

import './ProfileItem.css'

interface Props {
    icon: SvgIconComponent
    label: string;
    onClick: () => void;
}

export default function ProfileItem({icon: Icon, label, onClick}: Props) {

    return <div className="profile-item-container" onClick={onClick}>
        <Icon className="icon"/>
        {label}
    </div>
}