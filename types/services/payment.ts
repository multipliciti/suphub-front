export interface Payment {
	planId: number,
	isTrial: boolean,
	successUrl: string,
	cancelUrl: string
}