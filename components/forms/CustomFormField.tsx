"use client";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { format } from "date-fns";
import { Input } from "../ui/input";
import {
    CustomFormFieldProps,
    FormFieldTypes,
    RenderFieldProps,
} from "@/types/types";
import Image from "next/image";
import { E164Number } from "libphonenumber-js";
import { PhoneInput } from "../ui/phone-input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { GenderOptions } from "@/lib/constants";

const RenderField = ({ field, props }: RenderFieldProps) => {
    const {
        fieldType,
        iconAlt,
        iconSrc,
        placeholder,
        dateFormat,
        showTimeSelect,
        renderSkeleton,
    } = props;

    switch (fieldType) {
        case FormFieldTypes.INPUT:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400 min-h-14 items-center">
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
                <div className="flex rounded-md border border-dark-500 bg-dark-400 min-h-14 items-center">
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
        case FormFieldTypes.DATE_PICKER:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400 min-h-14 items-center">
                    <Image
                        src={"/assets/icons/calendar.svg"}
                        alt="cal"
                        height={24}
                        width={24}
                        className="ml-2 w-auto h-auto"
                    />
                    <FormControl>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"ghost"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? (
                                        format(
                                            field.value,
                                            `${dateFormat ?? "dd/MM/yyyy"}`
                                        )
                                    ) : (
                                        <span className="text-muted-foreground">
                                            Pick a date
                                        </span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={(date: any) =>
                                        field.onChange(date)
                                    }
                                    initialFocus
                                    className="bg-dark-400 border-dark-500"
                                    classNames={{ root: "border-dark-500" }}
                                />
                            </PopoverContent>
                        </Popover>
                    </FormControl>
                </div>
            );
        case FormFieldTypes.SKELETON:
            return renderSkeleton ? renderSkeleton(field) : null;
        case FormFieldTypes.GENDER:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400 min-h-14 items-center">
                    <FormControl>
                        <Select>
                            <SelectTrigger className="w-full focus:ring-0 focus:border-none focus:outline-none focus:ring-offset-0 ring-0 border-0 outline-none ring-offset-0">
                                <SelectValue placeholder="---" className="text-dark-500"/>
                            </SelectTrigger>
                            <SelectContent className="bg-dark-400 border-dark-500 w-64 -ml-2.5">
                                {GenderOptions.map((option) => (
                                    <SelectItem value={option.id} className="cursor-pointer focus:bg-dark-500 transition-all rounded-md">
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
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
