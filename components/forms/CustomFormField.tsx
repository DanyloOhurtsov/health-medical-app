"use client";

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import {
    CustomFormFieldProps,
    FormFieldTypes,
    RenderFieldProps,
} from "@/types/types";
import Image from "next/image";
// import { PhoneInput } from "../ui/phone-input";
import { E164Number } from "libphonenumber-js";
import { PhoneInput } from "../ui/phone-input";

const RenderField = ({ field, props }: RenderFieldProps) => {
    const { fieldType, iconAlt, iconSrc, placeholder } = props;

    switch (fieldType) {
        case FormFieldTypes.INPUT:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {iconSrc && (
                        <Image
                            src={iconSrc}
                            alt={iconAlt || "Icon Alt"}
                            height={24}
                            width={24}
                            className="ml-2 w-auto h-auto"
                        />
                    )}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            className="shad-input border-0"
                        />
                    </FormControl>
                </div>
            );
        case FormFieldTypes.PHONE_INPUT:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {iconSrc && (
                        <Image
                            src={iconSrc}
                            alt={iconAlt || "Icon Alt"}
                            height={24}
                            width={24}
                            className="ml-2 w-auto h-auto"
                        />
                    )}
                    <FormControl>
                        <PhoneInput
                            defaultCountry="UA"
                            placeholder={placeholder}
                            value={field.value as E164Number | undefined}
                            onChange={field.onChange}
                        />
                    </FormControl>
                </div>
            );
        default:
            break;
    }
};

const CustomFormField = (props: CustomFormFieldProps) => {
    const { control, fieldType, name, label, placeholder, iconSrc, iconAlt } =
        props;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    {fieldType !== FormFieldTypes.CHECKBOX && label && (
                        <FormLabel>{label}</FormLabel>
                    )}

                    <RenderField field={field} props={props} />

                    <FormMessage className="shad-error" />
                </FormItem>
            )}
        />
    );
};

export default CustomFormField;
