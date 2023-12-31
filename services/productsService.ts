import { AxiosInstance } from 'axios';
import { ProductFind } from '@/types/services/products';

export const ProductsApi = (instance: AxiosInstance) => ({
	async getProduct({ page, limit, sortParams, searchParams }: ProductFind) {
		try {
			const search = searchParams ? `&find=${searchParams}` : '';
			const sort = sortParams
				? `&sort=${encodeURIComponent(JSON.stringify(sortParams))}`
				: '';
			const url = `/product?page=${page}&limit=${limit}${sort}${search}`;
			const response = await instance.get(url);
			return response.data;
		} catch (error) {
			console.error('Products error:', error);
			throw error;
		}
	},
	async getFavorites({ page, limit, sortParams, searchParams }: ProductFind) {
		try {
			const search = searchParams ? `&find=${searchParams}` : '';
			const sort = sortParams
				? `&sort=${encodeURIComponent(JSON.stringify(sortParams))}`
				: '';
			const url = `/product/favorites?page=${page}&limit=${limit}${sort}${search}`;
			const response = await instance.get(url);
			return response.data;
		} catch (error) {
			console.error('Products error:', error);
			throw error;
		}
	},
	async getProductOne(id: number) {
		try {
			const url = `/product/${id}`;
			const response = await instance.get(url);
			return response.data;
		} catch (error) {
			console.error('Products error:', error);
			throw error;
		}
	},
	async getFilters(n: number) {
		try {
			const url = `/category/sub/${n}`;
			const response = await instance.get(url);
			return response.data;
		} catch (error) {
			console.error('Products error:', error);
			throw error;
		}
	},
	async addFavorite(id: number) {
		try {
			const url = `product/add-favorite`;
			const response = await instance.post(url, { productId: id });
			return response.data;
		} catch (error) {
			console.error('Products error:', error);
			throw error;
		}
	},
	async removeFavorite(id: number) {
		try {
			const url = `product/favorite/${id}`;
			const response = await instance.delete(url);
			return response.data;
		} catch (error) {
			console.error('Products error:', error);
			throw error;
		}
	},
});
