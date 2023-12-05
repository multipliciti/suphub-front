import { Sample } from '@/types/products/sample';

export interface SampleCreate
	extends Omit<Sample, 'id' | 'quantity' | 'createdAt' | 'updatedAt'> {}

export interface SampleUpdate
	extends Partial<
		Omit<Sample, 'id' | 'productId' | 'images' | 'createdAt' | 'updatedAt'>
	> {}

export interface SampleDeleteImages {
	id: number;
	imageIds: number[];
}
