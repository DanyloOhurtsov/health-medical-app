import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "ClinicCare - Streamlined Healthcare Management Platform",
    description:
        "ClinicCare is your all-in-one healthcare platform for effortless patient registration, appointment scheduling, and secure medical records management. Enhance your clinic's efficiency with integrated SMS notifications and user-friendly forms.",
    keywords:
        "ClinicCare, healthcare platform, patient registration, appointment scheduling, medical records, SMS notifications, healthcare management, clinic software, medical forms, patient portal",
    authors: {
        name: "Danylo Ohurtsov",
        url: "https://www.linkedin.com/in/danylo-ohurtsov/",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    "min-h-screen bg-dark-300 font-sans antialiased",
                    fontSans.variable
                )}
            >
                <ThemeProvider attribute="class" defaultTheme="dark">
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
