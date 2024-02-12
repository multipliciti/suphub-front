import { AxiosInstance } from 'axios';
import { RfqOption } from '@/types/services/rfq';

const HOST = process.env.NEXT_PUBLIC_CLIENT_HOST;

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
		const optionData = {
			...data,
			redirectUrl: `${HOST}/marketplace`,
		};
		const url = `/rfq/option`;
		const response = await instance.post(url, optionData);
		return response;
	},
	async declineOption(id: number) {
		const url = `/rfq/option/decline/${id}`;
		const response = await instance.patch(url);
		return response;
	},
	async getOptionsByRfqId(id: number) {
		const url = `/rfq/option/${id}`;
		const response = await instance.get(url);
		return response;
	},
});
