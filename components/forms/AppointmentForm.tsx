"use client";

import { z } from "zod";
import {
    CreateAppointmentSchema,
    getAppointmentSchema,
} from "@/types/validation";
import Image from "next/image";
import Header from "../Header";
import { useState } from "react";
import { Doctors } from "@/lib/constants";
import { useForm } from "react-hook-form";
import { SelectItem } from "../ui/select";
import SubmitButton from "../SubmitButton";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAppointment } from "@/lib/actions/appointment.actions";
import { AppointmentFormProps, FormFieldTypes, Status } from "@/types/types";

const AppointmentForm = ({ userId, patientId, type }: AppointmentFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const AppointmentFormValidation = getAppointmentSchema(type);

    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
        resolver: zodResolver(AppointmentFormValidation),
        defaultValues: {
            primaryPhysician: "",
            schedule: new Date(),
            reason: "",
            note: "",
            cancellationReason: "",
        },
    });

    async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
        setIsLoading(true);

        let status;
        switch (type) {
            case "schedule":
                status = "scheduled";
                break;
            case "cancel":
                status = "cancelled";
                break;
            default:
                status = "pending";
                break;
        }

        try {
            if (type === "create" && patientId) {
                const appointmentData = {
                    userId,
                    patient: patientId,
                    primaryPhysician: values.primaryPhysician,
                    schedule: new Date(values.schedule),
                    reason: values.reason!,
                    note: values.note,
                    status: status as Status,
                };

                const appointment = await createAppointment(appointmentData);

                if (appointment) {
                    form.reset();
                    router.push(
                        `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
                    );
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    let buttonLabel;

    switch (type) {
        case "create":
            buttonLabel = "Request Appointment";
            break;
        case "cancel":
            buttonLabel = "Cancel Appointment";
            break;
        case "schedule":
            buttonLabel = "Schedule Appointment";
            break;
        default:
            break;
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 flex-1"
            >
                <Header
                    title="New Appointment"
                    subtitle="Request a new appointment in 10 seconds."
                />
                {type !== "cancel" && (
                    <>
                        <CustomFormField
                            fieldType={FormFieldTypes.SELECT}
                            control={form.control}
                            name="primaryPhysician"
                            label="Doctor"
                            placeholder="Select a doctor"
                        >
                            {Doctors.map((doctor) => (
                                <SelectItem
                                    key={doctor.name}
                                    value={doctor.name}
                                    className="cursor-pointer focus:bg-dark-500 transition-all rounded-md w-full"
                                >
                                    <div className="flex cursor-pointer items-center gap-2 ">
                                        <Image
                                            src={doctor.image}
                                            alt={doctor.name}
                                            width={32}
                                            height={32}
                                            className="rounded-full border border-gray-500"
                                        />
                                        <p>{doctor.name}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </CustomFormField>

                        <CustomFormField
                            fieldType={FormFieldTypes.DATE_PICKER}
                            control={form.control}
                            name="schedule"
                            label="Expected Date"
                            dateFormat="dd/MM/yyyy - h:mm aa"
                            showTimeSelect
                        />

                        <div className="flex flex-col gap-6 xl:flex-row">
                            <CustomFormField
                                fieldType={FormFieldTypes.TEXTAREA}
                                control={form.control}
                                name="reason"
                                label="Reason for Appointment"
                                placeholder="Enter the reason for the appointment"
                            />
                            <CustomFormField
                                fieldType={FormFieldTypes.TEXTAREA}
                                control={form.control}
                                name="note"
                                label="Notes"
                                placeholder="Enter any additional notes"
                            />
                        </div>
                    </>
                )}

                {type === "cancel" && (
                    <CustomFormField
                        fieldType={FormFieldTypes.TEXTAREA}
                        control={form.control}
                        name="cancellationReason"
                        label="Reason for Cancellation"
                        placeholder="Enter the reason for the cancellation"
                    />
                )}

                <SubmitButton
                    isLoading={isLoading}
                    className={`${
                        type === "cancel"
                            ? "shad-danger-btn"
                            : "shad-primary-btn"
                    } w-full`}
                >
                    {buttonLabel}
                </SubmitButton>
            </form>
        </Form>
    );
};

export default AppointmentForm;
