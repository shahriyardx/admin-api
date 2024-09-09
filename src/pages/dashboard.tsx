import AdminDashboard from "@/components/layouts/AdminDashboard"
import React from "react"

const Index = () => {
	return (
		<AdminDashboard
			pageTitle={<h1 className="text-2xl font-bold">Dashboard</h1>}
		>
			<div className="mt-5">Welcome to admin dashboard</div>
		</AdminDashboard>
	)
}

export default Index
