import { SvgIconComponent } from "@mui/icons-material";

import './ProfileItem.css'
import { NavLink } from "react-router-dom";

interface Props {
    icon: SvgIconComponent
    label: string;
    link: string;
}

export default function ProfileItem({icon: Icon, label, link}: Props) {

    return <NavLink to={link} className="profile-item-container">
        <Icon className="icon"/>
        {label}
    </NavLink>
}