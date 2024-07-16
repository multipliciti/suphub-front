import { AxiosInstance } from 'axios';
import { InviteSupplierBody } from '@/types/services/supplier';

export const BuyerSupplierApi = (instance: AxiosInstance) => ({
	async invite(body: InviteSupplierBody) {
		try {
			const url = `/supplier/invite`;
			const response = await instance.post(url, body);
			return response.data;
		} catch (error) {
			console.error('Projects error:', error);
			throw error;
		}
	},

	async getAll() {
		try {
			const url = `/supplier`;
			const response = await instance.get(url);
			return response.data;
		} catch (error) {
			console.error('Projects error:', error);
			throw error;
		}
	},

	async getById(id: number) {
		try {
			const url = `/supplier/${id}`;
			const response = await instance.get(url);
			return response.data;
		} catch (error) {
			console.error('Projects error:', error);
			throw error;
		}
	},

	async delete(id: number) {
		try {
			const url = `/supplier/${id}`;
			const response = await instance.delete(url);
			return response.data;
		} catch (error) {
			console.error('Projects error:', error);
			throw error;
		}
	},
});
