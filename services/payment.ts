import { AxiosInstance } from 'axios';
import { Payment, Plan } from '@/types/services/payment';

export const PaymentApi = (instance: AxiosInstance) => ({
	async getPlans(){
		const url = `/payment/plans`
		const response = await instance.get<Plan[]>(url);
		return response.data;
	},
	async subscribe(data: Payment) {
			const url = `/payment/subscribe`;
			const response = await instance.post(url, data);
			return response.data;
	},
});
