export interface OrderInterface {
	id: number;
	status: string;
	type: string;
	amount: number;
	shipmentAmount: number;
	PO: string;
	buyerCompanyId: number;
	sellerCompanyId: number;
	estDate: string;
}

export interface OrderPaymentInterface {
	orderId: number;
	sum: number;
	type: string;
}
export interface orderProductionInterface {
	updates: string;
	images: File[];
	orderId: number;
}

export interface ProductionMessageInterface {
	images: any[];
	orderId: number;
	updates: string;
	createdAt: string;
}
