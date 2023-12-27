import { connectDb } from "@root/config";
import { middleware, procedure } from "../trpc";
import { TRPCError } from "@trpc/server";

const dbMiddleware = middleware(async function ({ ctx, input, next }) {
   const connected = await connectDb();
   if (connected) return next();
   else throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
});

const dbProcedure = procedure.use(dbMiddleware);
export default dbProcedure;
