import { Listing, Reservation, User } from "@prisma/client";

//it will omit the createdAt, updatedAt, emailVerified tyes from User schema and replaces it wil new types of it
export type SafeUser = Omit< User, "createdAt" | "updatedAt" | "emailVerified" > & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};
