import { DateTime } from 'luxon';
import { useState } from 'react';
import './SprintSessionForm.css';
import TextInput from '../../generic/form/textInput/TextInput';
import TextAreaInput from '../../generic/form/textArea/TextAreaInput';
import FileInput from '../../generic/form/fileInput/FileInput';
import DatePickerInput from '../../generic/form/datePicker/DatePickerInput';
import ActionButton from '../../generic/actionButton/ActionButton';
import { Check, Close } from '@mui/icons-material';
import { ButtonType } from '../../../constants/buttons/buttonsTypes';
import { postSprintSession } from '../../../services/api/sprintSessionService';
import { SprintSession } from '../../../models/SprintSession';

export interface SprintSessionFormData {
    name: string,
    description: string,
    picture: File | null,
    dueDate: DateTime | null,
    startDate: DateTime | null,
}

interface Props {
    closeModal: () => void;
    addSession: (item: SprintSession) => void;
}

export default function SprintSessionForm({closeModal, addSession}: Props) {

    const [sprintSessionFormData, setSprintSessionFormData] = useState<SprintSessionFormData>({
        name: '',
        description: '',
        picture: null,
        dueDate: null,
        startDate: null
    })

    const handleInputChange = (key: string, value: string | DateTime | File | null) => {
        setSprintSessionFormData((prev) => ({...prev, [key]: value})) ;
    }

    const handleFormSubmit = async () => {
        const response: SprintSession = await postSprintSession(sprintSessionFormData);
        addSession(response);
        closeModal();
    }

    return <div className="sprint-session-form-container">
        <div className="form-content">
            <TextInput
                isRequired={true}
                value={sprintSessionFormData.name}
                onChange={(newValue: string) => handleInputChange('name', newValue)}
                placeholder='Enter a session title...'
                label='Sprint session title'
            />

            <TextAreaInput
                isRequired={false}
                value={sprintSessionFormData.description}
                onChange={(newValue: string) => handleInputChange('description', newValue)}
                placeholder='Enter a description...'
                label='Description'  
            />

            <FileInput 
                label='Session picture'
                subLabel='A small picture to quicky identify the sprint session'
                isRequired={true}
                file={sprintSessionFormData.picture}
                setFile={(file: File | null) => handleInputChange('picture', file)}
                placeholder='Click here or drop a picture (SVG, PNG, JPG, JPEG or GIF)'
            />

            <div className="row">
                <DatePickerInput
                    label='Start date'
                    isRequired={true}
                    value={sprintSessionFormData.startDate}
                    placeholder='Enter a start date...'
                    onChange={(newValue: DateTime | null) => handleInputChange('startDate', newValue)}
                    disabled={false}
                    placeTop={true}
                />

                <DatePickerInput
                    label='Due date'
                    isRequired={true}
                    value={sprintSessionFormData.dueDate}
                    placeholder='Enter a due date date...'
                    onChange={(newValue: DateTime | null) => handleInputChange('dueDate', newValue)}
                    disabled={false}
                    placeTop={true}
                />
            </div>
        </div>

        <div className="form-actions">
            <ActionButton 
                label='Submit'
                icon={Check}
                onClick={handleFormSubmit}
                type={ButtonType.Success}
            />

            <ActionButton
                label='Cancel'
                icon={Close}
                onClick={closeModal}
                outlined={true}
            />
        </div>
    </div>
}