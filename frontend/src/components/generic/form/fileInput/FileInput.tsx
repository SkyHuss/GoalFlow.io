import { ChangeEvent, useState } from 'react';
import './FileInput.css'
import { Check, CloudUpload, NoPhotography} from '@mui/icons-material';

interface Props {
    placeholder?: string;
    label: string;
    subLabel?: string;
    isRequired: boolean;
    file: File | null;
    setFile: (file: File | null) => void;
}

export default function FileInput({placeholder, label, subLabel, isRequired, file, setFile}: Props) {
    
    const [isDragOver, setIsDragOver] = useState<boolean>(false);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if(file) {
            setFile(file)
        }
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const droppedFiles = event.dataTransfer.files;
        if (droppedFiles.length == 1 && droppedFiles[0]) {
            setFile(droppedFiles[0]);
        }
        setIsDragOver(false)
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        setIsDragOver(true);
        event.preventDefault();
    };

    const openFilePicker = () => {
        document.getElementById('hidden-file-input')?.click();
    }

    return <div className="file-input-container form-input">
        <div className="label">
            {label} {isRequired && <div className="is-required">*</div>}
        </div>
        {subLabel && <div className='sub-label'>{subLabel}</div>}
        <div className="input-file">

            <div className="preview">
                {file && 
                    <img src={URL.createObjectURL(file)} alt="Preview" />
                }
                {!file && 
                    <div className="no-image">
                        <NoPhotography />
                    </div>
                }
            </div>    

            <div 
                className={`custom-input-file ${isDragOver ? 'drag-over' : ''}`} 
                onClick={openFilePicker} onDrop={handleDrop} 
                onDragOver={handleDragOver}
                onDragLeave={() => setIsDragOver(false)}
            >
                {file ? 
                    <><Check />Selected filename: {file.name}</> :
                    <><CloudUpload /> <div>{placeholder}</div></>
                }
            </div>
            <input 
                id="hidden-file-input"
                type='file'
                accept='image/*'
                onChange={handleFileChange}
            />
        </div>
    </div>
}