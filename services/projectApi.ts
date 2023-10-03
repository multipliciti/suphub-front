import { AxiosInstance } from 'axios';
import { ProjectFind } from '@/types/services/projects';

export const ProjectApi = (instance: AxiosInstance) => ({
	async getProject({ page, limit, sortParams, searchParams }: ProjectFind) {
		try {
			const params = new URLSearchParams();
			page ? params.set('page', String(page)) : null;
			limit ? params.set('limit', String(limit)) : null;
			sortParams
				? params.set('sort', encodeURIComponent(JSON.stringify(sortParams)))
				: null;
			searchParams ? params.set('find', searchParams) : null;

			const url = `/project?${params.toString()}`;
			const response = await instance.get(url);
			return response.data;
		} catch (error) {
			console.error('Projects error:', error);
			throw error;
		}
	},
	async getProjectOne(id: number) {
		try {
			const url = `/project/${id}`;
			const response = await instance.get(url);
			return response.data;
		} catch (error) {
			console.error('Projects error:', error);
			throw error;
		}
	},
});
