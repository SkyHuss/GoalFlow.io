import { HelpOutlined } from "@mui/icons-material";
import { FocusCardProps } from "../../../constants/focusMode/focusMenu";
import { Tooltip } from 'react-tooltip';

import './FocusCard.css'

export interface Props {
    card: FocusCardProps;
}

export default function FocusCard({ card }: Props) {
    return <div className="focus-card-container">
        <div className="hint">
            <HelpOutlined className="hint-icon" data-tooltip-id={card.title}/>
            <Tooltip id={card.title} place="top">
                <div style={{display: 'flex', flexDirection: 'column', width: 200}}>
                    {card.hint}
                </div>
            </Tooltip>
        </div>
        <div className="image-container">
            <img src={card.image} alt="card-img" className={card.effect}/>
        </div>
        <div className="name">
            {card.title}
        </div>
    </div>
}