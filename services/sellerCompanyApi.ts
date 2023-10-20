import { AxiosInstance } from 'axios';
import { RfqOption } from '@/types/services/rfq';

export const SellerCompanyApi = (instance: AxiosInstance) => ({
	async register(data: RfqOption) {
	},
	async getAll() {},
	async getById(id: number) {
		try {
			const url:string = `/seller/` + id.toString()
			const response = await instance.get(url);
			return response
		} catch (error) {
			console.error('Get by id error:', error);
			throw error;
		}
	},
	async update(data: any) {
		try {
			const url:string = `/seller/` + '1'

			const response = await instance.patch(url, data);
			return response
		} catch (error) {
			console.error('Update error:', error);
			throw error;
		}
	},
	async uploadLogo(data) {
		try {
			const url:string = '/seller/upload/logo'
			const response = await instance.post(url, data);
			return response
		} catch (error) {
			console.error('Upload logo error:', error);
			throw error;
		}
	},
	async uploadCertification(data) {
		try {
			const url:string = '/seller/upload/certification'
			const response = await instance.post(url, data);
			return response
		} catch (error) {
			console.error('Upload certification error:', error);
			throw error;
		}
	},
	async removeCertification(data:any) {
		try {
			const url:string = '/seller/certification'

			const response:any = await instance.delete(url, {data}
			);
			return response
		} catch (error) {
			console.error('Remove certification error:', error);
			throw error;
		}
	},
});
