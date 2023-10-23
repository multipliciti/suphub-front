import { AxiosInstance } from 'axios';

const HOST = process.env.NEXT_PUBLIC_CLIENT_HOST;

export const sideBarApi = (instance: AxiosInstance) => ({
	async getCategoryies() {
		try {
			const url = `/category`;
			const response = await instance.get(url);
			return response.data;
		} catch (error) {
			console.error('Products error:', error);
			throw error;
		}
	},
});
