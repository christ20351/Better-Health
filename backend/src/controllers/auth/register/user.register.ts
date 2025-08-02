import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import { createUser, findUserByEmail } from "../../../model/user.model";
import bcrypt from "bcrypt";
import { generateToken } from "../../../utils/generateToken";
export const register = async (req: Request, res: Response) => {
  try {
    // registerSchema.parse(req.body);

    //  const foundUserAsMember = await getMemberByEmail(req.body.email);
    //  const memberId = await findMemberByemail(req.body.email);
    //  console.log(foundUserAsMember)

    //  if(foundUserAsMember && memberId) {
    //     console.log("user is a member");
    //     return registerMember(req, res , { memberId, foundUserAsMember });
    //  }

    const foundUser = await findUserByEmail(req.body.email);
    if (foundUser) {
      res.json({ error: "This email is already in use !" });
      return;
    }

    const newUser = {
      id: uuidv4(),
      ...req.body,
    };

    console.log(newUser);

    const { accessToken, refreshToken } = await generateToken({
      userId: newUser.id,
    });
    newUser.tokenRefresh = refreshToken;

    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(req.body.password, salt);
    newUser.password = hashedPwd;

    const user = await createUser(newUser);

    res
      .status(200)
      .cookie("token", { refreshToken, accessToken }, { secure: true })
      .json({  user  , message:"connection reussit"});
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "unexpected an error" });
  }
};
