import React from "react";
import CardStat from "./CardStat";
import { AppointmentsDataProps } from "@/types/types";

const AppointmentsData = ({
    appointments,
}: AppointmentsDataProps) => {
    return (
        <section className="admin-stat">
            <CardStat
                type="appointments"
                count={appointments?.scheduledCount}
                label="New Appointments"
                icon="/assets/icons/appointments.svg"
            />
            <CardStat
                type="pending"
                count={appointments?.pendingCount}
                label="Pending Appointments"
                icon="/assets/icons/pending.svg"
            />
            <CardStat
                type="cancelled"
                count={appointments?.cancelledCount}
                label="Cancelled Appointments"
                icon="/assets/icons/cancelled.svg"
            />
        </section>
    );
};

export default AppointmentsData;
