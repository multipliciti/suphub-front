import { AxiosInstance } from 'axios';
import {
	NewPasswordType,
	RegisterUserType,
	RecoveryType,
	confirmEmailType,
	User,
} from '@/types/services/auth';
import { LoginDto } from '@/types/services/auth';

const HOST = process.env.NEXT_PUBLIC_CLIENT_HOST;

export const AuthApi = (instance: AxiosInstance) => ({
	async resendAuth(user: RegisterUserType) {
		try {
			const url = '/auth/resend';
			const response = await instance.post(url, user);
			return response.data;
		} catch (error) {
			console.error('User resendAuthUser error:', error);
			throw error;
		}
	},
	async registerUser(user: RegisterUserType) {
		try {
			const url = '/auth/registration';
			const response = await instance.post(url, user);
			return response.data;
		} catch (error) {
			console.error('User registration error:', error);
			throw error;
		}
	},
	async loginUser(user: LoginDto) {
		try {
			const url = '/auth/login';
			const response = await instance.post(url, user);
			return response.data;
		} catch (error) {
			console.error('User login error:', error);
			throw error;
		}
	},
	async confirmEmail(data: confirmEmailType) {
		try {
			const url = '/auth/confirm';
			const response = await instance.post(url, data);
			return response.data;
		} catch (error) {
			console.error('New password error:', error);
			throw error;
		}
	},
	async createPassword(data: NewPasswordType) {
		try {
			const url = '/auth/create-password';
			const response = await instance.post(url, data);
			return response.data;
		} catch (error) {
			console.error('New password error:', error);
			throw error;
		}
	},
	async recovery(data: RecoveryType) {
		const requestData = {
			...data,
			recoveryUrl: `${HOST}/auth/confirm-email`,
		};
		try {
			const url = '/auth/recovery';
			const response = await instance.post(url, requestData);
			return response;
		} catch (error) {
			console.error('Error recovery:', error);
			throw error;
		}
	},
	async logout() {
		try {
			const url = '/auth/logout';
			const response = await instance.post(url);
			return response;
		} catch (error) {
			console.error('Error logout:', error);
			throw error;
		}
	},
	async getUser() {
		try {
			const url = '/auth/get-user';
			const response = await instance.post(url);
			return response;
		} catch (error) {
			console.error('Error getUser:', error);
			throw error;
		}
	},
});
