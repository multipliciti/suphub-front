import { CartProduct } from '@/types/products/cart';

export const generateProductLabels = (model: CartProduct['model']): string[] => {
	const labels: string[] = [];

	if (model.size) {
		labels.push(`Size ${model.size}`);
	}
	return labels;
};
