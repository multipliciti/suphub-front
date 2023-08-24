import { AxiosInstance } from 'axios';
import {
	NewPasswordType,
	RegisterUserType,
	RecoveryType,
	confirmEmailType,
} from '@/types/services/auth';
import { LoginDto } from '@/types/services/auth';

const HOST = process.env.NEXT_PUBLIC_CLIENT_HOST;

export const AuthApi = (instance: AxiosInstance) => ({
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
			recoveryUrl: `${HOST}/reset-password`,
		};

		try {
			const url = '/auth/recovery';
			await instance.post(url, requestData);
		} catch (error) {
			console.error('Error logout:', error);
			throw error;
		}
	},
	async logout() {
		try {
			const url = '/auth/logout';
			await instance.post(url);
		} catch (error) {
			console.error('Error logout:', error);
			throw error;
		}
	},
});
