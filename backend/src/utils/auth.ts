import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { kyselyDialect } from "../db/database";
import { customSession, emailOTP, multiSession } from "better-auth/plugins";
import { sendEmail } from "./sendEmail";
import { Resend } from "resend";

export const resend = new Resend("re_DuVy7vjV_P7PhiV7ADBoHnp8c1T3UUCKG");

export const auth = betterAuth({
  database: kyselyDialect,
  emailAndPassword: {
    sendOnSignUp: true,
    minPasswordLength: 8,
    maxPasswordLength: 20,
    requireEmailVerification: true,
    enabled: true,
    autoSignIn: false,
  },

  emailVerification: {
    sendOnSignUp: true, // Automatically sends a verification email at signup
    autoSignInAfterVerification: true, // Automatically signIn the user after verification
    sendVerificationEmail: async ({
      user,
      url,
    }: {
      user: any;
      url: string;
    }) => {
      const session = (await auth.$context).session;
      const name = session?.user.name;
      await sendEmail({
        to: user.email,
        subject: "Email Verification",
        text: `Salut ${name}`,
        html: `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body>
          <p style="font-size:40px , font-weight:bold">
            Vous avez rejoint Best-Health , pour continuez veullez
            verifier votre email , en cliquant <a href=${url}>ici</a>
          </p>
        </body>
      </html>`,
      });
    },
    async afterEmailVerification(user: any, request: any) {
      // Votre logique personnalisée ici
      console.log(`${user.email} has been successfully verified!`);
    },
  },

  // sendResetPassword: async ({ user, url, token }, request) => {
  //   await sendEmail({
  //     to: user.email,
  //     subject: "Reset your password",
  //     text: `Click the link to reset your password: ${url}`,
  //   });
  // },

  // onPasswordReset: async ({ user }, request) => {
  //   // your logic here
  //   console.log(`Password for user ${user.email} has been reset.`);
  // },
  trustedOrigins: [
    "http://localhost:5000",
    "http://localhost:8081",
    "health://**",
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 3, // 7 days
    updateAge: 60 * 60 * 24 * 1, // 1 day (every 1 day the session expiration is updated)
    freshAge: 60 * 5,
  },
  cookieCache: {
    enabled: true,
    maxAge: 5 * 60, // Cache duration in seconds
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      redirectURI: "http://localhost:5000/api/auth/callback/google",
      accessType: "offline",
      prompt: "select_account+consent",
    },
  },
  plugins: [
    expo(),
    multiSession({
      maximumSessions: 3,
    }),
    // emailOTP({
    //   overrideDefaultEmailVerification: true,
    //   async sendVerificationOTP({ email, otp, type }) {
    //     // Implement the sendVerificationOTP method to send the OTP to the user's email address
    //   },
    // }),
    customSession(async ({ user, session }, ctx) => {
      const role = "";

      return {
        role,
        user,
        session,
      };
    }),
  ],
  baseURL: "http://localhost:5000",
});

//https://www.better-auth.com/docs/authentication/email-password#forget-password
//https://www.better-auth.com/docs/concepts/email