import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SearchParamsProps } from "@/types/types";
import { getAppointments } from "@/lib/actions/appointment.actions";
import { Doctors } from "@/lib/constants";
import { formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const SuccessPage = async ({
    params: { userId },
    searchParams,
}: SearchParamsProps) => {
    const appointmentId = (searchParams?.appointmentId as string) || "";
    const appointment = await getAppointments(appointmentId);

    const doctor = Doctors.find(
        (doc) => doc.name === appointment.primaryPhysician
    );

    return (
        <div className="flex h-screen max-h-screen px-[5%]">
            <div className="success-img">
                <Link href={"/"}>
                    <Image
                        src={"/assets/icons/logo-full.svg"}
                        alt="logo"
                        width={1000}
                        height={1000}
                        className="h-10 w-fit"
                    />
                </Link>

                <section className="flex flex-col items-center">
                    <Image
                        src={"/assets/gifs/success.gif"}
                        alt="success"
                        width={280}
                        height={300}
                    />
                    <h2 className="header mb-6 max-w-[600px] text-center">
                        Your&nbsp;
                        <span className="text-green-500">
                            appointment request
                        </span>
                        &nbsp; has been successfully submitted!
                    </h2>
                    <p className="">
                        We will get back to you shortly with the details of your
                        appointment.
                    </p>
                </section>

                <section className="request-details">
                    <p>Requested appointment details</p>
                    <div className="flex items-center gap-3">
                        <Image
                            src={doctor?.image!}
                            alt={doctor?.name!}
                            width={100}
                            height={100}
                            className="size-12"
                        />
                        <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
                    </div>
                    <div className="flex gap-2">
                        <Image
                            src={"/assets/icons/calendar.svg"}
                            alt="calendar"
                            width={24}
                            height={24}
                        />
                        <p>{formatDateTime(appointment.schedule).dateTime}</p>
                    </div>
                </section>

                <Button
                    variant={"outline"}
                    className="shad-primary-btn"
                    asChild
                >
                    <Link href={`/patients/${userId}/new-appointment`}>
                        New Appointment
                    </Link>
                </Button>

                <p className="copyright">&copy; 2024 ClinicCare</p>
            </div>
        </div>
    );
};

export default SuccessPage;
