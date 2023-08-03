import { AxiosInstance } from 'axios';
import { ProductFind } from '@/types/services/products';

export const ProductsApi = (instance: AxiosInstance) => ({
	async getProduct({ page, limit, sortParams }: ProductFind) {
		try {
			const url = `/product?page=${page}&limit=${limit}&sort=${encodeURIComponent(
				JSON.stringify(sortParams)
			)}`;
			const response = await instance.get(url);
			return response.data;
		} catch (error) {
			console.error('User registration error:', error);
			throw error;
		}
	},
});
