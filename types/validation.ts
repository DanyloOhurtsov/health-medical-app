import { z } from "zod";

const UserFormValidation = z.object({
    name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters long." })
        .max(50, { message: "Name must be at most 50 characters long." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().refine((value) => /^\+[0-9]{1,15}$/.test(value), {
        message: "Please enter a valid phone number.",
    }),
});

export default UserFormValidation;
