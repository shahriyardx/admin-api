import AdminDashboard from "@/components/layouts/AdminDashboard"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import React, { useEffect } from "react"

const Index = () => {
	const router = useRouter()
	const { status } = useSession({
		required: true,
		onUnauthenticated: () => router.push("/login"),
	})

	if (status === "authenticated") {
		router.push("/dashboard")
	}

	return null
}

export default Index
