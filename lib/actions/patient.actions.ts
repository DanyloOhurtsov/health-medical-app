"use server";

import { CreateUserProps } from "@/types/types";
import { users } from "../appwrite.config";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";

// == Create a new user
export const createUser = async (user: CreateUserProps) => {
    try {
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        );

        return parseStringify(newUser);
    } catch (error: any) {
        if (error && error?.code === 409) {
            const existingUser = await users.list([
                Query.equal("email", [user.email]),
            ]);

            return existingUser?.users[0];
        }
        throw error;
    }
};

// == Get a user by ID
export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId);

        return parseStringify(user);
    } catch (error) {
        console.error(error);
    }
};
