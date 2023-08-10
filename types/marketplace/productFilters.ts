export interface ProductFilterItem {
	title: string;
	type: string;
	key: string;
	min?: string;
	max?: string;
	items?: {
		id: number;
		title: string;
		value: string;
	}[];
	selectedItems?: number[];
}

export interface ProductFilter {
	storeProductsFilter: ProductFilterItem[];
	storeFavoriteFilter: ProductFilterItem[];
}
