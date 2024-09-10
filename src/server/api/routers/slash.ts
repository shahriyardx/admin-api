import { z } from "zod"
import { desc, eq } from "drizzle-orm"

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "@/server/api/trpc"
import { slashblogs } from "@/server/db/schema"
import { slashBlogSchema } from "@/schema"

export const slashRouter = createTRPCRouter({
	hello: publicProcedure
		.input(z.object({ text: z.string() }))
		.query(({ input }) => {
			return {
				greeting: `Hello ${input.text}`,
			}
		}),
	createBlog: publicProcedure
		.input(slashBlogSchema)
		.mutation(async ({ ctx, input }) => {
			await ctx.db.insert(slashblogs).values(input)
		}),
	upadteBlog: publicProcedure
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
	singleBlog: publicProcedure
		.input(z.object({ blogId: z.string() }))
		.query(async ({ ctx, input }) => {
			const res = await ctx.db
				.select()
				.from(slashblogs)
				.where(eq(slashblogs.id, input.blogId))

			return res.length === 1 ? res[0] : undefined
		}),
	allBlogs: publicProcedure.query(async ({ ctx }) => {
		return await ctx.db
			.select()
			.from(slashblogs)
			.orderBy(desc(slashblogs.createdAt))
	}),
	getSecretMessage: protectedProcedure.query(() => {
		return "you can now see this secret message!"
	}),
})
