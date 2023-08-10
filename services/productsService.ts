import { AxiosInstance } from 'axios';
import { ProductFind } from '@/types/services/products';

export const ProductsApi = (instance: AxiosInstance) => ({
	async getProduct({ page, limit, sortParams, searchText }: ProductFind) {
		try {
			const searchParams = {
				attr: { name: { contains: searchText } },
			};

			const search = searchText ? `&find=${JSON.stringify(searchParams)}` : '';
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
	async addFavorite(id: number) {
		try {
			const url = `product/add-favorite`;
			const response = await instance.post(url, { productId: id });
			return response.data;
		} catch (error) {
			console.error('User registration error:', error);
			throw error;
		}
	},
});
