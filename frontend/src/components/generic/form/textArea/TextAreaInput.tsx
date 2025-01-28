import '../FormInput.css'
import './TextAreaInput.css'

interface Props {
    placeholder?: string;
    label: string;
    subLabel?: string;
    isRequired: boolean;
    value: string;
    onChange: (value: string) => void;
}

export default function TextAreaInput({placeholder, label, subLabel, isRequired, value, onChange}: Props) {

    // const [error, setError] = useState<string | null>(null);

    return <div className="textarea-input-container form-input">
        <div className="label">
            {label} {isRequired && <div className="is-required">*</div>}
        </div>
        {subLabel && <div className='sub-label'>{subLabel}</div>}
        <textarea 
            value={value} 
            onChange={e => onChange(e.target.value)}  
            placeholder={placeholder ? placeholder : 'Enter a long text...'}
        />
        {/* {error && <div className="errors">{error}</div>} */}
    </div>
}