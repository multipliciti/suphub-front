import { AxiosInstance } from 'axios';
import { OrderInterface } from '@/types/services/orders';

export const sellerOrderAPI = (instance: AxiosInstance) => ({
	async getOrderById(id: number) {
		const url = `/order/${id}`;
		const response = await instance.get(url);
		const result: OrderInterface = response.data;
		return result;
	},
	async orderProduction(data: any) {
		const url = `/order-production`;
		const response = await instance.post(url, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response;
	},
	async getProductionByOrder(id: number) {
		const url = `/order-production/by-order/${id}`;
		const response = await instance.get(url);
		const result = response.data;
		return result;
	},
	async changeStatus(data: { id: number; status: string }) {
		const url = `/order/change-status`;
		const response = await instance.patch(url, data);
		return response;
	},
	async orderDelivery(data: any) {
		const url = `/order-delivery`;
		const response = await instance.post(url, data);
		return response;
	},
	async orderDeliveryAddtracking(data: any) {
		const url = `order-delivery/add-tracking`;
		const response = await instance.post(url, data);
		return response;
	},
	async orderFeedback(data: any) {
		const url = `order/feedback`;
		const response = await instance.patch(url, data);
		return response;
	},
});
