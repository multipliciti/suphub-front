import { AxiosInstance } from 'axios';
import { ProductFind } from '@/types/services/products';

export const ProductsApi = (instance: AxiosInstance) => ({
	async getProduct({ page, limit, sortParams, searchText }: ProductFind) {
		try {
			const search = searchText ? `&search=${encodeURIComponent(searchText)}` : '';
			const sort = sortParams
				? `&sort=${encodeURIComponent(JSON.stringify(sortParams))}`
				: '';

			const url = `/product?page=${page}&limit=${limit}${sort}${search}`;
			const response = await instance.get(url);
			return response.data;
		} catch (error) {
			console.error('User registration error:', error);
			throw error;
		}
	},
	async getProductOne(id: number) {
		try {
			const url = `/product/${id}`;
			const response = await instance.get(url);
			return response.data;
		} catch (error) {
			console.error('User registration error:', error);
			throw error;
		}
	},
});
