type SortOptions = {
	[key: string]: 'asc' | 'desc';
};

export interface RfqFind {
	projectId: number;
	limit?: number;
	page?: number;
	sortParams?: {
		id?: string;
		sortDirection?: SortOptions;
	};
	searchText?: string;
	searchParams?: {
		subCategoryId?: number;
	};
}

export interface RfqUpdateData {
	projectId: number;
	subCategoryId: number;
	productName?: string;
	quantity?: number;
	budget?: number;
	size?: string;
	certifications?: string;
	additionalComments?: string;
	cover?: string;
}
export interface RfqOption {
	size: string;
	quantity: number;
	unit: string;
	price: number;
	productId: number;
	rfqId: number;
	status: string;
}
