import { AxiosInstance } from 'axios';
import { FetchFind } from '@/types/services/projects';

export const BuyerProjectApi = (instance: AxiosInstance) => ({
	async getBuyerOrders({ projectId, page, limit, searchParams }: FetchFind) {
		try {
			const search = searchParams ? `&find=${searchParams}` : '';
			const url = `/order/buyer/${projectId}/?page=${page}&limit=${limit}${search}`;
			const response = await instance.get(url);
			return response.data;
		} catch (error) {
			console.error('Category API error:', error);
			throw error;
		}
	},
});
