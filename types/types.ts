import { Control } from "react-hook-form";

export enum FormFieldTypes {
    INPUT = "input",
    SELECT = "select",
    SKELETON = "skeleton",
    TEXTAREA = "textarea",
    CHECKBOX = "checkbox",
    PHONE_INPUT = "phoneInput",
    DATE_PICKER = "datePicker",
}

export interface CustomFormFieldProps {
    control: Control<any>;
    fieldType: FormFieldTypes;
    name: string;
    label: string;
    placeholder?: string;
    iconSrc?: string;
    iconAlt?: string;
    disabled?: boolean;
    dateFormat?: string;
    showTimeSelect?: boolean;
    children?: React.ReactNode;
    renderSkeleton?: (field: any) => React.ReactNode;
}

export interface RenderFieldProps {
    field: any;
    props: CustomFormFieldProps;
}

export interface SubmitButtonProps {
    isLoading: boolean;
    children: React.ReactNode;
    className?: string;
    
}
