import { GeistSans } from "geist/font/sans"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "@/components/ui/sonner"
import { api } from "@/utils/api"

import type { Session } from "next-auth"
import type { AppType } from "next/app"

import "@/styles/globals.css"

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<div className={GeistSans.className}>
				<Component {...pageProps} />
				<Toaster />
			</div>
		</SessionProvider>
	)
}

export default api.withTRPC(MyApp)
