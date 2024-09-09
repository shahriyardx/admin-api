import React, { useRef } from "react"
import type { TextareaMarkdownRef } from "textarea-markdown-editor"
import TextareaMarkdown from "textarea-markdown-editor"
import { Textarea, type TextareaProps } from "../ui/textarea"
import { ToolbarProvider } from "./ToolbarContext"

import { cn } from "@/lib/utils"
import Toolbar from "./Toolbar"

const TextEditor = ({ className, ...props }: TextareaProps) => {
	const mdref = useRef<TextareaMarkdownRef>(null)

	return (
		<div>
			<ToolbarProvider editorRef={mdref}>
				<Toolbar />
				<TextareaMarkdown.Wrapper ref={mdref}>
					<Textarea rows={10} {...props} className={cn("mt-2", className)} />
				</TextareaMarkdown.Wrapper>
			</ToolbarProvider>
		</div>
	)
}

export default TextEditor
