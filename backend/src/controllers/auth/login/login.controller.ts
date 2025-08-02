import { Request, Response } from "express";
import { LoginSchema } from "../../../schema/login.schema";
import { findUserByEmail, updateUser } from "../../../model/user.model";
import bcrypt from "bcrypt";
import { generateToken } from "../../../utils/generateToken";
import { doctorIsInWorkSpace } from "../../../model/doctor.model";

export const login = async (req: Request, res: Response) => {
  try {

    const { email, password } = LoginSchema.parse(req.body);


    const user = await findUserByEmail({email:email});

    if (!user) {
      res
        .status(401)
        .json({ error: "email or password invalid ,  please check" });
      return;
    }

    const pwd = bcrypt.compareSync(password, user.password);
    if (!pwd) {
      res
        .status(401)
        .json({ error: "email or password invalid ,  please check" });
      return;
    }
    req.body.id = user.id;
    // req.userId = user.id

  
   const doctorAndWorkSpace = await doctorIsInWorkSpace({userId : user.id});


    console.log(doctorAndWorkSpace);
    if (doctorAndWorkSpace) {
      console.log("doctor is register  in a workspace");
      console.log(doctorAndWorkSpace.workspaceId);

      const { accessToken, refreshToken } = await generateToken({
        userId: user.id,
        workSpaceId: doctorAndWorkSpace.workspaceId,
        role: "doctor",
      });

      user.tokenRefresh = refreshToken;
      await updateUser(user.id, { tokenRefresh: refreshToken });
      
      res
        .cookie("token", { refreshToken, accessToken }, { secure: true })
        .json({ user, accessToken });

      // const route = useRouter()
      return;
    }

    const { accessToken, refreshToken } = await generateToken({ userId: user.id });
    user.tokenRefresh = refreshToken;
    await updateUser(user.id, { tokenRefresh: refreshToken });

    res
      .cookie("token", { refreshToken, accessToken }, { secure: true })
      .json({ user, accessToken });

  } catch (error) {
    console.log(error);
  }
};