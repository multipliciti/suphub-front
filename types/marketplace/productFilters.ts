export interface ProductFilterItem {
	title: string;
	type: string;
	key: string;
	min?: string;
	max?: string;
	items?: {
		id: number;
		title: string;
		value: number[] | string;
	}[];
	selectedItems?: string[];
	redioItems?: number[];
}

export interface ProductFilter {
	storeProductsFilter: ProductFilterItem[];
	storeFavoriteFilter: ProductFilterItem[];
	searchFavoriteFilter: string;
	searchProductsFilter: string;
}
