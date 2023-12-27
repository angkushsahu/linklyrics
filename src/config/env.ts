import * as z from "zod";

const envSchema = z.object({
   DATABASE_URI: z.string().url(),
   NODE_ENV: z.enum(["development", "production", "testing"]).default("development"),
   // authentication
   NEXTAUTH_URL: z.string(),
   NEXTAUTH_SECRET: z.string(),
   COOKIE_AGE: z.coerce.number(),
   // authentication
   // mailing service
   MAIL: z.string(),
   MAIL_PASS: z.string(),
   MAIL_SERVICE: z.string(),
   // mailing service
});

const processEnv = envSchema.parse(process.env);
export default processEnv;
