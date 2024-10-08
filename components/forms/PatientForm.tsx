"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../SubmitButton";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { FormFieldTypes } from "@/types/types";
import CustomFormField from "./CustomFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormValidation } from "@/types/validation";
import { createUser } from "@/lib/actions/patient.actions";
import Header from "../Header";

const PatientForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    });

    async function onSubmit(values: z.infer<typeof UserFormValidation>) {
        const { name, email, phone } = values;
        setIsLoading(true);
        try {
            const userData = { name, email, phone };

            // Send data to the server
            const user = await createUser(userData);

            // Redirect to the next page
            if (user) router.push(`/patients/${user.$id}/register`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 flex-1"
            >
                <Header
                    title="Hi there!"
                    subtitle="Schedule your first appointment"
                />

                <CustomFormField
                    fieldType={FormFieldTypes.INPUT}
                    control={form.control}
                    name="name"
                    label="Full name"
                    placeholder="Enter your full name"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="User icon"
                />
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

                <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
            </form>
        </Form>
    );
};

export default PatientForm;
