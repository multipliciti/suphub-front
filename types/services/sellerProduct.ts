import { ProductItemStatus } from '@/types/products/productStatus';

export interface CreateSellerProduct {
	subCategoryId: number;
	name: string;
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
		status: {
			in: ProductItemStatus[];
		};
	};
}
