type InputType = {
    placeholder?: string;
    label: string;
    subLabel?: string;
    isRequired: boolean;
}

export type TextInputType = InputType & {
    value: string;
    onChange: (value: string) => void;
}

export type TextAreaInputType = InputType & {
    value: string;
    onChange: (value: string) => void;
}

export type NumberInputType = InputType & {
    value: number;
    onChange: (value: number) => void;
}

export type DatePickerInputType = InputType & {
    value: Date;
    onChange: (date: Date) => void;
}

export type PictureInputType = InputType & {
    value: string;
    onChange: (value: string) => void;
}