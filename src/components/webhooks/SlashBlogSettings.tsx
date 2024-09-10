import React, { type ReactNode, useEffect, useState } from "react"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { api } from "@/utils/api"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { toast } from "sonner"

const webhookSchema = z.object({
	slashBlogWebhook: z.string({ message: "url is required" }),
})

type Webhook = z.infer<typeof webhookSchema>

const SlashBlogSettings = ({ children }: { children: ReactNode }) => {
	const [open, setOpen] = useState(false)

	const { data } = api.settings.settings.useQuery()
	const { mutate } = api.settings.updateSettings.useMutation({
		onSuccess: () => {
			toast.success("webhook updated")
			setOpen(false)
		},
	})

	const form = useForm<Webhook>({
		resolver: zodResolver(webhookSchema),
	})

	useEffect(() => {
		if (data) {
			form.reset({
				slashBlogWebhook: data.slashBlogWebhook ?? undefined,
			})
		}
	}, [data, form])

	return (
		<Dialog open={open} onOpenChange={() => setOpen(!open)}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Webhook</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(console.log)}>
						<FormField
							control={form.control}
							name="slashBlogWebhook"
							render={({ field }) => (
								<FormItem>
									<FormLabel>URL</FormLabel>
									<FormControl>
										<Input placeholder="Webhook URL" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>

				<DialogFooter>
					<DialogClose>
						<Button variant="secondary">Cancel</Button>
					</DialogClose>
					<Button
						type="button"
						variant="destructive"
						onClick={() =>
							form.handleSubmit((values) =>
								mutate({ slashBlogWebhook: values.slashBlogWebhook }),
							)()
						}
					>
						Update
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default SlashBlogSettings
