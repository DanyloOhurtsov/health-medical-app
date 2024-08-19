import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import { SearchParamsProps } from "@/types/types";
import Image from "next/image";

const NewAppointment = async ({ params: { userId } }: SearchParamsProps) => {
    const patient = await getPatient(userId);

    return (
        <div className="flex h-screen max-h-screen relative">
            <section className="remove-scrollbar container my-auto z-10 backdrop-blur-sm xl:backdrop-blur-0 overflow-x-hidden">
                <div className="sub-container max-w-[860px] flex-1 justify-between">
                    <Image
                        src={"/assets/icons/logo-full.svg"}
                        alt="logo"
                        width={1000}
                        height={1000}
                        className="mb-12 h-10 w-fit"
                    />

                    <AppointmentForm
                        type="create"
                        userId={userId}
                        patientId={patient.$id}
                    />

                    <p className="justify-items-end text-dark-600 xl:text-left mt-10 py-12">
                        &copy; 2024 ClinicCare
                    </p>
                </div>
            </section>
            <div className="w-1/2 flex justify-start">
                <Image
                    src={"/assets/images/appointment-img.png"}
                    alt="appointment-image"
                    height={1000}
                    width={1000}
                    className="side-register h-full w-full md:max-w-[390px] fixed right-0 z-0"
                />
            </div>
        </div>
    );
};

export default NewAppointment;
