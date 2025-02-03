import { ArrowDropDown, Check, CleaningServices, Event } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import '../FormInput.css'
import './DatePickerInput.css';
import { DateTime } from 'luxon';
import ActionButton from '../../actionButton/ActionButton';
import { ButtonType } from '../../../../constants/buttons/buttonsTypes';

interface Props {
    placeholder?: string;
    value: DateTime | null;
    label: string;
    subLabel?: string;
    isRequired: boolean;
    disabled: boolean;
    placeTop?: boolean
    onChange: (date: DateTime | null) => void;
}

export default function DatePickerInput({
    placeholder = 'Select a date',
    value,
    label,
    subLabel,
    isRequired,
    disabled = false,
    placeTop = false,
    onChange
}: Props) {

    const [selectedDate, setSelectedDate] = useState<DateTime | null>(value);
    const [isPickerDisplay, setIsPickerDisplay] = useState<boolean>(false);

    const datepickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event: MouseEvent) => {
        if (datepickerRef.current && !datepickerRef.current.contains(event.target as Node)) {
            setIsPickerDisplay(false);
        }
    };

    const getDateDisplay = (date: DateTime | null) => {
        let label = '';
        if (date) {
            label = date.toFormat("d LLLL yyyy 'at' HH:mm")
        } else {
            label = placeholder;
        }

        return label;
    };

    const handleDateChange = (date: Date | null) => {
        if (!disabled && date) {
            setSelectedDate(DateTime.fromJSDate(date));
        }
    };

    const clearDates = () => {
        setSelectedDate(null);
        onChange(null);

        setIsPickerDisplay(false);
    };

    const validateDates = () => {
        if(selectedDate) {
            onChange(selectedDate);
            setIsPickerDisplay(false);
        }
    };

    return (
        <div className="date-picker-container form-input">
            <div className="label">
                {label} {isRequired && <div className='is-required'>*</div>}
            </div>
            {subLabel && <div className='sub-label'>{subLabel}</div>}
            <div className={`date-picker-button ${!value ? 'placeholder': ''} `} onClick={() => setIsPickerDisplay(true)}>
                <Event/>
                {getDateDisplay(value)}
                <ArrowDropDown style={{ marginLeft: 'auto' }} />
            </div>

            {isPickerDisplay && !disabled && (
                <div 
                    className="date-picker-content" 
                    ref={datepickerRef} 
                    style={
                        placeTop ? 
                        {bottom: 50 }:
                        {top: subLabel ? 92 : 70}
                        }>
                    <DatePicker
                        selected={selectedDate?.toJSDate()}
                        onChange={handleDateChange}
                        inline
                        disabled={disabled}
                        showTimeSelect
                    />
                    <div className="submit-actions">
                        <ActionButton icon={CleaningServices} label="Effacer" type={ButtonType.Secondary} onClick={clearDates} />
                        <ActionButton
                            icon={Check}
                            label="Valider"
                            type={!selectedDate ? ButtonType.Disabled : ButtonType.Primary}
                            onClick={validateDates}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
