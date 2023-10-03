import { AxiosInstance } from 'axios';
import { RfqFind, RfqUpdateData, RfqOption } from '@/types/services/rfq';

export const RfqApi = (instance: AxiosInstance) => ({
	async getProjectById({
		projectId,
		page,
		limit,
		sortParams,
		searchParams,
}: RfqFind) {
		try {
			const params = new URLSearchParams();
			page ? params.set('page', String(page)) : null;
			limit ? params.set('limit', String(limit)) : null;
			sortParams
				? params.set('sort', encodeURIComponent(JSON.stringify(sortParams)))
				: null;
			searchParams ? params.set('find', JSON.stringify(searchParams)) : null;

			const url = `/rfq/project/${projectId}?${params.toString()}`;
			const response = await instance.get(url);
			return response.data;
		} catch (error) {
			console.error('AddToRfqCart error:', error);
			throw error;
		}
	},
	async getProjectOne(id: number) {
		try {
			const url = `/rfq/${id}`;
			const response = await instance.get(url);
			return response.data;
		} catch (error) {
			console.error('AddToRfqCart error:', error);
			throw error;
		}
	},
	async updateRfq(id: number, data: RfqUpdateData) {
		try {
			const url = `/rfq/${id}`;
			const response = await instance.patch(url, data);
			return response;
		} catch (error) {
			console.error('AddToRfqCart error:', error);
			throw error;
		}
	},
	async rfqOption(data: RfqOption) {
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
