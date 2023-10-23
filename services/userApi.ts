import { AxiosInstance } from 'axios';
import { UpdateUser } from '@/types/services/auth';

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
	async update(id: number, data: UpdateUser) {
		try {
			const url = '/user/' + id.toString();
			const response = await instance.patch(url, data);
			return response;
		} catch (error) {
			console.error('Error update:', error);
			throw error;
		}
	},
});
