import { SvgIconComponent } from '@mui/icons-material';

import './ActionButton.css';

interface Props {
    icon?: SvgIconComponent;
    label: string;
    type?: string; // "secondary" or "success" or "danger" or "info"
    outlined?: boolean;
    onClick: () => void;
}

export default function ActionButton({
    icon: Icon,
    label,
    type,
    outlined = false,
    onClick,
}: Props) {
    return (
        <div
            className={`action-button ${type ? type : ''} ${outlined ? 'outlined': ''}`}
            onClick={onClick}
        >
            {Icon && <Icon data-testid="svg-icon" />}
            <div className="action-title">{label}</div>
        </div>
    );
}
