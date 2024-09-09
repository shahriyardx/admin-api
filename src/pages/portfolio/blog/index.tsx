import React from "react"
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

const PortfolioBlogs = () => {
	const { data: blogs } = api.portfolio.allBlogs.useQuery()
	console.log(blogs)

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
						<Button variant="destructive">Delete</Button>
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
					<Button asChild>
						<Link href="/portfolio/blog/create">Create</Link>
					</Button>
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
