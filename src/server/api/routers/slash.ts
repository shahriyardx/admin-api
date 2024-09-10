import { z } from "zod"
import { desc, eq } from "drizzle-orm"

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { slashblogs } from "@/server/db/schema"
import { slashBlogSchema } from "@/schema"

export const slashRouter = createTRPCRouter({
	createBlog: protectedProcedure
		.input(slashBlogSchema)
		.mutation(async ({ ctx, input }) => {
			await ctx.db.insert(slashblogs).values(input)
		}),
	upadteBlog: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				data: slashBlogSchema,
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await ctx.db
				.update(slashblogs)
				.set(input.data)
				.where(eq(slashblogs.id, input.id))
		}),
	singleBlog: protectedProcedure
		.input(z.object({ blogId: z.string() }))
		.query(async ({ ctx, input }) => {
			const res = await ctx.db
				.select()
				.from(slashblogs)
				.where(eq(slashblogs.id, input.blogId))

			return res.length === 1 ? res[0] : undefined
		}),
	deleteBlog: protectedProcedure
		.input(z.object({ blogId: z.string() }))
		.mutation(async ({ ctx, input }) => {
			await ctx.db.delete(slashblogs).where(eq(slashblogs.id, input.blogId))
		}),
	allBlogs: protectedProcedure.query(async ({ ctx }) => {
		return await ctx.db
			.select()
			.from(slashblogs)
			.orderBy(desc(slashblogs.createdAt))
	}),
})
