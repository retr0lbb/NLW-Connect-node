import { redis } from "../redis/client";

interface GetSubscriberIndicationsParams {
	subscriberId: string;
}
export async function getSubscriberIndications({
	subscriberId,
}: GetSubscriberIndicationsParams) {
	const count = await redis.zscore("referral:ranking", subscriberId);

	return { count: count ? Number.parseInt(count) : 0 };
}
