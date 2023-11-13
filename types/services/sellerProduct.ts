import { DynamicAttribute } from '@/types/products/product';

export interface CreateSellerProduct {
	subCategoryId: number;
	name: string;
	unitPrice: number;
	moq: number;
	warranty: number;
	hsCode: string;
	countryOfOrigin: string;
	minOrder: number;
	leadTime: number;
	dynamic_attr: DynamicAttribute[];
}

export interface FindSellerProductsParams {
	page: number;
	limit: number;
	find: {
		name: {
			contains: string;
		};
		subCategoryId: {
			in: number[];
		};
	};
}
