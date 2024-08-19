"use client";

import { z } from "zod";
import {
    Doctors,
    GenderOptions,
    IdentificationTypes,
    PatientFormDefaultValues,
} from "@/lib/constants";
import Image from "next/image";
import { useState } from "react";
import { SelectItem } from "../ui/select";
import SubmitButton from "../SubmitButton";
import FileUploader from "../FileUploader";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import CustomFormField from "./CustomFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl } from "@/components/ui/form";
import { FormFieldTypes, User } from "@/types/types";
import { registerPatient } from "@/lib/actions/patient.actions";
import { PatientFormValidation } from "@/types/validation";
import { Button } from "../ui/button";
import Header from "../Header";

const RegisterForm = ({ user }: { user: User }) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof PatientFormValidation>>({
        resolver: zodResolver(PatientFormValidation),
        defaultValues: {
            ...PatientFormDefaultValues,
            name: user.name,
            email: user.email,
            phone: user.phone,
        },
    });

    const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
        setIsLoading(true);

        // Store file info in form data as
        let formData;
        if (
            values.identificationDocument &&
            values.identificationDocument?.length > 0
        ) {
            const blobFile = new Blob([values.identificationDocument[0]], {
                type: values.identificationDocument[0].type,
            });

            formData = new FormData();
            formData.append("blobFile", blobFile);
            formData.append("fileName", values.identificationDocument[0].name);
        }

        try {
            const patient = {
                userId: user.$id,
                name: values.name,
                email: values.email,
                phone: values.phone,
                birthDate: new Date(values.birthDate),
                gender: values.gender,
                address: values.address,
                occupation: values.occupation,
                emergencyContactName: values.emergencyContactName,
                emergencyContactNumber: values.emergencyContactNumber,
                primaryPhysician: values.primaryPhysician,
                insuranceProvider: values.insuranceProvider,
                insurancePolicyNumber: values.insurancePolicyNumber,
                allergies: values.allergies,
                currentMedication: values.currentMedication,
                familyMedicalHistory: values.familyMedicalHistory,
                pastMedicalHistory: values.pastMedicalHistory,
                identificationType: values.identificationType,
                identificationNumber: values.identificationNumber,
                identificationDocument: values.identificationDocument
                    ? formData
                    : undefined,
                privacyConsent: values.privacyConsent,
                disclosureConsent: values.disclosureConsent,
                treatmentConsent: values.treatmentConsent,
            };

            const newPatient = await registerPatient(patient);

            if (newPatient) {
                router.push(`/patients/${user.$id}/new-appointment`);
            }
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 flex-1"
            >
                <Header
                    title="Welcome!"
                    subtitle="Let us know a bit about you"
                />

                {/* Personal information */}
                <section className="space-y-6 flex-1 pb-10">
                    <section className="space-y-6">
                        <div className="mb-9 skew-y-1">
                            <h2 className="sub-header">Personal information</h2>
                        </div>
                    </section>

                    <CustomFormField
                        fieldType={FormFieldTypes.INPUT}
                        control={form.control}
                        name="name"
                        label="Full name"
                        placeholder="Enter your full name"
                        iconSrc="/assets/icons/user.svg"
                        iconAlt="User icon"
                    />

                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            fieldType={FormFieldTypes.INPUT}
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="Enter your email"
                            iconSrc="/assets/icons/email.svg"
                            iconAlt="Email icon"
                        />
                        <CustomFormField
                            fieldType={FormFieldTypes.PHONE_INPUT}
                            control={form.control}
                            name="phone"
                            label="Phone number"
                            placeholder="Enter your phone number"
                            iconSrc="/assets/icons/phone.svg"
                            iconAlt="Phone icon"
                        />
                    </div>

                    <div className="flex gap-6 flex-col xl:flex-row">
                        <CustomFormField
                            fieldType={FormFieldTypes.DATE_PICKER}
                            control={form.control}
                            name="birthDate"
                            label="Date of birth"
                            placeholder="Enter your birth date"
                            iconSrc="/assets/icons/email.svg"
                            iconAlt="Email icon"
                        />
                        <CustomFormField
                            fieldType={FormFieldTypes.SELECT}
                            control={form.control}
                            name="gender"
                            label="Gender"
                            placeholder="Choose your gender"
                        >
                            {GenderOptions.map((option) => (
                                <SelectItem
                                    value={option}
                                    className="cursor-pointer focus:bg-dark-500 transition-all rounded-md w-full"
                                    key={option}
                                >
                                    {option}
                                </SelectItem>
                            ))}
                        </CustomFormField>
                    </div>

                    <div className="flex gap-6 flex-col xl:flex-row">
                        <CustomFormField
                            fieldType={FormFieldTypes.INPUT}
                            control={form.control}
                            name="address"
                            label="Address"
                            placeholder="Enter your address"
                        />
                        <CustomFormField
                            fieldType={FormFieldTypes.INPUT}
                            control={form.control}
                            name="occupation"
                            label="Occupation"
                            placeholder="Enter your occupation"
                        />
                    </div>

                    <div className="flex gap-6 flex-col xl:flex-row">
                        <CustomFormField
                            fieldType={FormFieldTypes.INPUT}
                            control={form.control}
                            name="emergencyContactName"
                            label="Emergency Contact Name"
                            placeholder="Guardian’s name"
                        />
                        <CustomFormField
                            fieldType={FormFieldTypes.PHONE_INPUT}
                            control={form.control}
                            name="emergencyContactNumber"
                            label="Emergency Contact Number"
                            placeholder="Guardian’s phone number"
                            iconSrc="/assets/icons/phone.svg"
                            iconAlt="Phone icon"
                        />
                    </div>
                </section>

                {/* Medical information */}
                <section className="space-y-6 flex-1 pb-10">
                    <section className="space-y-6">
                        <div className="mb-9 skew-y-1">
                            <h2 className="sub-header">Medical Information</h2>
                        </div>
                    </section>
                    <CustomFormField
                        fieldType={FormFieldTypes.SELECT}
                        control={form.control}
                        name="primaryPhysician"
                        label="Primary Physician"
                        placeholder="Select your primary physician"
                    >
                        {Doctors.map((doctor) => (
                            <SelectItem
                                key={doctor.name}
                                value={doctor.name}
                                className="focus:bg-dark-500 transition-all rounded-md"
                            >
                                <div className="flex cursor-pointer items-center gap-2">
                                    <Image
                                        src={doctor.image}
                                        width={32}
                                        height={32}
                                        alt={doctor.name}
                                        className="rounded-full border border-dark-500"
                                    />
                                    <p>{doctor.name}</p>
                                </div>
                            </SelectItem>
                        ))}
                    </CustomFormField>
                    <div className="flex gap-6 flex-col xl:flex-row">
                        <CustomFormField
                            fieldType={FormFieldTypes.INPUT}
                            control={form.control}
                            name="insuranceProvider"
                            label="Insurance Provider"
                            placeholder="Enter your insurance provider"
                        />
                        <CustomFormField
                            fieldType={FormFieldTypes.INPUT}
                            control={form.control}
                            name="insurancePolicyNumber"
                            label="Insurance Number"
                            placeholder="Enter your insurance number"
                        />
                    </div>
                    <div className="flex gap-6 flex-col xl:flex-row">
                        <CustomFormField
                            fieldType={FormFieldTypes.TEXTAREA}
                            control={form.control}
                            name="allergies"
                            label="Allergies"
                            placeholder="Enter your allergies"
                        />
                        <CustomFormField
                            fieldType={FormFieldTypes.TEXTAREA}
                            control={form.control}
                            name="currentMedication"
                            label="Current Medication (if any)"
                            placeholder="Enter your current medication"
                        />
                    </div>
                    <div className="flex gap-6 flex-col xl:flex-row">
                        <CustomFormField
                            fieldType={FormFieldTypes.TEXTAREA}
                            control={form.control}
                            name="familyMedicalHistory"
                            label="Family Medical History"
                            placeholder="Enter your family medical history"
                        />
                        <CustomFormField
                            fieldType={FormFieldTypes.TEXTAREA}
                            control={form.control}
                            name="pastMedicalHistory"
                            label="Past Medical History"
                            placeholder="Enter your past medical history"
                        />
                    </div>
                </section>

                {/* `Identification and Verfication` */}
                <section className="space-y-6 flex-1 pb-10">
                    <section className="space-y-6">
                        <div className="mb-9 skew-y-1">
                            <h2 className="sub-header">Medical Information</h2>
                        </div>
                    </section>
                    <CustomFormField
                        fieldType={FormFieldTypes.SELECT}
                        control={form.control}
                        name="identificationType"
                        label="Identification Type"
                        placeholder="Select your identification type"
                    >
                        {IdentificationTypes.map((type) => (
                            <SelectItem
                                key={type.id}
                                value={type.label}
                                className="flex cursor-pointer items-center gap-2 focus:bg-dark-500 transition-all rounded-md"
                            >
                                <p>{type.label}</p>
                            </SelectItem>
                        ))}
                    </CustomFormField>
                    <CustomFormField
                        fieldType={FormFieldTypes.INPUT}
                        control={form.control}
                        name="identificationNumber"
                        label="Identification Number"
                        placeholder="Enter your identification number"
                    />
                    <CustomFormField
                        fieldType={FormFieldTypes.SKELETON}
                        control={form.control}
                        name="identificationDocument"
                        label="Identification Document"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <FileUploader
                                    files={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                        )}
                    />
                </section>

                {/* Consent and Privacy */}
                <section className="space-y-6 flex-1 pb-10">
                    <section className="space-y-6">
                        <div className="mb-9 skew-y-1">
                            <h2 className="sub-header">Consent and Privacy</h2>
                        </div>
                    </section>
                    <CustomFormField
                        fieldType={FormFieldTypes.CHECKBOX}
                        control={form.control}
                        name="treatmentConsent"
                        label="I consent to receive treatment for my health condition."
                    />
                    <CustomFormField
                        fieldType={FormFieldTypes.CHECKBOX}
                        control={form.control}
                        name="disclosureConsent"
                        label="I consent to the use and disclosure of my health information for treatment purposes."
                    />
                    <CustomFormField
                        fieldType={FormFieldTypes.CHECKBOX}
                        control={form.control}
                        name="privacyConsent"
                        label="I acknowledge that I have reviewed and agree to the privacy policy"
                    />
                </section>

                {/* Submit Button */}
                <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
            </form>
        </Form>
    );
};

export default RegisterForm;
