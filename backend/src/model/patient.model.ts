import { Insertable, UpdateObject } from 'kysely';
import { db } from "../db/database"
import { Patient } from '../db/types';


export const Alldoctors = async () => {
  const doctors = await db  
    .selectFrom("patients")
    .selectAll("patients")
    .executeTakeFirst()

  return doctors;
}

export const createDoctor = async (input: Insertable<Patient>) => {
  const patient = await db 
    .insertInto("patients")
    .values(input)
    .returning([
        "patients.id",
        "patients.userId",
        "patients.city",
        "patients.age",
        "patients.birthday",
        "patients.placeOfBirth"
    ]
    )
    .executeTakeFirst()

  return patient;
}

export const updateDoctor = async (input: Patient , userId: string) => {
  const doctorUpdate = await db 
    .updateTable("patients")
    .set(input)
    .where("patients.userId", "=" , userId)
    .executeTakeFirst()
}

