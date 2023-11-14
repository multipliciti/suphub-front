import { AxiosInstance } from 'axios';

import {
	CreateSellerProduct,
	FindSellerProductsParams,
} from '@/types/services/sellerProduct';
import { PaginationResponse } from '@/types/pagination';
import { ProductItemType } from '@/types/products/product';

export const ProductSellerApi = (instance: AxiosInstance) => ({
	async getSellerProducts(params: FindSellerProductsParams) {
		try {
			const { find, ...otherParams } = params;
			const stringifyFind = JSON.stringify({
				attr: {
					...(find.name.contains && { name: { contains: find.name.contains } }),
					...(find.subCategoryId.in.length && {
						subCategoryId: { in: find.subCategoryId.in },
					}),
				},
			});

			const url = `/product-seller`;
			const response = await instance.get<PaginationResponse<ProductItemType[]>>(
				url,
				{
					params: {
						...otherParams,
						find: stringifyFind,
					},
				}
			);
			return response.data;
		} catch (error) {
			console.error('Product Seller API error:', error);
			throw error;
		}
	},

	async getSellerProductById(id: number) {
		try {
			const url = `/product-seller/${id}`;
			const response = await instance.get<ProductItemType>(url);
			return response.data;
		} catch (error) {
			console.error('Product Seller API error:', error);
			throw error;
		}
	},

	async addSellerProduct(data: CreateSellerProduct) {
		try {
			const url = `/product-seller`;
			const response = await instance.post(url, data);
			return response.data;
		} catch (error) {
			console.error('Product Seller API error:', error);
			throw error;
		}
	},

	async updateSellerProductById(id: number, data: object) {
		try {
			const url = `/product-seller/${id}`;
			const response = await instance.patch(url, data);
			return response.data;
		} catch (error) {
			console.error('Product Seller API error:', error);
			throw error;
		}
	},

	async bulkUploadCsv(csvFile: File) {
		try {
			const formData = new FormData();
			formData.append('file', csvFile);

			const url = `/product-seller/upload-csv`;
			const response = await instance.post<{ error: boolean; message: string }>(
				url,
				formData
			);
			return response.data;
		} catch (error) {
			console.error('Product Seller API error:', error);
			throw error;
		}
	},

	async uploadImages(productId: number, images: File[]) {
		try {
			const formData = new FormData();
			formData.append('productId', String(productId));
			images.forEach((item) => {
				formData.append('files', item);
			});

			const url = `/product-seller/upload-images`;
			const response = await instance.post(url, formData);
			return response.data;
		} catch (error) {
			console.error('Product Seller API error:', error);
			throw error;
		}
	},

	async deleteImages(ids: number[]) {
		try {
			const url = `/product-seller/images`;
			const response = await instance.delete(url, { data: { ids } });
			return response.data;
		} catch (error) {
			console.error('Product Seller API error:', error);
			throw error;
		}
	},
});
