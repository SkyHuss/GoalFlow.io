import { useState } from 'react';
import '../FormInput.css'
import './PasswordInput.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Props {
    placeholder?: string;
    label: string;
    subLabel?: string;
    isRequired: boolean;
    value: string;
    onChange: (value: string) => void;
}

export default function PasswordInput({placeholder, label, subLabel, isRequired, value, onChange}: Props) {

    const [showPassword, setShowPassword] = useState<boolean>(false);

    return <div className="password-input-container form-input">
        <div className="label">
            {label} {isRequired && <div className="is-required">*</div>}
        </div>
        {subLabel && <div className='sub-label'>{subLabel}</div>}
        <div className="input-container">
            <input 
                type={showPassword ? 'text' : 'password'}
                value={value} 
                onChange={e => onChange(e.target.value)}  
                placeholder={placeholder ? placeholder : 'Enter a text...'}
            />
    
            <div className='show-password' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 
                    <VisibilityOff />:
                    <Visibility/>
                }
            </div>
        </div>

    </div>
}