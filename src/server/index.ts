import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import { router } from "./trpc";

export const appRouter = router({
   auth: authRouter,
   user: userRouter,
});

export type AppRouter = typeof appRouter;
