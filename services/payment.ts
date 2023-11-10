import { AxiosInstance } from 'axios';
import { Payment } from '@/types/services/payment';

export const PaymentApi = (instance: AxiosInstance) => ({
	async subscribe(data: Payment) {
			const url = `/payment/subscribe`;
			const response = await instance.post(url, data);
			return response.data;
	},
});
