import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { env } from "../env";
import { accessInviteLink } from "../functions/access-invite";
import { redis } from "../redis/client";

export const accessToInviteLinkRoute: FastifyPluginAsyncZod = async (app) => {
	app.get(
		"/invite/:subscriberId",
		{
			schema: {
				summary: "access an invite link and redirects user",
				tags: ["referral"],
				params: z.object({
					subscriberId: z.string().uuid(),
				}),
				response: {
					201: z.object({
						subscriverId: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { subscriberId } = request.params;

			await accessInviteLink({ subscriberId });

			console.log(await redis.hgetall("referral:access-count"));

			const redirectUrl = new URL(env.WEB_URL);

			redirectUrl.searchParams.set("referrer", subscriberId);

			return reply.redirect(redirectUrl.toString(), 302);
		},
	);
};
