import { AxiosInstance } from 'axios';
import { OrdersFind } from '@/types/services/buyerProject';

export const BuyerProjectApi = (instance: AxiosInstance) => ({
	async getBuyerOrders({ page, limit, searchParams }: OrdersFind) {
		try {
			const search = searchParams ? `&find=${searchParams}` : '';
			const url = `/order/buyer?page=${page}&limit=${limit}${search}`;
			const response = await instance.get(url);
			return response.data;
		} catch (error) {
			console.error('Category API error:', error);
			throw error;
		}
	},
});
