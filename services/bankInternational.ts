import { AxiosInstance } from 'axios';

export const BankInternational = (instance: AxiosInstance) => ({
	async add (data) {
		try {
			const url:string = '/bank-international'
			const response = await instance.post(url, data);
			return response
		}
		catch (error) {
			console.error('Add bank error:', error);
			throw error;
		}
	},
	async get () {
		try {
			const url:string = '/bank-international'
			const response = await instance.get(url);
			return response
		} catch (error) {
			console.error('Upload logo error:', error);
			throw error;
		}
	},
	async update (data) {
		try {
			const url:string = '/bank-international'
			const response = await instance.patch(url, data);
			return response
		} catch (error) {
			console.error('Upload logo error:', error);
			throw error;
		}
	},
});
