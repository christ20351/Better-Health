import z from "zod";

export const workSpaceZ = z.object({
  name: z.string(),
  description: z.string(),
  address: z.string(),
  phone: z.string(),
})