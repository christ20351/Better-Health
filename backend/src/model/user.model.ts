import { Insertable, Updateable } from "kysely"
import { db } from "../db/database"
import { User } from "../db/types"


export const createUser = async (input: Insertable<User>) => {
  const res = await db
    .insertInto("user")
    .values(input)
    .returning([
      "id",
      "name",
      "email",
      "image",
      "tokenRefresh",
      "createdAt",
      "updatedAt",
    ])
    .executeTakeFirst();

  return res;
};

export const findUserByEmail = async ({email}:{email:string}) => {

  const foundUser = await  db
    .selectFrom("user")
    .selectAll()
    .where("user.email", "=" , email )
    .executeTakeFirst()

  return foundUser 
}

export const findUserById = async ({user}:{user:User}) => {

  const foundUser = await db
    .selectFrom("user")
    .where("user.id", "=" , user.id )
    .executeTakeFirst()

  return foundUser
}


export const updateUser = async (id: string, data: Updateable<User>) => {
  const res = await db
    .updateTable("user")
    .set({ ...data })
    .where("user.id", "=", id)
    .executeTakeFirst();

  return res;
};