import { db } from "@/server/db"
import { desc, eq } from "drizzle-orm"
import { portfolioblogs } from "@/server/db/schema"

import type { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const data = await db
		.select()
		.from(portfolioblogs)
		.where(eq(portfolioblogs.status, "published"))
		.orderBy(desc(portfolioblogs.createdAt))

	return res.json(data)
}

export default handler
