import { AxiosInstance } from 'axios';
import {
	BuyerCompany,
	RegisterBuyerCompany,
	UpdateBuyerCompany,
} from '@/types/services/company';

export const BuyerCompanyApi = (instance: AxiosInstance) => ({
	async register(data: RegisterBuyerCompany) {
		try {
			const url = '/buyer';
			const response = await instance.post(url, data);
			return response;
		} catch (error) {
			console.error('Register error:', error);
			throw error;
		}
	},
	async getAll() {
		try {
			const url = '/buyer';
			const response = await instance.get(url);
			return response;
		} catch (error) {
			console.error('Get all error:', error);
			throw error;
		}
	},
	async getById(id: number) {
		try {
			const url = `/buyer/` + id.toString();
			const response = await instance.get<BuyerCompany>(url);
			return response;
		} catch (error) {
			console.error('Get by id error:', error);
			throw error;
		}
	},
	async update(id: number, data: UpdateBuyerCompany) {
		try {
			const url = `/buyer/` + id.toString();

			const response = await instance.patch(url, data);
			return response;
		} catch (error) {
			console.error('Update error:', error);
			throw error;
		}
	},
	async uploadLogo(data: FormData) {
		try {
			const url = '/buyer/upload/logo';
			const response = await instance.post(url, data);
			return response;
		} catch (error) {
			console.error('Upload logo error:', error);
			throw error;
		}
	},
});
