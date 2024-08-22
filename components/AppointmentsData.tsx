import React from "react";
import CardStat from "./CardStat";
import { AppointmentsDataProps } from "@/types/types";

const AppointmentsData = ({
    appointments: { scheduledCount, pendingCount, cancelledCount },
}: AppointmentsDataProps) => {
    return (
        <section className="admin-stat">
            <CardStat
                type="appointments"
                count={scheduledCount}
                label="New Appointments"
                icon="/assets/icons/appointments.svg"
            />
            <CardStat
                type="pending"
                count={pendingCount}
                label="Pending Appointments"
                icon="/assets/icons/pending.svg"
            />
            <CardStat
                type="cancelled"
                count={cancelledCount}
                label="Cancelled Appointments"
                icon="/assets/icons/cancelled.svg"
            />
        </section>
    );
};

export default AppointmentsData;
