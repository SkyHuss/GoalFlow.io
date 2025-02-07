import { SvgIconComponent } from "@mui/icons-material";

import './ProfileItem.css'
import { NavLink } from "react-router-dom";

interface Props {
    icon: SvgIconComponent
    label: string;
    link: string;
    onClick?: () => Promise<void>;
}

export default function ProfileItem({icon: Icon, label, link, onClick}: Props) {

    return <NavLink to={link} className="profile-item-container" onClick={onClick}>
        <Icon className="icon"/>
        {label}
    </NavLink>
}