import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { env } from "../env";
import { accessInviteLink } from "../functions/access-invite";
import { getSubscriberInviteClicks } from "../functions/get-subscriber-invite-clicks";
import { getSubscriberRankingPosition } from "../functions/get-subscribers-ranking-position";
import { getSubscriberIndications } from "../functions/get-user-indications";

export const getSubscriberRankingPositionRoute: FastifyPluginAsyncZod = async (
	app,
) => {
	app.get(
		"/subscribers/:subscriberId/ranking/position",
		{
			schema: {
				summary: "Get subscriber ranking position",
				tags: ["referral"],
				params: z.object({
					subscriberId: z.string().uuid(),
				}),
				response: {
					200: z.object({
						position: z.number().nullable(),
					}),
				},
			},
		},
		async (request) => {
			const { subscriberId } = request.params;

			const { position } = await getSubscriberRankingPosition({ subscriberId });

			return { position };
		},
	);
};
