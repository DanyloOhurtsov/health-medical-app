import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

// == Classname Utility
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// == Stringify and Parse Utility
export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

// == Convert File to URL
export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// == Date Time Formatter
export const formatDateTime = (dateString: Date | string) => {
    // Date Time Options
    const dateTimeOptions: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    };

    // Date Day Options
    const dateDayOptions: Intl.DateTimeFormatOptions = {
        weekday: "short",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    };

    // Date Options
    const dateOptions: Intl.DateTimeFormatOptions = {
        month: "short",
        year: "numeric",
        day: "numeric",
    };

    // Time Options
    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    };

    // Formatted Date Time
    const formattedDateTime: string = new Date(dateString).toLocaleString(
        "en-US",
        dateTimeOptions
    );

    // Formatted Date Day
    const formattedDateDay: string = new Date(dateString).toLocaleString(
        "en-US",
        dateDayOptions
    );

    // Formatted Date
    const formattedDate: string = new Date(dateString).toLocaleString(
        "en-US",
        dateOptions
    );

    // Formatted Time
    const formattedTime: string = new Date(dateString).toLocaleString(
        "en-US",
        timeOptions
    );

    // Return
    return {
        dateTime: formattedDateTime,
        dateDay: formattedDateDay,
        dateOnly: formattedDate,
        timeOnly: formattedTime,
    };
};

// == Encrypt and Decrypt Key
export function encryptKey(passkey: string) {
    return btoa(passkey);
}

export function decryptKey(passkey: string) {
    return atob(passkey);
}
