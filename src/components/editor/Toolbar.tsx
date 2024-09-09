import React from "react"
import {
	BoldIcon,
	CodeIcon,
	ImageIcon,
	ItalicIcon,
	LinkIcon,
	ListIcon,
	ListOrderedIcon,
	QuoteIcon,
	StrikethroughIcon,
} from "lucide-react"
import ToolbarButton from "./ToolbarButton"

const Toolbar = () => {
	return (
		<div className="flex flex-wrap gap-2 sm:gap-5">
			<div className="flex gap-1">
				<ToolbarButton command="bold">
					<BoldIcon size={15} />
				</ToolbarButton>

				<ToolbarButton command="italic">
					<ItalicIcon size={15} />
				</ToolbarButton>

				<ToolbarButton command="strike-through">
					<StrikethroughIcon size={15} />
				</ToolbarButton>
			</div>

			<div className="flex gap-1">
				<ToolbarButton command="h1">
					<span className="text-sm">H1</span>
				</ToolbarButton>
				<ToolbarButton command="h2">
					<span className="text-sm">H2</span>
				</ToolbarButton>
				<ToolbarButton command="h3">
					<span className="text-sm">H3</span>
				</ToolbarButton>
				<ToolbarButton command="h4">
					<span className="text-sm">H4</span>
				</ToolbarButton>
				<ToolbarButton command="h5">
					<span className="text-sm">H5</span>
				</ToolbarButton>
				<ToolbarButton command="h6">
					<span className="text-sm">H6</span>
				</ToolbarButton>
			</div>

			<div className="flex gap-1">
				<ToolbarButton command="link">
					<LinkIcon size={15} />
				</ToolbarButton>
				<ToolbarButton command="image">
					<ImageIcon size={15} />
				</ToolbarButton>
				<ToolbarButton command="unordered-list">
					<ListIcon size={15} />
				</ToolbarButton>
				<ToolbarButton command="ordered-list">
					<ListOrderedIcon size={15} />
				</ToolbarButton>
				<ToolbarButton command="block-quotes">
					<QuoteIcon size={15} />
				</ToolbarButton>
				<ToolbarButton command="code-block">
					<CodeIcon size={15} />
				</ToolbarButton>
			</div>
		</div>
	)
}

export default Toolbar
