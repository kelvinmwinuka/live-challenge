import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { data } from "./data";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 3000);
    });
    return data;
  }),
  getPaginated: publicProcedure.query(() => {
    // Accepts offset, limit, searchTerm
    // * Search term will be empty if there's no product in the search box

    // 1. Filter by searchTerm
    // 2. Get the sub-array using the offset and the limit from the offset as the upper bound
    return {
      total: 10, // total after filter
      data, // The filtered + offset + limit data
    };
  }),
});
