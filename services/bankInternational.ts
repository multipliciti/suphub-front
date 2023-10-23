import { AxiosInstance } from 'axios';
import { InternationalBankDetails } from '@/types/services/bankAccount';

export const BankInternational = (instance: AxiosInstance) => ({
	async add(data: InternationalBankDetails) {
		try {
			const url = '/bank-international';
			const response = await instance.post(url, data);
			return response;
		} catch (error) {
			console.error('Add bank error:', error);
			throw error;
		}
	},
	async get() {
		try {
			const url = '/bank-international';
			const response = await instance.get(url);
			return response;
		} catch (error) {
			console.error('Upload logo error:', error);
			throw error;
		}
	},
	async update(data: InternationalBankDetails) {
		try {
			const url = '/bank-international';
			const response = await instance.patch(url, data);
			return response;
		} catch (error) {
			console.error('Upload logo error:', error);
			throw error;
		}
	},
});
