import { AxiosInstance } from 'axios';

import {
	CreateSellerProduct,
	FindSellerProductsParams,
	UploadSellerProduct,
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
					...(find.status.in.length && {
						status: { in: find.status.in },
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
			throw error;
		}
	},

	async getSellerProductById(id: number) {
		try {
			const url = `/product-seller/${id}`;
			const response = await instance.get<ProductItemType>(url);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	async addSellerProduct(data: CreateSellerProduct) {
		try {
			const url = `/product-seller`;
			const response = await instance.post(url, data);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	async updateSellerProductById(id: number, data: object) {
		try {
			const url = `/product-seller/${id}`;
			const response = await instance.patch(url, data);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	async bulkUploadCsv(file: File) {
		try {
			const formData = new FormData();
			formData.append('file', file);

			const url = `/product-seller/upload-csv`;
			const response = await instance.post<{ error: boolean; message: string }>(
				url,
				formData
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	async uploadImages(data: UploadSellerProduct) {
		try {
			const { productId, type, files } = data;

			const formData = new FormData();
			formData.append('productId', String(productId));
			formData.append('type', type);
			files.forEach((item) => {
				formData.append('files', item);
			});

			const url = `/product-seller/upload`;
			const response = await instance.post(url, formData);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	async deleteImages(ids: number[]) {
		try {
			const url = `/product-seller/images`;
			const response = await instance.delete(url, { data: { ids } });
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	async downloadBulkUploadSampleFile(subCategoryId: number) {
		try {
			const url = `/product-seller/download-file-sample/${subCategoryId}`;
			return await instance.get(url, { responseType: 'blob' });
		} catch (error) {
			throw error;
		}
	},
});
