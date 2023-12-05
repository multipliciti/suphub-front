import { AxiosInstance } from 'axios';

import { CartCreateBody, CartUpdateBody } from '@/types/services/cart';
import { ProjectCart } from '@/types/products/cart';

export const CartApi = (instance: AxiosInstance) => ({
	async findByProjectId(id: number) {
		try {
			const url = `/project/cart/${id}`;
			const response = await instance.get<ProjectCart>(url);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	async create(body: CartCreateBody) {
		try {
			const url = `/cart/element`;
			const response = await instance.post(url, body);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	async update(id: number, body: CartUpdateBody) {
		try {
			const url = `/cart/element/${id}`;
			const response = await instance.patch(url, body);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	async delete(id: number) {
		try {
			const url = `/cart/element/${id}`;
			const response = await instance.delete(url);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
});
