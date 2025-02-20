import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { env } from "../env";
import { accessInviteLink } from "../functions/access-invite";
import { getRanking } from "../functions/get-ranking";
import { getSubscriberInviteClicks } from "../functions/get-subscriber-invite-clicks";
import { getSubscriberRankingPosition } from "../functions/get-subscribers-ranking-position";
import { getSubscriberIndications } from "../functions/get-user-indications";

export const getRankingRoute: FastifyPluginAsyncZod = async (app) => {
	app.get(
		"/ranking",
		{
			schema: {
				summary: "Get ranking from top 3",
				tags: ["referral"],
				response: {
					200: z.object({
						ranking: z.array(
							z.object({
								id: z.string(),
								name: z.string(),
								score: z.number(),
							}),
						),
					}),
				},
			},
		},
		async (request) => {
			const { rankingWithScores } = await getRanking();

			return { ranking: rankingWithScores };
		},
	);
};
