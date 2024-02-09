import { CartProduct } from '@/types/products/cart';

export interface CartUpdateBody extends Pick<CartProduct, 'quantity'> {}

export interface CartCreateBody {
	cartId: number;
	model: 'rfqOption' | 'sample' | 'option';
	modelId: number;
	quantity: number;
	price: number;
}
