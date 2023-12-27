import * as z from "zod";

export const loginFormSchema = z.object({
   email: z.string().min(1, { message: "Please enter your e-mail" }).email({ message: "Please enter a valid e-mail" }),
   password: z.string().min(1, { message: "Please enter password" }),
});

export const forgotPasswordFormSchema = z.object({
   email: z.string().min(1, { message: "Please enter your e-mail" }).email({ message: "Please enter a valid e-mail" }),
});

export const resetPasswordFormSchema = z
   .object({
      password: z.string().min(1, { message: "Please enter password" }),
      confirmPassword: z.string().min(1, { message: "Please re-enter password" }),
   })
   .refine((data) => data.password === data.confirmPassword, { path: ["confirmPassword"], message: "Passwords do not match" });

export const signupFormSchema = z
   .object({
      name: z.string().min(1, { message: "Please enter your name" }),
      email: z.string().min(1, { message: "Please enter your e-mail" }).email({ message: "Please enter a valid e-mail" }),
      password: z.string().min(1, { message: "Please enter password" }),
      confirmPassword: z.string().min(1, { message: "Please re-enter password" }),
   })
   .refine((data) => data.password === data.confirmPassword, { path: ["confirmPassword"], message: "Passwords do not match" });

export type LoginFormType = z.infer<typeof loginFormSchema>;
export type ForgotPasswordType = z.infer<typeof forgotPasswordFormSchema>;
export type ResetPasswordType = z.infer<typeof resetPasswordFormSchema>;
export type SignupFormType = z.infer<typeof signupFormSchema>;
