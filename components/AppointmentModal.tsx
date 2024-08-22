"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import { AppointmentModalProps } from "@/types/types";
import AppointmentForm from "./forms/AppointmentForm";

const AppointmentModal = ({
    type,
    label,
    patientId,
    userId,
    appointment,
    title,
    description,
    classNames,
}: AppointmentModalProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant={"ghost"}
                    className={`capitalize transition-all ${
                        type === "schedule" && "text-green-500"
                    } ${type === "cancel" && "text-red-500"} ${
                        label === "Re-schedule" && "text-yellow-500"
                    } ${classNames}`}
                >
                    {label}
                </Button>
            </DialogTrigger>
            <DialogContent className="shad-dialog sm:max-w-md">
                <DialogHeader className="mb-4 space-y-3">
                    <DialogTitle className="capitalize ">{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <AppointmentForm
                    userId={userId}
                    patientId={patientId}
                    type={type}
                    appointment={appointment}
                    setOpen={setOpen}
                />
            </DialogContent>
        </Dialog>
    );
};

export default AppointmentModal;
