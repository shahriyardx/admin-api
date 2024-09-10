import React from "react"
import {
	BoldIcon,
	CodeIcon,
	Heading1,
	Heading2,
	Heading3,
	Heading4,
	Heading5,
	Heading6,
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
						<Heading1 size={15} />
				</ToolbarButton>
				<ToolbarButton command="h2">
					<Heading2 size={15} />
				</ToolbarButton>
				<ToolbarButton command="h3">
					<Heading3 size={15} />
				</ToolbarButton>
				<ToolbarButton command="h4">
					<Heading4 size={15} />
				</ToolbarButton>
				<ToolbarButton command="h5">
					<Heading5 size={15} />
				</ToolbarButton>
				<ToolbarButton command="h6">
					<Heading6 size={15} />
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
