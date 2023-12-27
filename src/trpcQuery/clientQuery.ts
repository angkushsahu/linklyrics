import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@root/server";

export const trpc = createTRPCReact<AppRouter>({});
