import { Gender } from "@/types/types";

export const GenderOptions = ["male", "female", "other"];

export const Doctors = [
    {
        image: "/assets/images/dr-green.png",
        name: "John Green",
    },
    {
        image: "/assets/images/dr-cameron.png",
        name: "Leila Cameron",
    },
    {
        image: "/assets/images/dr-livingston.png",
        name: "David Livingston",
    },
    {
        image: "/assets/images/dr-peter.png",
        name: "Evan Peter",
    },
    {
        image: "/assets/images/dr-powell.png",
        name: "Jane Powell",
    },
    {
        image: "/assets/images/dr-remirez.png",
        name: "Alex Ramirez",
    },
    {
        image: "/assets/images/dr-lee.png",
        name: "Jasmine Lee",
    },
    {
        image: "/assets/images/dr-cruz.png",
        name: "Alyana Cruz",
    },
    {
        image: "/assets/images/dr-sharma.png",
        name: "Hardik Sharma",
    },
];

export const IdentificationTypes = [
    {
        id: 0,
        label: "Birth Certificate",
    },
    {
        id: 1,
        label: "Driver's License",
    },
    {
        id: 2,
        label: "Medical Insurance Card/Policy",
    },
    {
        id: 3,
        label: "Military ID Card",
    },
    {
        id: 4,
        label: "National Identity Card",
    },
    {
        id: 5,
        label: "Passport",
    },
    {
        id: 6,
        label: "Resident Alien Card (Green Card)",
    },
    {
        id: 7,
        label: "Social Security Card",
    },
    {
        id: 8,
        label: "State ID Card",
    },
    {
        id: 9,
        label: "Student ID Card",
    },
    {
        id: 10,
        label: "Voter ID Card",
    },
];

export const PatientFormDefaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: new Date(Date.now()),
    gender: "male" as Gender,
    address: "",
    occupation: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    primaryPhysician: "",
    insuranceProvider: "",
    insurancePolicyNumber: "",
    allergies: "",
    currentMedication: "",
    familyMedicalHistory: "",
    pastMedicalHistory: "",
    identificationType: "Birth Certificate",
    identificationNumber: "",
    identificationDocument: [],
    treatmentConsent: false,
    disclosureConsent: false,
    privacyConsent: false,
};
