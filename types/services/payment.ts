export interface Payment {
	planId: number;
	isTrial: boolean;
	successUrl: string;
	cancelUrl: string;
}
export interface Plan {
	id: number;
	title: string;
	description: string;
	stripePriceId: string;
	stripeProductId: string;
	updatedAt: string;
	createdAt: string;
	object: string;
	active: boolean;
	aggregate_usage?: null | any;
	amount: number;
	amount_decimal: string;
	billing_scheme: string;
	created: number;
	currency: string;
	interval: string;
	interval_count: number;
	livemode: boolean;
	metadata: Record<string, any>;
	nickname: null | string;
	product: string;
	tiers_mode: null | any;
	transform_usage: null | any;
	trial_period_days: null | number;
	usage_type: string;
}
