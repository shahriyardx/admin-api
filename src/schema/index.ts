import z from "zod"

export const portfolioBlogSchema = z.object({
	title: z.string({ message: "title is required " }),
	description: z.string({ message: "description is required" }),
	slug: z.string({ message: "slug is required" }),
	content: z.string({ message: "content is required" }),
	status: z.enum(["published", "draft", "unlisted"]).default("published"),
	categories: z
		.array(z.string())
		.min(1, { message: "please select minimum 1 category" })
		.default([]),
})

export type PortfolioBlog = z.infer<typeof portfolioBlogSchema>
