import { AxiosInstance } from 'axios';

import {
	SampleCreate,
	SampleDeleteImages,
	SampleUpdate,
} from '@/types/services/sample';
import { Sample } from '@/types/products/sample';

export const SampleApi = (instance: AxiosInstance) => ({
	async findAllByProductId(productId: number) {
		try {
			const url = `/sample/${productId}`;
			const response = await instance.get<Sample[]>(url);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	async create(body: SampleCreate) {
		try {
			const formatData = new FormData();
			Object.entries(body).forEach(([key, value]) =>
				formatData.append(key, String(value))
			);

			const url = '/sample';
			const response = await instance.post<Sample>(url, formatData);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	async update(id: number, body: SampleUpdate) {
		try {
			const url = `/sample/${id}`;
			const response = await instance.patch(url, body);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	async delete(id: number) {
		try {
			const url = `/sample/${id}`;
			const response = await instance.delete(url);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	async uploadImages(sampleId: number, images: File[]) {
		try {
			const formData = new FormData();
			images.forEach((item) => {
				formData.append('images', item);
			});

			const url = `/sample/image/${sampleId}`;
			const response = await instance.post<Sample>(url, formData);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	async deleteImages(body: SampleDeleteImages) {
		try {
			const url = `/sample/image`;
			const response = await instance.delete<Sample>(url, { data: body });
			return response.data;
		} catch (error) {
			throw error;
		}
	},
});
