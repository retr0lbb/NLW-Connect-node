import { db } from "../drizzle/client";
import { subscriptions } from "../drizzle/schema/subscriptions";

interface SubscribeToEventParams {
	name: string;
	email: string;
}

export async function subscribeToEvent(data: SubscribeToEventParams) {
	const result = await db
		.insert(subscriptions)
		.values({
			email: data.email,
			name: data.name,
		})
		.returning();

	const subscriver = result[0];

	return { subscriverId: subscriver.id };
}
