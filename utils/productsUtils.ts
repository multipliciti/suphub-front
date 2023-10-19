//file for additional functions for products
import { ProductFilterItem } from '@/types/products/productFilters';
import { Char } from '@/types/products/filters';

export function checkCharsEmpty(chars: Char[]): boolean {
	return chars.length === 0 ? false : true;
}

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

export function checkFiltersEmpty(filters: ProductFilterItem[]): boolean {
	return filters.some((filter) => {
		return (
			(filter.redioItems && filter.redioItems.length > 0) ||
			(filter.selectedItems && filter.selectedItems.length > 0) ||
			(filter.min !== undefined && filter.min !== '' && filter.min !== 0) ||
			(filter.max !== undefined && filter.max !== '' && filter.max !== 0)
		);
	});
}

export function createObjFetch(
	firstArg: string | number | undefined,
	secondArg: string | number | undefined
) {
	const resObj =
		firstArg || secondArg
			? {
					warranty: {
						...(firstArg ? { gt: firstArg || secondArg } : {}),
						...(secondArg ? { lt: firstArg || secondArg } : {}),
					},
			  }
			: null;

	return resObj;
}
