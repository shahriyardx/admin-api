import { Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import React, { type ReactNode } from "react"

type Props = {
	children: ReactNode
}

const RequireAuth = ({ children }: Props) => {
	const router = useRouter()
	const { status } = useSession({
		required: true,
		onUnauthenticated: () => {
			router.push("/login")
		},
	})

	if (status === "loading") {
		return (
			<div className="w-full h-screen grid place-items-center">
				<Loader2 className="animate-spin" />
			</div>
		)
	}

	return children
}

export default RequireAuth
