import type { GetServerSidePropsContext } from "next"
import { getServerSession, type NextAuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

import { env } from "@/env"

export const authOptions: NextAuthOptions = {
	callbacks: {
		session: ({ session }) => ({
			...session,
		}),
		signIn: async ({ user }) => {
			return user.id === env.ADMIN_DISCORD_ID
		},
	},
	providers: [
		DiscordProvider({
			clientId: env.DISCORD_CLIENT_ID,
			clientSecret: env.DISCORD_CLIENT_SECRET,
		}),
	],
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
	req: GetServerSidePropsContext["req"]
	res: GetServerSidePropsContext["res"]
}) => {
	return getServerSession(ctx.req, ctx.res, authOptions)
}
