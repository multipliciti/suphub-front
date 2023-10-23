import { AxiosInstance } from 'axios';
import { DomesticBankDetails } from '@/types/services/bankAccount';

export const BankUSA = (instance: AxiosInstance) => ({
	async add(data: DomesticBankDetails) {
		try {
			const url = '/bank-usa';
			const response = await instance.post(url, data);
			return response;
		} catch (error) {
			console.error('Add bank error:', error);
			throw error;
		}
	},
	async get() {
		try {
			const url = '/bank-usa';
			const response = await instance.get(url);
			return response;
		} catch (error) {
			console.error('Upload logo error:', error);
			throw error;
		}
	},
	async update(data: DomesticBankDetails) {
		try {
			const url = '/bank-usa';
			const response = await instance.patch(url, data);
			return response;
		} catch (error) {
			console.error('Upload logo error:', error);
			throw error;
		}
	},
});
