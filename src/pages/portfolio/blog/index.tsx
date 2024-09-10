import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import AdminDashboard from "@/components/layouts/AdminDashboard"
import { api } from "@/utils/api"
import {
	getCoreRowModel,
	getFilteredRowModel,
	useReactTable,
	type ColumnDef,
} from "@tanstack/react-table"
import type { PortfolioBlog } from "@/server/db/schema"
import { DataTable } from "@/components/ui/data-table"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import PoerfolioBlogSettings from "@/components/webhooks/PoerfolioBlogSettings"
import { CogIcon } from "lucide-react"
import useSettings from "@/hooks/use-settings"

const PortfolioBlogs = () => {
	const settings = useSettings()

	const { data: blogs, refetch } = api.portfolio.allBlogs.useQuery()
	const { mutate: deleteBlog } = api.portfolio.deleteBlog.useMutation({
		onSuccess: () => {
			toast.success("blog deleted")
			refetch()
			if (settings?.portfolioBlogWebhook) {
				fetch(settings?.portfolioBlogWebhook, {
					method: "POST",
				})
			}
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const columns: ColumnDef<PortfolioBlog>[] = [
		{ accessorKey: "title", header: "Title" },
		{ accessorKey: "description", header: "Description" },
		{
			accessorKey: "status",
			header: "Status",
			cell: ({ getValue }) => {
				const val = getValue<"published" | "unlisted" | "draft">()

				return (
					<Badge variant="outline" className="gap-2">
						<div
							className={cn(
								"w-2 h-2 rounded-full",
								val === "published" && "bg-green-500",
								val === "unlisted" && "bg-sky-500",
								val === "draft" && "bg-red-500",
							)}
						/>
						<span className="capitalize">{getValue<string>()}</span>
					</Badge>
				)
			},
		},
		{
			header: "Actions",
			cell: ({ row }) => {
				return (
					<div className="flex items-center gap-2">
						<Button variant="secondary" asChild>
							<Link href={`/portfolio/blog/${row.original.id}`}>Edit</Link>
						</Button>

						<Dialog>
							<DialogTrigger>
								<Button variant="destructive">Delete</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Are you absolutely sure?</DialogTitle>
									<DialogDescription>
										This action cannot be undone. This will permanently delete
										your this blog from database
									</DialogDescription>
								</DialogHeader>
								<DialogFooter>
									<DialogClose>
										<Button variant="secondary">Cancel</Button>
									</DialogClose>
									<DialogClose>
										<Button
											onClick={() => {
												deleteBlog({ blogId: row.original.id })
											}}
											type="button"
											variant="destructive"
										>
											Delete
										</Button>
									</DialogClose>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				)
			},
		},
	]
	const table = useReactTable({
		data: blogs || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	})
	return (
		<AdminDashboard
			pageTitle={
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-bold">Portfolio Blogs</h2>
					<div className="flex items-center gap-2">
						<Button asChild>
							<Link href="/portfolio/blog/create">Create</Link>
						</Button>
						<PoerfolioBlogSettings>
							<Button variant="outline" size="icon">
								<CogIcon />
							</Button>
						</PoerfolioBlogSettings>
					</div>
				</div>
			}
		>
			<div className="mt-5">
				<DataTable table={table} />
			</div>
		</AdminDashboard>
	)
}

export default PortfolioBlogs
