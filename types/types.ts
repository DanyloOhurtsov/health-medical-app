import { Models } from "node-appwrite";
import { Control } from "react-hook-form";

// ==== Search Params
export interface SearchParamsProps {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

// ==== Main types
export type Gender = "male" | "female" | "other";
declare type Status = "pending" | "scheduled" | "cancelled";

// ==== Form Field
export enum FormFieldTypes {
    INPUT = "input",
    SELECT = "select",
    SKELETON = "skeleton",
    TEXTAREA = "textarea",
    CHECKBOX = "checkbox",
    PHONE_INPUT = "phoneInput",
    DATE_PICKER = "datePicker",
    GENDER = "gender",
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
    doctors?: { [key: string]: string };
    renderSkeleton?: (field: any) => React.ReactNode;
}

export interface RenderFieldProps {
    field: any;
    props: CustomFormFieldProps;
}

// ==== Submit Button
export interface SubmitButtonProps {
    isLoading: boolean;
    children: React.ReactNode;
    className?: string;
}

// ==== Actions
// == Patient Actions
export interface Patient extends Models.Document {
    userId: string;
    name: string;
    email: string;
    phone: string;
    birthDate: Date;
    gender: Gender;
    address: string;
    occupation: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    primaryPhysician: string;
    insuranceProvider: string;
    insurancePolicyNumber: string;
    allergies: string | undefined;
    currentMedication: string | undefined;
    familyMedicalHistory: string | undefined;
    pastMedicalHistory: string | undefined;
    identificationType: string | undefined;
    identificationNumber: string | undefined;
    identificationDocument: FormData | undefined;
    privacyConsent: boolean;
}
export interface CreateUserProps {
    name: string;
    email: string;
    phone: string;
}
export interface User extends CreateUserProps {
    $id: string;
}
export interface RegisterUserProps {
    userId: string;
    birthDate: Date;
    gender: Gender;
    address: string;
    occupation: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    primaryPhysician: string;
    insuranceProvider: string;
    insurancePolicyNumber: string;
    allergies: string | undefined;
    currentMedication: string | undefined;
    familyMedicalHistory: string | undefined;
    pastMedicalHistory: string | undefined;
    identificationType: string | undefined;
    identificationNumber: string | undefined;
    identificationDocument: FormData | undefined;
    privacyConsent: boolean;
}

// == Appointment Actions
export interface Appointment {
    patient: Patient;
    schedule: Date;
    status: Status;
    primaryPhysician: string;
    reason: string;
    note: string;
    userId: string;
    cancellationReason: string | null;
}
export interface CreateAppointmentProps {
    userId: string;
    patient: string;
    primaryPhysician: string;
    reason: string;
    schedule: Date;
    status: Status;
    note: string | undefined;
}
export interface UpdateAppointmentProps {
    appointmentId: string;
    userId: string;
    appointment: Appointment;
    type: string;
}

// File Upload
export interface FileUploaderProps {
    files: File[] | undefined;
    onChange: (files: File[]) => void;
}

// Header Props
export interface HeaderProps {
    title: string;
    subtitle?: string;
    className?: {
        titleStyles: string;
        subtitleStyles: string;
        containerStyles: string;
    };
}
