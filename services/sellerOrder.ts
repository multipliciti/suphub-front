import { AxiosInstance } from 'axios';
import { OrderInterface } from '@/types/services/Orders';
import { orderProductionInterface } from '@/types/services/Orders';

export const sellerOrderAPI = (instance: AxiosInstance) => ({
	async getOrderById(id: number) {
		const url = `/order/${id}`;
		const response = await instance.get(url);
		const result: OrderInterface = response.data;
		return result;
	},
	async orderProduction(data: any) {
		// const jsonData = JSON.stringify(data);
		const url = `/order-production`;
		const response = await instance.post(url, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response;
	},
});
