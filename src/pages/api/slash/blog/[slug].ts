import { db } from "@/server/db"
import { and, eq, ne } from "drizzle-orm"
import { getFirst, slashblogs } from "@/server/db/schema"

import type { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { slug } = req.query

	const data = await db
		.select()
		.from(slashblogs)
		.where(
			and(ne(slashblogs.status, "draft"), eq(slashblogs.slug, slug as string)),
		)
		.then(getFirst)

	return res.json(data)
}

export default handler
