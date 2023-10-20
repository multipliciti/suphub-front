import { AxiosInstance } from 'axios';

export const UserApi = (instance: AxiosInstance) => ({
	async get() {
		try {
			const url = `/user`;
			const response = await instance.get(url);
			return response;
		} catch (error) {
			console.error('AddToRfqCart error:', error);
			throw error;
		}
	},
	async update(id, data) {
		try {
			const url = '/user/' + id;
			const response = await instance.patch(url, data);
			return response;
		} catch (error){
			console.error('Error update:', error);
			throw error;
		}
	}
});
