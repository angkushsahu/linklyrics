import mongoose from "mongoose";
import processEnv from "./env";

export default async function connectDB() {
   // if (mongoose.connections[0].readyState) return true;
   if (mongoose.connections[0].readyState) return true;

   try {
      await mongoose.connect(processEnv.DATABASE_URI);
      mongoose.set("strictQuery", true);
      return true;
   } catch (error: unknown) {
      if (error instanceof Error) throw new Error("Unable to connect to Database");
   }
}
