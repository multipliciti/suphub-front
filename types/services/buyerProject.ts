export interface Order {
	id: number;
	status: string;
	type: string;
	amount: number;
	shipmentAmount: number;
	PO: string;
	buyerCompanyId: number;
	sellerCompanyId: number;
	estDate: string;
	updatedAt: string;
	createdAt: string;
}

export interface OrdersFind {
	limit?: number;
	page?: number;
	sortParams?: {
		id?: string;
	};
	searchText?: string;
	searchParams?: string;
}
