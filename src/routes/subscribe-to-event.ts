import type { FastifyInstance } from "fastify";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { subscribeToEvent } from "../functions/subscribe-to-event";

export const subscribeToEventRoute: FastifyPluginAsyncZod = async (app) => {
	app.post(
		"/subscriptions",
		{
			schema: {
				summary: "subscribes someone to the event",
				tags: ["subscription"],
				body: z.object({
					name: z.string(),
					email: z.string().email(),
					referrer: z.string().uuid().nullish(),
				}),
				response: {
					201: z.object({
						subscriverId: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { email, name, referrer } = request.body;

			const { subscriverId } = await subscribeToEvent({
				email,
				name,
				referrerId: referrer,
			});

			reply.status(201).send({
				subscriverId,
			});
		},
	);
};
