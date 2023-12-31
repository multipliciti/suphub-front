import { AxiosInstance } from 'axios';
import { RfqOption } from '@/types/services/rfq';

export const RfqOptionApi = (instance: AxiosInstance) => ({
	async createOwn(data: RfqOption) {
		try {
			const url = `/rfq/option/own`;
			const response = await instance.post(url, data);
			return response;
		} catch (error) {
			console.error('AddToRfqCart error:', error);
			throw error;
		}
	},
	async create(data: RfqOption) {
		const url = `/rfq/option`;
		const response = await instance.post(url, data);
		return response;
	},
	async getOptionsByRfqId(id: number) {
		const url = `/rfq/option/${id}`;
		const response = await instance.get(url);
		return response;
	},
});
