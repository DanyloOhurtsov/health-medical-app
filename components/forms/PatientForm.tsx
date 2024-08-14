"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import { FormFieldTypes } from "@/types/types";
import { z } from "zod";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/types/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";

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
            if (user) router.push(`/patient/${user.$id}/register`);
        } catch (error) {
            console.error(error);
        } finally {
            // setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 flex-1"
            >
                <section className="mb-20 space-y-4">
                    <h1 className="header">Hi there!</h1>
                    <p className="text-dark-700">
                        Schedule your first appointment
                    </p>
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
