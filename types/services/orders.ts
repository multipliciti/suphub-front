import { Feedback } from '../../components/Screens/Storefront/StorefrontSellerOrderItem/Order/ProgressOrder/Feedback/index';
export interface ProductionItem {
	id: number;
	updates: string;
	images: {
		id: number;
		url: string;
		name: string;
	}[];
	orderId: number;
	createdAt: string;
}

export interface Delivery {
	id?: number;
	type: string;
	amount: number;
	documents:
		| {
				id: number;
				url: string;
				name: string;
		  }[]
		| null;
	images: {
		id: number;
		url: string;
		name: string;
	}[];
	bill?: {
		id: number;
		url: string;
		name: string;
	};
	carrier?: string;
	trackingNumber?: string | null;
	orderId: number;
	updatedAt: string;
	createdAt: string;
}

export interface OrderPayInterface {
	orderId: number;
	amount: number;
	type: string;
	successUrl: string;
	cancelUrl: string;
}

export interface OrderProductionInterface {
	updates: string;
	images: File[];
	orderId: number;
}

export interface FeedbackInterface {
	stars: number;
	message?: string;
}

export interface Payment {
	id: number;
	sum: number;
	type: string;
	stripeInvoiceid: null;
	orderId: number;
	updatedAt: string;
	createdAt: string;
}

export interface Element {
	id: number;
	quantity: number;
	price: number;
	model: string;
	modelId: number | null;
	orderId: number;
	updatedAt: string;
	createdAt: string;
}

export interface OrderInterface {
	id: number;
	status: string;
	type: string;
	amount: number;
	shipmentAmount: number;
	PO: string;
	buyerCompanyId: number;
	sellerCompanyId: number;
	elements?: Element[];
	production?: ProductionItem[];
	delivery?: Delivery;
	sellerFeedback: FeedbackInterface | null;
	buyerFeedback: FeedbackInterface | null;
	payments?: Payment[];
	estDate: string;
	updatedAt: string;
	createdAt: string;
	deliveryDate: null | string;
}

export interface OrderCreateBody {
	type: string;
	PO: string;
	shipmentAmount: number;
	estDate: string;
	cartElementIds: number[];
}
