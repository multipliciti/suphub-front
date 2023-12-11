import { ProductItemType } from './../products/product';

type SortOptions = {
	[key: string]: 'asc' | 'desc';
};

export interface Option {
	id: number;
	size: string;
	quantity: number;
	unit: string;
	price: number;
	type: string;
	status: string;
	productId: number;
	rfqId: number;

	product: ProductItemType;
}

export interface RfqItemFetch {
	id?: number;
	projectId: string;
	subCategoryId?: number;
	productName: string;
	quantity: number;
	budget?: number;
	size?: string;
	certifications?: string[];
	additionalComments?: string;
	cover?: File[];
	files?: File[];
}
export interface RfqEmptyItem {
	projectId: number;
	subCategoryId: number;
}

export interface RfqItemGot {
	id: number;
	projectId: number;
	subCategoryId: number;
	productName: string;
	quantity: number;
	budget: number;
	size: string;
	certifications: string;
	additionalComments: string;
	cover: string;

	subCategory: {
		csiCode: string;
		id: number;
		name: string;
		categoryId: number;
		updatedAt: string;
		createdAt: string;
	};
	options: Option[];
}

export interface RfqFind {
	projectId: number;
	limit?: number;
	page?: number;
	sortParams?: {
		id?: string;
	};
	searchText?: string;
	searchParams?: string;
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
	size?: string;
	quantity?: number;
	unit?: string;
	price?: number;
	productId: number;
	rfqId: number;
	status?: string;
}
