import PortfolioBlogForms from "@/components/forms/PortfolioBlogForms"
import AdminDashboard from "@/components/layouts/AdminDashboard"
import { Button } from "@/components/ui/button"
import { type PortfolioBlog, portfolioBlogSchema } from "@/schema"
import { api } from "@/utils/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { kebabCase } from "lodash"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const CreateBlog = () => {
	const form = useForm<PortfolioBlog>({
		resolver: zodResolver(portfolioBlogSchema),
	})

	const { mutate: insertBlog } = api.portfolio.createBlog.useMutation({
		onSuccess: () => {
			toast.success("blog created")
			form.reset()

			fetch("https://shahriyar.dev/api/blog/webhook", {
				method: "POST",
			})
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const slug = kebabCase(form.watch("title"))

	const createBlog = (values: PortfolioBlog) => {
		insertBlog(values)
	}

	useEffect(() => {
		form.setValue("slug", slug)
	}, [slug, form.setValue])

	return (
		<AdminDashboard
			pageTitle={
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-bold">Create Blog</h2>
					<Button variant="secondary" asChild>
						<div>
							<ChevronLeft size={15} className="mr-2" />
							<Link href="/portfolio/blog">See Blogs</Link>
						</div>
					</Button>
				</div>
			}
		>
			<div className="mt-5">
				<PortfolioBlogForms form={form} onSubmit={createBlog} />
			</div>
		</AdminDashboard>
	)
}

export default CreateBlog
