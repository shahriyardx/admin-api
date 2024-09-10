import { z } from "zod"
import { desc, eq } from "drizzle-orm"

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { portfolioblogs } from "@/server/db/schema"
import { portfolioBlogSchema } from "@/schema"

export const portfolioRouter = createTRPCRouter({
	createBlog: protectedProcedure
		.input(portfolioBlogSchema)
		.mutation(async ({ ctx, input }) => {
			await ctx.db.insert(portfolioblogs).values(input)
		}),
	upadteBlog: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				data: portfolioBlogSchema,
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await ctx.db
				.update(portfolioblogs)
				.set(input.data)
				.where(eq(portfolioblogs.id, input.id))
		}),
	singleBlog: protectedProcedure
		.input(z.object({ blogId: z.string() }))
		.query(async ({ ctx, input }) => {
			const res = await ctx.db
				.select()
				.from(portfolioblogs)
				.where(eq(portfolioblogs.id, input.blogId))

			return res.length === 1 ? res[0] : undefined
		}),
	deleteBlog: protectedProcedure
		.input(z.object({ blogId: z.string() }))
		.mutation(async ({ ctx, input }) => {
			await ctx.db
				.delete(portfolioblogs)
				.where(eq(portfolioblogs.id, input.blogId))
		}),
	allBlogs: protectedProcedure.query(async ({ ctx }) => {
		return await ctx.db
			.select()
			.from(portfolioblogs)
			.orderBy(desc(portfolioblogs.createdAt))
	}),
})
