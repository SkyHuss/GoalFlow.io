import { ChangeEvent, useState } from 'react';
import './FileInput.css'
import { Check, CloudUpload, NoPhotography} from '@mui/icons-material';

interface Props {
    placeholder?: string;
    label: string;
    subLabel?: string;
    isRequired: boolean;
    file: string | File | null;
    setFile: (file: File | null) => void;
}

export default function FileInput({placeholder, label, subLabel, isRequired, file, setFile}: Props) {
    
    const [isDragOver, setIsDragOver] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newfile = event.target.files?.[0];
        if(newfile) {
            setFile(newfile);
            setSelectedFile(newfile)
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

    const getImageSrc = () => {
        if (selectedFile) {
            return URL.createObjectURL(selectedFile);
        }
        if (typeof file === 'string') {
            return import.meta.env.VITE_BASE_URL + file;
        }
        if (file instanceof File) {
            return import.meta.env.VITE_BASE_URL + file;
        }
        return null;
    };

    const discardImage = () => {
        setFile(null);
        setSelectedFile(null);
    }

    const openFilePicker = () => {
        document.getElementById('hidden-file-input')?.click();
    }

    return <div className="file-input-container form-input">
        <div className="label">
            {label} {isRequired && <div className="is-required">*</div>}
        </div>
        {subLabel && <div className='sub-label'>{subLabel}</div>}
        <div className="input-file">
            <div className="preview" onClick={discardImage}>
                {getImageSrc() ? (
                    <img src={getImageSrc()} alt="Preview" />
                ) : (
                    <div className="no-image">
                        <NoPhotography />
                    </div>
                )}
            </div>    
            <div 
                className={`custom-input-file ${isDragOver ? 'drag-over' : ''}`} 
                onClick={openFilePicker} onDrop={handleDrop} 
                onDragOver={handleDragOver}
                onDragLeave={() => setIsDragOver(false)}
            >
                {selectedFile ? 
                    <><Check />Selected filename: {selectedFile.name}</> :
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