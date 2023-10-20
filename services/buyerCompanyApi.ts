import { AxiosInstance } from 'axios';
import { RfqOption } from '@/types/services/rfq';

export const BuyerCompanyApi = (instance: AxiosInstance) => ({
	async register(data: RfqOption) {
	},
	async getAll() {},
	async getById(id: number) {
		try {
			const url:string = `/buyer/` + id.toString()
			const response = await instance.get(url);
			return response
		} catch (error) {
			console.error('Get by id error:', error);
			throw error;
		}
	},
	async update(data: any) {
		try {
			const url:string = `/buyer/` + '1'

			const response = await instance.patch(url, data);
			return response
		} catch (error) {
			console.error('Update error:', error);
			throw error;
		}
	},
	async uploadLogo(data) {
		try {
			const url:string = '/buyer/upload/logo'
			const response = await instance.post(url, data);
			return response
		} catch (error) {
			console.error('Upload logo error:', error);
			throw error;
		}
	},
});
