import { AxiosInstance } from 'axios';
import {
	RfqFind,
	RfqUpdateData,
	RfqOption,
	RfqItemFetch,
} from '@/types/services/rfq';

export const RfqApi = (instance: AxiosInstance) => ({
	async getProjectById({ projectId, page, limit, searchParams }: RfqFind) {
		const params = new URLSearchParams();
		page ? params.set('page', String(page)) : null;
		limit ? params.set('limit', String(limit)) : null;
		searchParams ? params.set('find', searchParams) : null;

		const url = `/rfq/project/${projectId}?${params.toString()}`;
		const response = await instance.get(url);
		return response.data;
	},
	//the same as getProjectById
	async getRfqByProject({ projectId, page, limit, searchParams }: RfqFind) {
		console.log('searchParams', searchParams);
		const search = searchParams ? `&find=${searchParams}` : '';

		const url = `/rfq/project/${projectId}/?page=${page}&limit=${limit}${search}`;
		const response = await instance.get(url);
		return response.data;
	},
	async getRfqOne(id: number) {
		const url = `/rfq/${id}`;
		const response = await instance.get(url);
		return response.data;
	},
	async updateRfq(id: number, data: RfqUpdateData) {
		const url = `/rfq/${id}`;
		const response = await instance.patch(url, data);
		return response;
	},
	async createRfqItem(data: RfqItemFetch) {
		const dataSend = {
			...data,
			...(data.certifications && { certifications: data.certifications.join(',') }),
			//hardcode
			cover: 'https://multipliciti-app.s3.amazonaws.com/product-images/130/1230.jpg',
		};

		const url = `/rfq/`;
		const response = await instance.post(url, dataSend);
		return response;
	},
});
