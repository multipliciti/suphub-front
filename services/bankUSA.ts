import { AxiosInstance } from 'axios';

export const BankUSA = (instance: AxiosInstance) => ({
	async add (data:any) {
		try {
			const url:string = '/bank-usa'
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
			const url:string = '/bank-usa'
			const response = await instance.get(url);
			return response
		} catch (error) {
			console.error('Upload logo error:', error);
			throw error;
		}
	},
	async update (data:any) {
		try {
			const url:string = '/bank-usa'
			const response = await instance.patch(url, data);
			return response
		} catch (error) {
			console.error('Upload logo error:', error);
			throw error;
		}
	},
});
