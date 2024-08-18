"use server";

import { CreateUserProps, RegisterUserProps } from "@/types/types";
import {
    BUCKET_ID,
    DATABASE_ID,
    databases,
    ENDPOINT,
    PATIENT_COLLECTION_ID,
    PROJECT_ID,
    storage,
    users,
} from "../appwrite.config";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";

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

// == Register a user
export const registerPatient = async ({
    identificationDocument,
    ...patient
}: RegisterUserProps) => {
    try {
        let file;

        if (identificationDocument) {
            const inputFile = InputFile.fromBuffer(
                identificationDocument?.get("blobFile") as Blob,
                identificationDocument?.get("fileName") as string
            );

            file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);

            const newPatient = await databases.createDocument(
                DATABASE_ID!,
                PATIENT_COLLECTION_ID!,
                ID.unique(),
                {
                    identificationDocumentId: file?.$id || null,
                    identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
                    ...patient,
                }
            );

            return parseStringify(newPatient);
        }
    } catch (error) {
        console.error(error);
    }
};

// == Get a patient by ID
export const getPatient = async (userId: string) => {
    try {
        const patients = await databases.listDocuments(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            [Query.equal("$id", userId)]
        );

        return parseStringify(patients.documents[0]);
    } catch (error) {
        console.error(error);
    }
};
