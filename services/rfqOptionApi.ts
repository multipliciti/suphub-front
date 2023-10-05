import { AxiosInstance } from 'axios';
import { RfqOption } from '@/types/services/rfq';

export const RfqOptionApi = (instance: AxiosInstance) => ({
	async create(data: RfqOption) {
		try {
			const url = `/rfq/option`;
			const response = await instance.post(url, data);
			return response;
		} catch (error) {
			console.error('AddToRfqCart error:', error);
			throw error;
		}
	},
});
