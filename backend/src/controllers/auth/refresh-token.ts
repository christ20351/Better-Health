// export const refreshToken = async (req: Request, res: Response) => {
//   try {
//     const token = req.cookies["token"];
//     const tok = token?.refreshToken;

//     const verify = jwt.verify(
//       tok,
//       process.env.REFRESH_TOKEN_SECRET!
//     ) as AuthenticatedUser;
//     if (!verify) {
//       res.status(403).json({ error: "unAuthorized" });
//       return;
//     }

//     const foundUser = await findUserById(verify.id);
//     console.log(token);
//     if (!foundUser) {
//       res.status(401).json({ error: "Not authentificated" });
//       return;
//     }
//     // const decoded = jwt.verify(foundUser.tokenRefresh! , process.env.REFRESH_TOKEN_SECRET!)
//     // TODO: get user with orgId and role if existing
//     const { accessToken, refreshToken } = createToken({
//       id: foundUser.id,
//       orgId: verify.orgId,
//       role: verify.role,
//     });
//     // newRefreshToken
//     foundUser.tokenRefresh = refreshToken;

//     await updateUser(foundUser.id, {
//       tokenRefresh: refreshToken,
//     });

//     res
//       .cookie("token", { refreshToken, accessToken }, { secure: true })
//       .json({ user: foundUser, accessToken });
//   } catch (error) {
//     res.status(401).json({ error: "token expired or not valable" });
//   }
// };