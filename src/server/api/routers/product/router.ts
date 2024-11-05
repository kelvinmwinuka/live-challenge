import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { data } from "./data";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    return data;
  }),
  getPaginated: publicProcedure.query(() => {
    return data;
  }),
});
