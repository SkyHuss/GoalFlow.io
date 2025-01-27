import { TextInputType } from '../../../../constants/form/formTypes'
import '../FormInput.css'
import './TextInput.css'

interface Props {
    input: TextInputType;
}

export default function TextInput({input}: Props) {

    // const [error, setError] = useState<string | null>(null);

    return <div className="text-input-container form-input">
        <div className="label">
            {input.label} {input.isRequired && <div className="is-required">*</div>}
        </div>
        {input.subLabel && <div className='sub-label'>{input.subLabel}</div>}
        <input 
            type="text" 
            value={input.value} 
            onChange={e => input.onChange(e.target.value)}  
            placeholder={input.placeholder ? input.placeholder : 'Enter a text...'}
        />
        {/* {error && <div className="errors">{error}</div>} */}
    </div>
}