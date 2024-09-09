import { cn } from "@/lib/utils"
import React, { type ComponentProps } from "react"

type Props = ComponentProps<"div">

const ToolbarButtons = ({ children, className }: Props) => {
	return (
		<div
			className={cn(
				`
                rounded-md overflow-hidden flex 
                [&>*]:flex [&>*]:items-center 
                [&>*]:justify-center [&>*]:bg-[orange] 
                [&>*]:dark:bg-zinc-900
                [&>*]:w-9 [&>*]:h-9 [&>*]:dark:text-zinc-300
                [&>*]:cursor-pointer
            `,
				className,
			)}
		>
			{children}
		</div>
	)
}

export default ToolbarButtons
