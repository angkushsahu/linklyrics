import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

export const { middleware, procedure, router } = t;
