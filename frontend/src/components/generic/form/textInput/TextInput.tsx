import '../FormInput.css'
import './TextInput.css'

interface Props {
    placeholder?: string;
    label: string;
    subLabel?: string;
    isRequired: boolean;
    value: string;
    onChange: (value: string) => void;
}

export default function TextInput({placeholder, label, subLabel, isRequired, value, onChange}: Props) {

    // const [error, setError] = useState<string | null>(null);

    return <div className="text-input-container form-input">
        <div className="label">
            {label} {isRequired && <div className="is-required">*</div>}
        </div>
        {subLabel && <div className='sub-label'>{subLabel}</div>}
        <input 
            type="text" 
            value={value} 
            onChange={e => onChange(e.target.value)}  
            placeholder={placeholder ? placeholder : 'Enter a text...'}
        />
        {/* {error && <div className="errors">{error}</div>} */}
    </div>
}