import { createRouter } from "./context";
import { z } from "zod";
import { createNextApiHandler } from "@trpc/server/adapters/next";

export const uploadRouter = createRouter()
  .mutation("uploadFile", {
    input: z.object({
      file: z.string(),
      id: z.string().uuid(),
    }),
    async resolve({ ctx, input }) {
      await ctx.prisma.file.create({
        data: {
          id: input.id,
          b64: input.file,
        },
      });
      return input.id;
    },
  })
  .query("getFile", {
    input: z.object({
      id: z.string().uuid(),
    }),
    async resolve({ ctx, input }) {
      console.log(ctx, input);
      return await ctx.prisma.file.findMany();
    },
  });
