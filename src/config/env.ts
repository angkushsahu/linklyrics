import * as z from "zod";

const envSchema = z.object({
   DATABASE_URI: z.string().min(1),
});

const processEnv = envSchema.parse(process.env);
export default processEnv;
