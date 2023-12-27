import { httpBatchLink } from "@trpc/client";
import { appRouter } from "@root/server";
import { processEnv } from "@root/config";

const url = processEnv.NODE_ENV === "development" ? "http://localhost:3000" : "";

export const serverQuery = appRouter.createCaller({
   links: [httpBatchLink({ url: `${url}/api/trpc` })],
});
