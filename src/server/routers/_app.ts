import { t } from "../trpc";
import { msgRouter } from "./msg";

export const appRouter = t.router({
  msg: msgRouter,
});

export type AppRouter = typeof appRouter;
