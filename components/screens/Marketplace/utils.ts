import { Char } from '@/types/products/filters';
import { ProductFilterItem } from '@/types/products/productFilters';

export const transformCharData = (charData: Char[]) => {
	if (charData.length === 0) {
		return {};
	}

	const transformedData = {
		char: charData.map((item) => ({
			attributeId: item.attributeId,
			attrValueIds: item.attrValueIds,
		})),
	};

	return transformedData;
};


