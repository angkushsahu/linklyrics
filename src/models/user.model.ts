import { type Document, type InferSchemaType, type Model, model, models, Schema } from "mongoose";
import { generateRandomHex, hexConversion } from "@root/lib";
import { compare, genSalt, hash } from "bcrypt";
import type { IUser } from "@root/validations";

const userSchema = new Schema(
   {
      name: { type: String, required: [true, "Please enter your name"] },
      email: { type: String, required: [true, "Please enter your e-mail"], unique: true, index: true },
      password: { type: String, required: [true, "Please enter a password"] },
      resetPassword: { type: String, default: "" },
   },
   { timestamps: true }
);

type IUserSchema = InferSchemaType<typeof userSchema>;

export interface IUserMethods extends Document {
   comparePassword(enteredPassword: string): Promise<boolean>;
   generateResetPasswordToken(): string;
   getUser(): IUser;
}

export type IUserModel = IUserSchema & IUserMethods;

// hashing password
userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) {
      next();
   }
   const salt = await genSalt(10);
   this.password = await hash(this.password, salt);
});

// compare hashed password
userSchema.methods.comparePassword = async function (this: IUserModel, enteredPassword: string) {
   return await compare(enteredPassword, this.password);
};

userSchema.methods.generateResetPasswordToken = function (this: IUserModel) {
   const resetToken = generateRandomHex();
   this.resetPassword = hexConversion(resetToken);
   return resetToken;
};

userSchema.methods.getUser = function (this: IUserModel): IUser {
   const formattedDate = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(
      this.createdAt
   );

   return {
      name: this.name,
      email: this.email,
      id: this.id,
      createdAt: formattedDate,
   };
};

const UserModel: Model<IUserModel> = models["user"] || model<IUserModel>("user", userSchema);
export default UserModel;
