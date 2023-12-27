import { userUpdateFormSchema } from "@root/validations";
import { dbProcedure } from "../middleware";
import { TRPCError } from "@trpc/server";
import { User } from "@root/models";
import { router } from "../trpc";
import * as z from "zod";

const emailInputValidation = z.object({ email: z.string().email() });
const idInputValidation = z.object({ id: z.string() });
const userUpdateValidation = z.intersection(userUpdateFormSchema, idInputValidation);
const changePasswordValidation = z.intersection(idInputValidation, z.object({ password: z.string() }));

const userRouter = router({
   getUserByEmail: dbProcedure.input(emailInputValidation).query(async function ({ input }) {
      try {
         const user = await User.findOne({ email: input.email });
         if (!user) throw new TRPCError({ code: "NOT_FOUND", message: "User not registered, signup instead" });
         return { user: user.getUser() };
      } catch (error: unknown) {
         if (error instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Some error occurred" });
      }
   }),

   getUserById: dbProcedure.input(idInputValidation).query(async function ({ input }) {
      try {
         const user = await User.findById(input.id);
         if (!user) throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
         return { user: user.getUser() };
      } catch (error: unknown) {
         if (error instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Some error occurred" });
      }
   }),

   changePassword: dbProcedure.input(changePasswordValidation).mutation(async function ({ input }) {
      try {
         const { id, password } = input;
         const user = await User.findById(id);
         if (!user) throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });

         user.password = password;
         await user.save();
         return { success: true };
      } catch (error: unknown) {
         if (error instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Some error occurred" });
      }
   }),

   updateUser: dbProcedure.input(userUpdateValidation).mutation(async function ({ input }) {
      try {
         const { id, ...values } = input;
         const user = await User.findByIdAndUpdate(id, values, { new: true });
         if (!user) throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
         return { user: user.getUser() };
      } catch (error: unknown) {
         if (error instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Some error occurred" });
      }
   }),

   deleteUser: dbProcedure.input(idInputValidation).mutation(async function ({ input }) {
      try {
         const user = await User.findByIdAndDelete(input.id);
         if (!user) throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
         return { success: true };
      } catch (error: unknown) {
         if (error instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Some error occurred" });
      }
   }),
});

export default userRouter;
