import { Button } from "@/components/ui/button"
import React from "react"

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import TextEditor from "@/components/editor"
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectItem,
	SelectContent,
} from "@/components/ui/select"
import type { UseFormReturn } from "react-hook-form"
import type { SlashBlog } from "@/schema"

type Props = {
	form: UseFormReturn<SlashBlog>
	onSubmit: (values: SlashBlog) => void
}

const SlashBlogForms = ({ form, onSubmit }: Props) => {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="grid grid-cols-2 gap-5">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input
										placeholder="Do you know how to write a blog?"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Input
										placeholder="Today we will learn about writing blog"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="slug"
					render={({ field }) => (
						<FormItem className="mt-5">
							<FormLabel>Slug</FormLabel>
							<FormControl>
								<Input
									placeholder="do-you-know-how-to-write-a-blog"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="status"
					render={({ field }) => (
						<FormItem className="mt-5">
							<FormLabel>Status</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select Status" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="published">Published</SelectItem>
									<SelectItem value="unlisted">Unlisted</SelectItem>
									<SelectItem value="draft">Draft</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="mt-5">
					<FormField
						control={form.control}
						name="content"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Bio</FormLabel>
								<FormControl>
									<TextEditor placeholder="Write your text here.." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="mt-5">
					<Button>Submit</Button>
				</div>
			</form>
		</Form>
	)
}

export default SlashBlogForms
