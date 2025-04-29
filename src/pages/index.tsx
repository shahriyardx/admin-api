import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Index = () => {
	const router = useRouter()
	const { status } = useSession({
		required: true,
		onUnauthenticated: () => router.push("/login"),
	})

	useEffect(() => {
		if (status === "authenticated") {
			router.push("/dashboard")
		} else {
			router.push("/login")
		}
	}, [status, router])

	return null
}

export default Index
