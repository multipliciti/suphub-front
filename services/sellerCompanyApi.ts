import { AxiosInstance } from 'axios';
import {
	RegisterSellerCompany,
	UpdateSellerCompany,
	RemoveCertification,
	SellerCompany,
	CompanyAdminAccountApplicationData,
} from '@/types/services/company';

export const SellerCompanyApi = (instance: AxiosInstance) => ({
	async register(data: RegisterSellerCompany) {
		try {
			const url = '/seller';
			const response = await instance.post(url, data);
			return response;
		} catch (error) {
			console.error('Register error:', error);
			throw error;
		}
	},
	async getAll() {
		try {
			const url = '/seller';
			const response = await instance.get(url);
			return response;
		} catch (error) {
			console.error('Get all error:', error);
			throw error;
		}
	},
	async getById(id: number) {
		try {
			const url: string = `/seller/` + id.toString();
			const response = await instance.get<SellerCompany>(url);
			return response;
		} catch (error) {
			console.error('Get by id error:', error);
			throw error;
		}
	},
	async update(id: number, data: UpdateSellerCompany) {
		try {
			const url: string = `/seller/` + id.toString();

			const response = await instance.patch(url, data);
			return response;
		} catch (error) {
			console.error('Update error:', error);
			throw error;
		}
	},
	async uploadLogo(data: FormData) {
		try {
			const url = '/seller/upload/logo';
			const response = await instance.post(url, data);
			return response;
		} catch (error) {
			console.error('Upload logo error:', error);
			throw error;
		}
	},
	async uploadCertification(data: FormData) {
		try {
			const url = '/seller/upload/certification';
			const response = await instance.post(url, data);
			return response;
		} catch (error) {
			console.error('Upload certification error:', error);
			throw error;
		}
	},
	async removeCertification(data: RemoveCertification) {
		try {
			const url = '/seller/certification';

			const response: any = await instance.delete(url, { data });
			return response;
		} catch (error) {
			console.error('Remove certification error:', error);
			throw error;
		}
	},
	async adminApprove({ id, params }: CompanyAdminAccountApplicationData) {
		return await instance.patch(`/seller/admin-approve/${id}`, null, { params });
	},
	async adminDecline({ id, params }: CompanyAdminAccountApplicationData) {
		return await instance.patch(`/seller/admin-decline/${id}`, null, { params });
	},
});
