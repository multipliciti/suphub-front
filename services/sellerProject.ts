import { AxiosInstance } from 'axios';
import { FetchFind } from '@/types/services/projects';

export const SellerProjectApi = (instance: AxiosInstance) => ({
	async getSellerOrders({ page = 1, limit = 10, searchParams }: FetchFind) {
		const search = searchParams ? `&find=${searchParams}` : '';
		const url = `/order/seller/?page=${page}&limit=${limit}${search}`;
		const response = await instance.get(url);
		return response.data;
	},
	async getSellerProjects({ page = 1, limit = 10, searchParams }: FetchFind) {
		const search = searchParams ? `&find=${searchParams}` : '';
		const url = `project/seller?page=${page}&limit=${limit}${search}`;
		const response = await instance.get(url);
		return response.data;
	},
	async getSellerProducts({ page, limit, searchParams }: FetchFind) {
		const search = searchParams ? `&find=${searchParams}` : '';
		const url = `product-seller?page=${page}&limit=${limit}${search}`;
		const response = await instance.get(url);
		return response.data;
	},
});
