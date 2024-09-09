import { createContext, type ReactNode, type RefObject } from "react"
import type { TextareaMarkdownRef } from "textarea-markdown-editor"

export const ToolbarContext = createContext<{
	command: (name: string) => void
} | null>(null)

export const ToolbarProvider = ({
	children,
	editorRef,
}: { children: ReactNode; editorRef: RefObject<TextareaMarkdownRef> }) => {
	const command = (command: string) => {
		editorRef.current?.trigger(command)
	}

	return (
		<ToolbarContext.Provider value={{ command }}>
			{children}
		</ToolbarContext.Provider>
	)
}
