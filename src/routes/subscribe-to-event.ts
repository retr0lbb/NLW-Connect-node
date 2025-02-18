import type { FastifyInstance } from "fastify";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const subscribeToEventRoute: FastifyPluginAsyncZod = async (app) => {
	app.post(
		"/users",
		{
			schema: {
				summary: "subscribes someone to the event",
				tags: ["subscription"],
				body: z.object({
					name: z.string(),
				}),
				response: {
					201: z.object({
						message: z.string(),
					}),
				},
			},
		},
		(request, reply) => {
			const { name } = request.body;

			reply.status(201).send({
				message: `user ${name} created`,
			});
		},
	);
};
