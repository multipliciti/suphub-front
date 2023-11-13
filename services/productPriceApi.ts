import { AxiosInstance } from 'axios';

import {
	AddProductPriceData,
	UpdateProductPriceData,
} from '@/types/services/productPrice';
import { Price } from '@/types/products/product';

export const ProductPriceApi = (instance: AxiosInstance) => ({
	async addPrice(data: AddProductPriceData) {
		try {
			const url = `/price`;
			const response = await instance.post<Price>(url, data);
			return response.data;
		} catch (error) {
			console.error('Product Seller API error:', error);
			throw error;
		}
	},

	async updatePrice(data: UpdateProductPriceData) {
		try {
			const { priceId, ...body } = data;

			const url = `/price/${priceId}`;
			const response = await instance.patch(url, body);
			return response.data;
		} catch (error) {
			console.error('Product Seller API error:', error);
			throw error;
		}
	},

	async deletePrice(priceId: number) {
		try {
			const url = `/price/${priceId}`;
			const response = await instance.delete(url);
			return response.data;
		} catch (error) {
			console.error('Product Seller API error:', error);
			throw error;
		}
	},
});
