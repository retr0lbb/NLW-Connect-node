import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { env } from "../env";
import { accessInviteLink } from "../functions/access-invite";
import { getSubscriberInviteClicks } from "../functions/get-subscriber-invite-clicks";
import { getSubscriberIndications } from "../functions/get-user-indications";

export const getUserIndicationsRoute: FastifyPluginAsyncZod = async (app) => {
	app.get(
		"/subscribers/:subscriberId/ranking/count",
		{
			schema: {
				summary: "Get subscriber ranking invite count",
				tags: ["referral"],
				params: z.object({
					subscriberId: z.string().uuid(),
				}),
				response: {
					200: z.object({
						count: z.number(),
					}),
				},
			},
		},
		async (request) => {
			const { subscriberId } = request.params;

			const { count } = await getSubscriberIndications({ subscriberId });

			return { count };
		},
	);
};
