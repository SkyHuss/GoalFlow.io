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
import { SprintSession } from '../../../models/SprintSession';

export interface SprintSessionFormData {
    id: number | null
    name: string,
    description: string,
    image: string | File | null,
    dueDate: string | null,
    startDate: string | null,
}

interface Props {
    session?: SprintSession;
    closeModal: () => void;
    handleFormSubmit: (item: SprintSessionFormData) => void;
}

export default function SprintSessionForm({session, closeModal, handleFormSubmit}: Props) {

    const [sprintSessionFormData, setSprintSessionFormData] = useState<SprintSessionFormData>({
        id: session ? session.id : null,
        name: session ? session.name: '',
        description: session ? session.description : '',
        image: session ? session.image : null,
        dueDate: session ? session.dueDate:  null,
        startDate: session? session.startDate: null
    })

    const handleInputChange = (key: string, value: string | DateTime | File | null) => {
        setSprintSessionFormData((prev) => ({...prev, [key]: value})) ;
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
                file={sprintSessionFormData.image}
                setFile={(file: File | null) => handleInputChange('image', file)}
                placeholder='Click here or drop a picture (SVG, PNG, JPG, JPEG or GIF)'
            />

            <div className="row">
                <DatePickerInput
                    label='Start date'
                    isRequired={true}
                    value={sprintSessionFormData.startDate ? DateTime.fromISO(sprintSessionFormData.startDate) : null}
                    placeholder='Enter a start date...'
                    onChange={(newValue: DateTime | null) => handleInputChange('startDate', newValue ? newValue.toISO() : null)}
                    disabled={false}
                    placeTop={true}
                />

                <DatePickerInput
                    label='Due date'
                    isRequired={true}
                    value={sprintSessionFormData.dueDate ? DateTime.fromISO(sprintSessionFormData.dueDate) : null}
                    placeholder='Enter a due date date...'
                    onChange={(newValue: DateTime | null) => handleInputChange('dueDate', newValue ? newValue.toISO() : null)}
                    disabled={false}
                    placeTop={true}
                />
            </div>
        </div>

        <div className="form-actions">
            <ActionButton 
                label='Submit'
                icon={Check}
                onClick={() => handleFormSubmit(sprintSessionFormData)}
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