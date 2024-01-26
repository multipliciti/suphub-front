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

export type SellerProductFile =
	| 'images'
	| 'cutsheets'
	| 'manuals'
	| 'certifications';

export interface UploadSellerProductFiles {
	productId: number;
	type: SellerProductFile;
	files: File[];
}

export interface DeleteSellerProductFiles {
	productId: number;
	type: SellerProductFile;
	keys: string[];
}
