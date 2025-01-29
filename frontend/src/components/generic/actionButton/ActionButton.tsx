import { SvgIconComponent } from '@mui/icons-material';

import './ActionButton.css';

interface Props {
    icon?: SvgIconComponent;
    label: string;
    type?: string; // "secondary" or "success" or "danger" or "info"
    outlined?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}

export default function ActionButton({
    icon: Icon,
    label = 'Action Button',
    type,
    outlined = false,
    disabled = false,
    onClick = () => {},
}: Props) {
    return (
        <div
            className={`action-button ${type ? type : ''} ${outlined ? 'outlined': ''}`}
            onClick={disabled ? ()=> {}: onClick}
        >
            {Icon && <Icon data-testid="svg-icon" />}
            <div className="action-title">{label}</div>
        </div>
    );
}
