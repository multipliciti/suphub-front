import { AxiosInstance } from 'axios';
import {
	CreateProjectBody,
	FindAllProjectsParams,
	ProjectFind,
} from '@/types/services/projects';
import { PaginationResponse } from '@/types/pagination';
import { Project } from '@/types/products/project';

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

	async getAllProjects(params: FindAllProjectsParams) {
		try {
			const { find, ...otherParams } = params;
			const stringifyFind = JSON.stringify({
				...(find.name.contains && { name: { contains: find.name.contains } }),
			});

			const url = `/project`;
			const response = await instance.get<PaginationResponse<Project[]>>(url, {
				params: {
					...otherParams,
					find: stringifyFind,
				},
			});
			return response.data;
		} catch (error) {
			console.error('Projects error:', error);
			throw error;
		}
	},

	async getProjectById(id: number) {
		try {
			const url = `/project/${id}`;
			const response = await instance.get<Project>(url);
			return response.data;
		} catch (error) {
			console.error('Projects error:', error);
			throw error;
		}
	},

	async createProject(body: CreateProjectBody) {
		try {
			const url = `/project`;
			const response = await instance.post<Project>(url, body);
			return response.data;
		} catch (error) {
			console.error('Projects error:', error);
			throw error;
		}
	},

	async updateProjectById(id: number, body: Partial<CreateProjectBody>) {
		try {
			const url = `/project/${id}`;
			const response = await instance.patch<Project>(url, body);
			return response.data;
		} catch (error) {
			console.error('Projects error:', error);
			throw error;
		}
	},

	async deleteProjectById(id: number) {
		try {
			const url = `/project/${id}`;
			const response = await instance.delete(url);
			return response.data;
		} catch (error) {
			console.error('Projects error:', error);
			throw error;
		}
	},
});
