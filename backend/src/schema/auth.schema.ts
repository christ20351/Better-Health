import { Specialisation } from './../db/types';
import z from "zod";

export const userZ = z.object({
    name: z.string(),
    email: z.string().email(),
    emailVerified: z.string().email(),
    image: z.string().optional(),
})

export const patientZ = z.object({
    birthday: z.string(),
    placeOfBirth: z.string(),
    city: z.string(),
    age: z.number()
})


export const doctorZ = z.object({
    Specialisation: z.string(),
    city: z.string(),
})

