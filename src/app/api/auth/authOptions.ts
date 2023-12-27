import CredentialsProvider from "next-auth/providers/credentials";
import { serverQuery } from "@root/trpcQuery/serverQuery";
import type { IUser } from "@root/validations";
import type { AuthOptions } from "next-auth";
import { processEnv } from "@root/config";
import { loginRoute } from "@root/lib";

const authOptions: AuthOptions = {
   pages: {
      signIn: loginRoute,
   },
   session: {
      strategy: "jwt",
      maxAge: processEnv.COOKIE_AGE,
   },
   secret: processEnv.NEXTAUTH_SECRET,
   debug: processEnv.NODE_ENV === "development",
   providers: [
      CredentialsProvider({
         name: "credentials",
         credentials: {
            email: { label: "E-mail", type: "email", placeholder: "Enter your e-mail" },
         },
         async authorize(credentials) {
            try {
               if (!credentials || !credentials.email) throw new Error("Enter all required credentials");
               const { user } = await serverQuery.user.getUserByEmail({ email: credentials.email });
               return user;
            } catch (error: unknown) {
               if (error instanceof Error) throw new Error(error.message);
               return null;
            }
         },
      }),
   ],
   callbacks: {
      jwt({ token, user, session, trigger }) {
         if (user) {
            token = { ...token, user: user as IUser };
         }
         if (trigger === "update") {
            token.user = session.user as IUser;
         }
         return token;
      },
      session({ session, token, trigger }) {
         session.user = token.user;
         return session;
      },
   },
};

export default authOptions;
