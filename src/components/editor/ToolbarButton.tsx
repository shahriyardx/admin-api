import React, { useContext } from "react"
import { Button, type ButtonProps } from "../ui/button"
import { ToolbarContext } from "./ToolbarContext"

type Props = ButtonProps & {
	command: string
}

const ToolbarButton = ({ children, command }: Props) => {
	const context = useContext(ToolbarContext)
	const cmd = context ? context.command : () => {}

	return (
		<Button
			type="button"
			variant="outline"
			size="icon"
			onClick={() => cmd(command)}
			className="hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-700 focus:bg-zinc-900 focus:text-white dark:focus:bg-zinc-700"
		>
			{children}
		</Button>
	)
}

export default ToolbarButton
