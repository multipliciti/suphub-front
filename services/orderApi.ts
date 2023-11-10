import { AxiosInstance } from 'axios';

import { PaginationResponse } from '@/types/pagination';
import { OrderSeller } from '@/types/products/order';


export const OrderApi = (instance: AxiosInstance) => ({
	async getSellerOrders() {
		try {
			const url = `/order/seller`;
			const response = await instance.get<PaginationResponse<OrderSeller[]>>(url);
			return response.data;
		} catch (error) {
			console.error('Order API error:', error);
			throw error;
		}
	},
});