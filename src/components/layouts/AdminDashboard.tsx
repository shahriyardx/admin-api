import { cn } from "@/lib/utils"
import type { ComponentProps, ReactNode } from "react"
import Sidebar from "@/components/sidebar"
import { ScrollArea } from "../ui/scroll-area"
import RequireAuth from "../shared/RequireAuth"

type Props = ComponentProps<"div"> & {
	pageTitle?: ReactNode
}

const AdminDashboard = ({
	children,
	className,
	pageTitle,
	...props
}: Props) => {
	return (
		<RequireAuth>
			<div className={cn("grid grid-cols-[300px_auto]", className)} {...props}>
				<Sidebar />
				<ScrollArea className={cn(`h-screen pb-10 px-5`)}>
					<main className="max-w-5xl mx-auto">
						{pageTitle && <div className="py-3">{pageTitle}</div>}
						{children}
					</main>
				</ScrollArea>
			</div>
		</RequireAuth>
	)
}

export default AdminDashboard
