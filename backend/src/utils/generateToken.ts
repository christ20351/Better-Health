import jwt from "jsonwebtoken";

const secretkey1: string = process.env.tokenRefreshSecret || "refreshToken";
const secretkey2: string = process.env.tokenAccessSecret || "accessToken";


export const generateToken = async ({
  userId,
  role,
  workSpaceId,
}: {
  userId: string;
  role?: string;
  workSpaceId?: string
}) => {

 const refreshToken = jwt.sign({  userId,
  role,
  workSpaceId, }, secretkey1, { expiresIn: "1d" });
  const accessToken = jwt.sign({  userId,
  role,
  workSpaceId, }, secretkey2, { expiresIn: "1h" });
  return { refreshToken, accessToken };
};
