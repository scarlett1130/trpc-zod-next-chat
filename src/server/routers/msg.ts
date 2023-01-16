import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { t } from "../trpc";
import { INTERNAL_SERVER_ERROR } from "./../../utils/constants";

export const msgRouter = t.router({
  list: t.procedure.query(async ({ ctx }) => {
    try {
      const messages = await ctx.msg.find().toArray();
      return messages;
    } catch (_err) {
      const err = _err as Error;
      throw new TRPCError({
        code: INTERNAL_SERVER_ERROR,
        message: "Something went wrong. Failed to fetch messages!",
        cause: err.message,
      });
    }
  }),

  add: t.procedure
    .input(
      z.object({
        text: z.string(),
        createdAt: z.date(),
        creator: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const result = await ctx.msg.insertOne(input);
        return {
          _id: result.insertedId,
          text: input.text,
          createdAt: input.createdAt,
          creator: input.creator,
        };
      } catch (_err) {
        const err = _err as Error;
        throw new TRPCError({
          code: INTERNAL_SERVER_ERROR,
          message: "Something went wrong. Failed to send message!",
          cause: err.message,
        });
      }
    }),
});
