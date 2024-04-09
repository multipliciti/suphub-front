import { ProductItemType } from '@/types/products/product';
import { ImageType } from '@/types/products/image';
import { RfqOption } from '@/types/products/rfq';
import { Sample } from '@/types/products/sample';

export interface CartProduct {
	id: number;

	price: number;
	quantity: number;
	purchased: boolean;

	modelId: number;
	model: CartModel;

	cartId: number;

	updatedAt: string;
	createdAt: string;
}

export interface CartElement {
	sellerId: number;
	sellerName: string;
	products: CartProduct[];
}

export interface ProjectCart {
	id: number;
	projectId: number;

	processed: boolean;

	elements: CartElement[];

	updatedAt: string;
	createdAt: string;
}

type CartModel = (RfqOption | ModifiedSample) & {
	product?: ModifiedProductItemType;
	//name appears only on samples
	name?: string;
};

type ModifiedSample = Omit<Sample, 'images'> & { size: number };

interface ModifiedProductItemType extends Omit<ProductItemType, 'images'> {
	images: CartImage[];
}

interface CartImage {
	id: number;
	imageId: number;
	productId: number;

	image: ImageType;

	updatedAt: string;
	createdAt: string;
}
