import { AxiosInstance } from 'axios';
import { OrderInterface } from '@/types/services/Orders';
import { OrderPaymentInterface } from '@/types/services/Orders';

export const buyerOrderAPI = (instance: AxiosInstance) => ({
	async getOrderById(id: number) {
		const url = `/order/${id}`;
		const response = await instance.get(url);
		const result: OrderInterface = response.data;
		return result;
	},
	async orderPayment(obj: OrderPaymentInterface) {
		const url = `order-payment`;
		const response = await instance.post(url, obj);
		return response;
	},
	async getProductionByOrder(id: number) {
		const url = `/order-production/by-order/${id}`;
		const response = await instance.get(url);
		const result = response.data;
		return result;
	},
});
