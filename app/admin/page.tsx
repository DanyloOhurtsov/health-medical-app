import Link from "next/link";
import Image from "next/image";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import AppointmentsData from "@/components/AppointmentsData";
import { getRecentAppointmentsList } from "@/lib/actions/appointment.actions";

const AdminPage = async () => {
    const appointments = await getRecentAppointmentsList();

    return (
        <div className="mx-auto flex max-w-7xl flex-col space-y-10">
            <header className="admin-header">
                <Link href={"/"} className="cursor-pointer">
                    <Image
                        src={"/assets/icons/logo-full.svg"}
                        alt="logo"
                        width={162}
                        height={32}
                        className="h-8 w-fit"
                    />
                    <p className="text-16-semibold">Admin Dashboard</p>
                </Link>
            </header>

            <main className="admin-main">
                <section className="w-full space-y-2">
                    <h1 className="header">Welcome!</h1>
                    <p className="text-dark-700">
                        Start the day with managing new appointments
                    </p>
                </section>

                <AppointmentsData appointments={appointments} />

                <DataTable data={appointments.documents} columns={columns} />
            </main>
        </div>
    );
};

export default AdminPage;
