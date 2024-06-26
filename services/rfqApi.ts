import { AxiosInstance } from 'axios';
import {
	RfqFind,
	RfqItemFetch,
	RfqEmptyItem,
	RfqDownloadFileSamle,
} from '@/types/services/rfq';

const HOST = process.env.NEXT_PUBLIC_CLIENT_HOST;

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
	async bulkUploadCsv(file: File) {
		try {
			const formData = new FormData();
			formData.append('file', file);

			const url = `/rfq/upload-csv`;
			const response = await instance.post<{ error: boolean; message: string }>(
				url,
				formData
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	async downloadFileSample(data: RfqDownloadFileSamle) {
		const url = `/rfq/download-file-sample`;
		const response = await instance.post(url, data);
		return response;
	},
	async updateRfq(rfqId: number, data: any) {
		// exclude these properties as there are separate endpoints for them.
		const dataInner = Object.fromEntries(
			Object.entries(data).filter(
				([key]) => !['cover', 'images', 'documents'].includes(key)
			)
		);

		const url = `/rfq/${rfqId}`;
		const response = await instance.patch(url, dataInner);
		return response;
	},
	async createRfqItem(data: RfqItemFetch) {
		const formData = new FormData();
		formData.append('projectId', data.projectId);
		if (data.size) formData.append('size', String(data.size));
		if (data.budget) formData.append('budget', String(data.budget));
		formData.append('subCategoryId', String(data.subCategoryId));
		formData.append('productName', data.productName);
		formData.append('redirectUrl', '/mapketplace');
		if (data.files && data.files.length > 0) {
			for (let i = 0; i < data.files.length; i++) {
				formData.append('documents', data.files[i]);
			}
		}

		data.certifications &&
			formData.append('certifications', data.certifications.join(' '));
		if (data.cover && data.cover.length > 0) {
			for (let i = 0; i < data.cover.length; i++) {
				formData.append('images', data.cover[i]);
			}
		}
		if (data.additionalComments) {
			formData.append('additionalComments', data.additionalComments);
		}

		const url = `/rfq/`;
		const response = await instance.post(url, formData);
		return response;
	},
	async createEmptyRfqItem(data: RfqEmptyItem) {
		const formData = new FormData();
		formData.append('projectId', data.projectId.toString());
		formData.append('subCategoryId', data.subCategoryId.toString());
		formData.append('productName', 'Empty Product');
		formData.append('redirectUrl', `${HOST}/marketplace`);

		const url = '/rfq/';
		const response = await instance.post(url, formData);
		return response;
	},

	async updateFiles(rfqId: number, type: string, file: File) {
		const formData = new FormData();
		formData.append('id', String(rfqId));
		formData.append('type', type);
		formData.append('files', file);

		const url = `/rfq/upload`;
		const response = await instance.post(url, formData);
		return response;
	},
	async deleteFile(rfqId: number, key: string) {
		const url = `/rfq/files?id=${rfqId}&key=${key}`;
		const response = await instance.delete(url);
		return response;
	},
});
