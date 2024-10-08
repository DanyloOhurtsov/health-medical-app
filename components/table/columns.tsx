"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Appointment } from "@/types/types";
import StatusBadge from "../StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/lib/constants";
import Image from "next/image";
import AppointmentModal from "../AppointmentModal";

export const columns: ColumnDef<Appointment>[] = [
    {
        header: "ID",
        cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
    },
    {
        accessorKey: "patient",
        header: "Patient",
        cell: ({ row }) => (
            <p className="text-14-medium">{row.original.patient!.name}</p>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="min-w-[115px]">
                <StatusBadge status={row.original.status} />
            </div>
        ),
    },
    {
        accessorKey: "schedule",
        header: "Appointment",
        cell: ({ row }) => (
            <p className="text-14-regular min-w-[100px]">
                {formatDateTime(row.original.schedule).dateTime}
            </p>
        ),
    },
    {
        accessorKey: "primaryPhysician",
        header: "Doctor",
        cell: ({ row }) => {
            const doctor = Doctors.find(
                (doc) => doc.name === row.original.primaryPhysician
            );

            return (
                <div className="flex items-center gap-3">
                    <Image
                        src={doctor!.image}
                        alt={doctor!.name}
                        width={100}
                        height={100}
                        className="size-8"
                    />
                    <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
                </div>
            );
        },
    },
    {
        id: "actions",
        header: () => <div className="pl-4">Actions</div>,
        cell: ({ row }) => {
            return (
                <div className="flex gap-1">
                    <AppointmentModal
                        type="schedule"
                        label={
                            row.original.status === "scheduled"
                                ? "Re-schedule"
                                : "Schedule"
                        }
                        patientId={row.original.patient!.$id}
                        userId={row.original.userId}
                        appointment={row.original}
                        title="Schedule Appointment"
                        description="Please confirm the following details to schedule an appointment."
                        classNames="min-w-[121px] justify-start"
                    />
                    {row.original.status !== "cancelled" && (
                        <AppointmentModal
                            type="cancel"
                            label="Cancel"
                            patientId={row.original.patient!.$id}
                            userId={row.original.userId}
                            appointment={row.original}
                            title="Cancel Appointment"
                            description="Are you sure you want to cancel this appointment?"
                        />
                    )}
                </div>
            );
        },
    },
];
