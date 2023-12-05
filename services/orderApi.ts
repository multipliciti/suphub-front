import { AxiosInstance } from 'axios';

import { PaginationResponse } from '@/types/pagination';
import { OrderCreateBody } from '@/types/services/Orders';
import { OrderSeller } from '@/types/products/order';

export const OrderApi = (instance: AxiosInstance) => ({
	async getSellerOrders() {
		try {
			const url = `/order/seller`;
			const response = await instance.get<PaginationResponse<OrderSeller[]>>(url);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	async create(body: OrderCreateBody) {
		try {
			const url = `/order`;
			const response = await instance.post<OrderSeller>(url, body);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
});
