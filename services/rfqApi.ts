import { AxiosInstance } from 'axios';
import { RfqFind, RfqUpdateData, RfqOption, RfqItem } from '@/types/services/rfq';

export const RfqApi = (instance: AxiosInstance) => ({
	async getProjectById({
		projectId,
		page,
		limit,
		sortParams,
		searchParams,
	}: RfqFind) {
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
	},
	async getProjectOne(id: number) {
		const url = `/rfq/${id}`;
		const response = await instance.get(url);
		return response.data;
	},
	async updateRfq(id: number, data: RfqUpdateData) {
		const url = `/rfq/${id}`;
		const response = await instance.patch(url, data);
		return response;
	},
	async createRfqItem(data: RfqItem) {
		const dataSend = {
			...data,
			...(data.certifications && { certifications: data.certifications.join(',') }),
			//hardcode
			cover: '',
		};

		console.log('dataSend', dataSend);

		const url = `/rfq/`;
		const response = await instance.post(url, dataSend);
		return response;
	},
});
