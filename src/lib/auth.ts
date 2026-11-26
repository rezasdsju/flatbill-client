import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db('flatbill');

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            role: {
                type: ["super-admin", "association-admin", "caretaker", "flat-owner", "tenant"],
                defaultValue: 'tenant',
                input: false
            }
        }
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    plugins: [
        jwt(),
    ],
    database: mongodbAdapter(db, {
        client,
    }),
});