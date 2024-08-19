import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import { SearchParamsProps } from "@/types/types";
import Image from "next/image";
import React from "react";

const Register = async ({ params: { userId } }: SearchParamsProps) => {
    const user = await getUser(userId);

    return (
        <div className="flex h-screen max-h-screen relative">
            <section className="remove-scrollbar container my-auto z-10 backdrop-blur-sm xl:backdrop-blur-0 overflow-x-hidden">
                <div className="sub-container max-w-[496px]">
                    <Image
                        src={"/assets/icons/logo-full.svg"}
                        alt="logo"
                        width={1000}
                        height={1000}
                        className="mb-12 h-10 w-fit"
                    />

                    <RegisterForm user={user} />

                    <div className="text-14-regular mt-20 flex justify-between">
                        <p className="justify-items-end text-dark-600 xl:text-left">
                            &copy; 2024 ClinicCare
                        </p>
                    </div>
                </div>
            </section>
            <Image
                src={"/assets/images/register-img.png"}
                alt={"onboarding-image"}
                height={1000}
                width={1000}
                className="side-register h-full w-full md:max-w-[390px] fixed right-0 z-0"
            />
        </div>
    );
};

export default Register;
