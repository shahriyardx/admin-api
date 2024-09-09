import React from "react"
import { Button } from "@/components/ui/button"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiDiscord } from "@icons-pack/react-simple-icons"
import { signIn } from "next-auth/react"

const LoginPage = () => {
	return (
		<div className="h-screen grid place-items-center">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle>Admin</CardTitle>
				</CardHeader>
				<CardContent>
					<h2>Sign in</h2>
					<p className="text-muted-foreground">
						to continue to the <b>Admin Panel</b>
					</p>

					<Button
						onClick={() =>
							signIn("discord", {
								callbackUrl: "/dashboard",
							})
						}
						className="mt-5 w-full"
					>
						<SiDiscord size={15} className="mr-2" />
						Sign in with discord
					</Button>
				</CardContent>
			</Card>
		</div>
	)
}

export default LoginPage
