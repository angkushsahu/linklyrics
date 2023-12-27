import * as z from "zod";

export interface IUser {
   name: string;
   email: string;
   id: string;
   createdAt: string;
}

export const userUpdateFormSchema = z.object({
   name: z.string().min(1, { message: "Please enter your name" }),
   email: z.string().min(1, { message: "Please enter your e-mail" }).email({ message: "Please enter a valid e-mail" }),
});

export const changePasswordFormSchema = z
   .object({
      password: z.string().min(1, { message: "Please enter password" }),
      confirmPassword: z.string().min(1, { message: "Please re-enter password" }),
   })
   .refine((data) => data.password === data.confirmPassword, { path: ["confirmPassword"], message: "Passwords do not match" });

export type UserUpdateFormType = z.infer<typeof userUpdateFormSchema>;
export type changePasswordFormType = z.infer<typeof changePasswordFormSchema>;
