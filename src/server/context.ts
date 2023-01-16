import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { getDB } from "../utils/mongodb";

export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions
) => {
  const dbName = process.env.DATABASE ?? "";
  const collectionName = process.env.COLLECTION ?? "";

  const db = getDB(dbName);
  const msg = db.collection(collectionName);

  return {
    req: opts?.req,
    msg,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
