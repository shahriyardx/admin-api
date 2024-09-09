import PortfolioBlogForms from "@/components/forms/PortfolioBlogForms"
import AdminDashboard from "@/components/layouts/AdminDashboard"
import { Button } from "@/components/ui/button"
import useParams from "@/hooks/use-params"
import { type PortfolioBlog, portfolioBlogSchema } from "@/schema"
import { db } from "@/server/db"
import { getFirst, portfolioblogs } from "@/server/db/schema"
import { api } from "@/utils/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { eq } from "drizzle-orm"
import { kebabCase } from "lodash"
import { ChevronLeft } from "lucide-react"
import type { GetServerSideProps } from "next"
import Link from "next/link"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type Props = {
	blog: PortfolioBlog
}

const UpdateBlog = ({ blog }: Props) => {
	const { blogId } = useParams<{ blogId: string }>()

	const { mutate } = api.portfolio.upadteBlog.useMutation({
		onSuccess: () => {
			toast.success("blog updated")
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const form = useForm<PortfolioBlog>({
		resolver: zodResolver(portfolioBlogSchema),
		defaultValues: blog,
	})

	const updateBlog = (values: PortfolioBlog) => {
		mutate({ id: blogId, data: values })
	}

	const slug = kebabCase(form.watch("title"))

	useEffect(() => {
		form.setValue("slug", slug)
	}, [slug, form.setValue])

	return (
		<AdminDashboard
			pageTitle={
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-bold">Edit Blog</h2>
					<Button asChild variant="secondary">
						<div>
							<ChevronLeft size={15} className="mr-2" />
							<Link href="/portfolio/blog">See Blogs</Link>
						</div>
					</Button>
				</div>
			}
		>
			<div className="mt-5">
				<PortfolioBlogForms form={form} onSubmit={updateBlog} />
			</div>
		</AdminDashboard>
	)
}

export default UpdateBlog

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { blogId } = query as { blogId: string }

	const result = await db
		.select()
		.from(portfolioblogs)
		.where(eq(portfolioblogs.id, blogId))
		.then(getFirst)

	if (!result) {
		return {
			redirect: {
				destination: "/portfolio/blog",
				permanent: false,
			},
		}
	}

	return {
		props: {
			blog: {
				...result,
				createdAt: result.createdAt.toISOString(),
				updatedAt: result.updatedAt?.toISOString(),
			},
		},
	}
}
