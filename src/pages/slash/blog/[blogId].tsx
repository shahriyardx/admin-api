import SlashBlogForms from "@/components/forms/SlashBlogForm"
import AdminDashboard from "@/components/layouts/AdminDashboard"
import { Button } from "@/components/ui/button"
import useParams from "@/hooks/use-params"
import { type SlashBlog, slashBlogSchema } from "@/schema"
import { db } from "@/server/db"
import { getFirst, slashblogs } from "@/server/db/schema"
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
	blog: SlashBlog
}

const UpdateBlog = ({ blog }: Props) => {
	const { blogId } = useParams<{ blogId: string }>()

	const { mutate } = api.slash.upadteBlog.useMutation({
		onSuccess: () => {
			toast.success("blog updated")
			fetch("https://ccbot.app/api/blog/revalidate", {
				method: "POST",
			})
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const form = useForm<SlashBlog>({
		resolver: zodResolver(slashBlogSchema),
		defaultValues: blog,
	})

	const updateBlog = (values: SlashBlog) => {
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
							<Link href="/slash/blog">See Blogs</Link>
						</div>
					</Button>
				</div>
			}
		>
			<div className="mt-5">
				<SlashBlogForms form={form} onSubmit={updateBlog} />
			</div>
		</AdminDashboard>
	)
}

export default UpdateBlog

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { blogId } = query as { blogId: string }

	const result = await db
		.select()
		.from(slashblogs)
		.where(eq(slashblogs.id, blogId))
		.then(getFirst)

	if (!result) {
		return {
			redirect: {
				destination: "/slash/blog",
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
