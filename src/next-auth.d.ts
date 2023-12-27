import NextAuth, { type User, type DefaultSession } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import { IUser } from "./validations";

declare module "next-auth" {
   interface Session {
      user: IUser & DefaultSession["user"];
   }
}

declare module "next-auth/jwt" {
   interface JWT {
      user: IUser;
   }
}
