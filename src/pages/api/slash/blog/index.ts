import { db } from "@/server/db"
import { desc, eq } from "drizzle-orm"
import { slashblogs } from "@/server/db/schema"

import type { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const data = await db
		.select()
		.from(slashblogs)
		.where(eq(slashblogs.status, "published"))
		.orderBy(desc(slashblogs.createdAt))

	return res.json(data)
}

export default handler
