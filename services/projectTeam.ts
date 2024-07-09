import { AxiosInstance } from 'axios';
import {
	InviteTeamMemberBody,
	AssignTeamMemberToRFQBody,
} from '@/types/services/projectTeam';

export const ProjectTeamApi = (instance: AxiosInstance) => ({
	async invite(body: InviteTeamMemberBody) {
		try {
			const url = `/team-member/invite`;
			const response = await instance.post(url, body);
			return response.data;
		} catch (error) {
			console.error('Projects error:', error);
			throw error;
		}
	},

	async getAll(projectId: number) {
		try {
			const url = `/team-member/project/${projectId}`;
			const response = await instance.get(url);
			return response.data;
		} catch (error) {
			console.error('Projects error:', error);
			throw error;
		}
	},

	async delete(id: number) {
		try {
			const url = `/team-member/${id}`;
			const response = await instance.delete(url);
			return response.data;
		} catch (error) {
			console.error('Projects error:', error);
			throw error;
		}
	},

	async assignToRFQ(id: number, body: AssignTeamMemberToRFQBody) {
		try {
			const url = `/team-member/${id}`;
			const response = await instance.patch(url, body);
			return response.data;
		} catch (error) {
			console.error('Projects error:', error);
			throw error;
		}
	},
});
