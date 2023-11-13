export interface OrderSeller {
	id: number;
	buyerCompanyId: number;
	sellerCompanyId: number;
	status: string;
	type: string;
	PO: string;
	amount: number;
	shipmentAmount: number;
	estDate: string;
	updatedAt: string;
	createdAt: string;
}
