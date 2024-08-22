"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getRecentAppointmentsList } from "./actions/appointment.actions";

const AppointmentsContext = createContext(undefined);

export const useData = () => {
    return useContext(AppointmentsContext);
};

export const AppointmentsProvider = ({ children }: React.PropsWithChildren) => {
    const [appointments, setAppointments] = useState();

    useEffect(() => {
        const getData = async () => {
            const data = await getRecentAppointmentsList();

            if (data) {
                setAppointments(data);
            }
        };

        getData();
    }, []);

    return (
        <AppointmentsContext.Provider value={appointments}>
            {children}
        </AppointmentsContext.Provider>
    );
};
