import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { getFirst, settings } from "@/server/db/schema"
import { z } from "zod"

export const settingsRouter = createTRPCRouter({
	settings: protectedProcedure.query(async ({ ctx }) => {
		const existing = await ctx.db.select().from(settings).then(getFirst)

		if (!existing) {
			await ctx.db.insert(settings).values({}).then(getFirst)
			return await ctx.db.select().from(settings).then(getFirst)
		}

		return existing
	}),
	updateSettings: protectedProcedure
		.input(
			z.object({
				portfolioBlogWebhook: z.string().optional(),
				slashBlogWebhook: z.string().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await ctx.db.update(settings).set(input)
		}),
})
