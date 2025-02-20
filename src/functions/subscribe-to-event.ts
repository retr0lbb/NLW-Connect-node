import { eq } from "drizzle-orm";
import { db } from "../drizzle/client";
import { subscriptions } from "../drizzle/schema/subscriptions";
import { redis } from "../redis/client";

interface SubscribeToEventParams {
	name: string;
	email: string;
	referrerId?: string | null;
}

export async function subscribeToEvent(data: SubscribeToEventParams) {
	const subscribers = await db
		.select()
		.from(subscriptions)
		.where(eq(subscriptions.email, data.email));

	if (subscribers.length > 0) {
		return { subscriverId: subscribers[0].id };
	}

	const result = await db
		.insert(subscriptions)
		.values({
			email: data.email,
			name: data.name,
		})
		.returning();

	if (data.referrerId) {
		await redis.zincrby("referral:ranking", 1, data.referrerId);
	}

	const subscriver = result[0];

	return { subscriverId: subscriver.id };
}
