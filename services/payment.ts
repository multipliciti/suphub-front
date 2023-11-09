import { AxiosInstance } from 'axios';
import { Payment } from '@/types/services/payment';

const HOST = process.env.NEXT_PUBLIC_CLIENT_HOST;

export const Payment = (instance: AxiosInstance) => ({
	async subscribe(data: Payment) {
			const url = `/payment/subscribe`;
			const response = await instance.post(url, data);
			return response.data;
	},
});
