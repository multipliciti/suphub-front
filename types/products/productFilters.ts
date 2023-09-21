export interface ProductFilterItem {
	title: string;
	type: string;
	key: string;
	min?: string | number;
	max?: string | number;
	items?: {
		id: number;
		title: string;
		value: number[] | string;
	}[];
	selectedItems?: string[];
	redioItems?: number[];
}

type SortOptions = {
	[key: string]: "ask" | "desk";
};

export interface ProductFilter {
	activeTitle: string
	sortDirection: null | SortOptions;
	storeProductsFilter: ProductFilterItem[];
	searchFavoriteFilter: string;
	searchProductsFilter: string;
}
