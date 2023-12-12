import { OrderPayInterface } from '@/types/services/orders';
import { AxiosInstance } from 'axios';
import { OrderInterface } from '@/types/services/orders';

export const buyerOrderAPI = (instance: AxiosInstance) => ({
	async getOrderById(id: number) {
		const url = `/order/${id}`;
		const response = await instance.get(url);
		const result: OrderInterface = response.data;
		return result;
	},
	async getProductionByOrder(id: number) {
		const url = `/order-production/by-order/${id}`;
		const response = await instance.get(url);
		const result = response.data;
		return result;
	},
	async changeStatus(data: { id: number; status: string }) {
		const url = `order/change-status`;
		const response = await instance.patch(url, data);
		return response;
	},
	async orderPay(data: OrderPayInterface) {
		const url = `payment/pay`;
		const response = await instance.post(url, data);
		return response;
	},
	async orderFeedback(data: any) {
		const url = `order/feedback`;
		const response = await instance.patch(url, data);
		return response;
	},
});
