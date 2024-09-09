import { db } from "@/server/db"
import { and, desc, eq, ne } from "drizzle-orm"
import { getFirst, portfolioblogs } from "@/server/db/schema"

import type { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { slug } = req.query

	const data = await db
		.select()
		.from(portfolioblogs)
		.where(
			and(
				ne(portfolioblogs.status, "draft"),
				eq(portfolioblogs.slug, slug as string),
			),
		)
		.then(getFirst)

	return res.json(data)
}

export default handler
