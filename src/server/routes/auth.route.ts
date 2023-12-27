import { forgotPasswordFormSchema, loginFormSchema, signupFormSchema } from "@root/validations";
import sendResetEmail from "@root/app/api/sendResetMail";
import { dbProcedure } from "../middleware";
import { hexConversion } from "@root/lib";
import { TRPCError } from "@trpc/server";
import { User } from "@root/models";
import { router } from "../trpc";
import * as z from "zod";

const forgotPasswordValidation = z.intersection(forgotPasswordFormSchema, z.object({ originUrl: z.string() }));
const resetPasswordValidation = z.object({ resetUrl: z.string(), password: z.string() });

const authRouter = router({
   register: dbProcedure.input(signupFormSchema).mutation(async function ({ input }) {
      try {
         const { confirmPassword, email, name, password } = input;
         if (password !== confirmPassword) throw new TRPCError({ code: "BAD_REQUEST", message: "Password fields should match" });

         const alreadyExists = await User.findOne({ email });
         if (alreadyExists) throw new TRPCError({ code: "CONFLICT", message: "Already registered, login instead" });

         const user = await User.create({ email, name, password });
         if (!user) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Unable to create user" });

         return { user: user.getUser() };
      } catch (error: unknown) {
         if (error instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Some error occurred" });
      }
   }),

   login: dbProcedure.input(loginFormSchema).mutation(async function ({ input }) {
      try {
         const { email, password } = input;

         const user = await User.findOne({ email });
         if (!user) throw new TRPCError({ code: "NOT_FOUND", message: "User not registered, signup instead" });

         if (!(await user.comparePassword(password)))
            throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid Credentials" });

         return { user: user.getUser() };
      } catch (error: unknown) {
         if (error instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Some error occurred" });
      }
   }),

   forgotPassword: dbProcedure.input(forgotPasswordValidation).mutation(async function ({ input }) {
      try {
         const { email, originUrl } = input;

         const user = await User.findOne({ email });
         if (!user)
            throw new TRPCError({
               code: "NOT_FOUND",
               message:
                  "This email address is not registered with us. Make sure you entered it correctly or create a new account.",
            });

         const resetToken = user.generateResetPasswordToken();
         const result = await sendResetEmail({ email, originUrl, resetToken });
         if (!result.success)
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Unable to send e-mail, please try again" });

         await user.save();

         return {
            message: `You're almost there! We've emailed a link to ${email} to reset your password. Check your inbox and click on the link to create a new password.`,
         };
      } catch (error: unknown) {
         if (error instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Some error occurred" });
      }
   }),

   resetPassword: dbProcedure.input(resetPasswordValidation).mutation(async function ({ input }) {
      try {
         const { password, resetUrl } = input;

         const resetPasswordToken = hexConversion(resetUrl);
         const user = await User.findOne({ resetPassword: resetPasswordToken });
         if (!user) throw new TRPCError({ code: "NOT_FOUND", message: "User not found." });

         user.password = password;
         user.resetPassword = "";
         await user.save();

         return { message: "Password updated successfully, login with new credentials." };
      } catch (error: unknown) {
         if (error instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Some error occurred" });
      }
   }),
});

export default authRouter;
