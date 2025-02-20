import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import fastify from "fastify";
import {
	type ZodTypeProvider,
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { env } from "./env";
import { getRanking } from "./functions/get-ranking";
import { accessToInviteLinkRoute } from "./routes/access-invite-link";
import { getRankingRoute } from "./routes/get-ranking";
import { getSubscriberInviteClicksRouter } from "./routes/get-subscriber-invite-click";
import { getSubscriberRankingPositionRoute } from "./routes/get-subscriber-rank-position";
import { getUserIndicationsRoute } from "./routes/get-user-indications";
import { subscribeToEventRoute } from "./routes/subscribe-to-event";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors);
app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "NLW-Connect",
			version: "0.0.1",
		},
	},
	transform: jsonSchemaTransform,
});
app.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});

app.register(subscribeToEventRoute);
app.register(accessToInviteLinkRoute);
app.register(getSubscriberInviteClicksRouter);
app.register(getUserIndicationsRoute);
app.register(getSubscriberRankingPositionRoute);
app.register(getRankingRoute);

app
	.listen({
		port: env.PORT,
	})
	.then(() => {
		console.log("server ready");
	});
