import { ProductItemType } from '@/types/products/product';
import { ImageType } from '@/types/products/image';

export interface Sample {
	id: number;

	name: string;
	description: string;
	quantity: number;
	price: number;

	images: ImageType[];

	productId: number;
	product?: ProductItemType;

	updatedAt: string;
	createdAt: string;
}
