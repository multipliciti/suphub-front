import { ImageType } from '@/types/products/image';

export interface Sample {
	id: number;
	productId: number;

	name: string;
	description: string;
	price: number;

	images: ImageType[];

	updatedAt: string;
	createdAt: string;
}
