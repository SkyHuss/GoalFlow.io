import { ArrowDropDown, Event } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import '../FormInput.css'
import './DatePickerInput.css';
import { DateTime } from 'luxon';

interface Props {
    placeholder?: string;
    value: DateTime | null;
    label: string;
    subLabel?: string;
    isRequired: boolean;
    disabled: boolean;
    onChange: (date: DateTime) => void;
}

export default function DatePickerInput({
    placeholder = 'Select a date',
    value,
    label,
    subLabel,
    isRequired,
    disabled = false,
    onChange
}: Props) {
    const monthNames = [
        'Jan.',
        'Feb.',
        'Mar.',
        'Apr.',
        'Mai',
        'June',
        'Jul.',
        'Aug.',
        'Sept.',
        'Oct.',
        'Nov.',
        'Dec.'
    ];

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
            label = date.day + " " + monthNames[date.month - 1] + ' ' + date.year;
        } else {
            label = placeholder;
        }

        return label;
    };

    const handleDateChange = (date: Date | null) => {
        if (!disabled && date) {
            setSelectedDate(DateTime.fromJSDate(date));
            onChange(DateTime.fromJSDate(date));
        }
        setIsPickerDisplay(false);
    };

    return (
        <div className="date-picker-container form-input">
            <div className="label">
                {label} {isRequired && <div className='is-required'>*</div>}
            </div>
            {subLabel && <div className='sub-label'>{subLabel}</div>}
            <div className="date-picker-button" onClick={() => setIsPickerDisplay(true)}>
                <Event/>
                {getDateDisplay(selectedDate)}
                <ArrowDropDown style={{ marginLeft: 'auto' }} />
            </div>

            {isPickerDisplay && !disabled && (
                <div className="date-picker-content" ref={datepickerRef} style={{top: subLabel ? 92 : 70}}>
                    <DatePicker
                        selected={selectedDate?.toJSDate()}
                        onChange={handleDateChange}
                        inline
                        disabled={disabled}
                        showTimeSelect
                    />
                </div>
            )}
        </div>
    );
}
