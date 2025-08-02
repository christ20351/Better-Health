import { Insertable } from 'kysely';
import { db } from "../db/database"
import { Doctor } from '../db/types';


export const doctorIsInWorkSpace = async (userId: string) => {
    const doctorAndWorkspace = await db
      .selectFrom('doctors')
      .select(["workspaceId"])
      .where("doctors.userId" , "=" , userId)
      .executeTakeFirst()
    return doctorAndWorkspace
}

export const Alldoctors = async () => {
  const doctors = await db  
    .selectFrom("doctors")
    .selectAll("doctors")
    .executeTakeFirst()

  return doctors;
}

export const createDoctor = async (input: Insertable<Doctor>) => {
  const doctor = await db 
    .insertInto("doctors")
    .values(input)
    .returning([
      "doctors.userId",
      "doctors.id",
      "specialisation",
      "doctors.workspaceId",
      "doctors.city"
    ]
    )
    .executeTakeFirst()

  return doctor;
}

export const updateDoctor = async (input: Doctor , userId: string) => {
  const doctorUpdate = await db 
    .updateTable("doctors")
    .set(input)
    .where("doctors.userId", "=" , userId)
    .executeTakeFirst()
}

export const deleteDoctor = async (userId: string) => {
  const doctorDelete = await db 
    .deleteFrom("doctors")
    .where("doctors.userId" ,"=", userId)
    .executeTakeFirst()
}