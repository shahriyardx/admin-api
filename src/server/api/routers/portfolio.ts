import { z } from "zod"
import { desc, eq } from "drizzle-orm"

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "@/server/api/trpc"
import { portfolioblogs } from "@/server/db/schema"
import { portfolioBlogSchema } from "@/schema"

export const portfolioRouter = createTRPCRouter({
	hello: publicProcedure
		.input(z.object({ text: z.string() }))
		.query(({ input }) => {
			return {
				greeting: `Hello ${input.text}`,
			}
		}),
	createBlog: publicProcedure
		.input(portfolioBlogSchema)
		.mutation(async ({ ctx, input }) => {
			await ctx.db.insert(portfolioblogs).values(input)
		}),
	upadteBlog: publicProcedure
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
	singleBlog: publicProcedure
		.input(z.object({ blogId: z.string() }))
		.query(async ({ ctx, input }) => {
			const res = await ctx.db
				.select()
				.from(portfolioblogs)
				.where(eq(portfolioblogs.id, input.blogId))

			return res.length === 1 ? res[0] : undefined
		}),
	allBlogs: publicProcedure.query(async ({ ctx }) => {
		return await ctx.db
			.select()
			.from(portfolioblogs)
			.orderBy(desc(portfolioblogs.createdAt))
	}),
	getSecretMessage: protectedProcedure.query(() => {
		return "you can now see this secret message!"
	}),
})
