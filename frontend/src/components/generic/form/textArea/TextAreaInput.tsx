import { TextAreaInputType } from '../../../../constants/form/formTypes'
import '../FormInput.css'
import './TextAreaInput.css'

interface Props {
    input: TextAreaInputType;
}

export default function TextAreaInput({input}: Props) {

    // const [error, setError] = useState<string | null>(null);

    return <div className="textarea-input-container form-input">
        <div className="label">
            {input.label} {input.isRequired && <div className="is-required">*</div>}
        </div>
        {input.subLabel && <div className='sub-label'>{input.subLabel}</div>}
        <textarea 
            value={input.value} 
            onChange={e => input.onChange(e.target.value)}  
            placeholder={input.placeholder ? input.placeholder : 'Enter a long text...'}
        />
        {/* {error && <div className="errors">{error}</div>} */}
    </div>
}