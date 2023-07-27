interface ProductFilterItem {
	title: string;
	type: string;
	min?: string;
	max?: string;
	items?: {
		id: number;
		title: string;
	}[];
	selectedItems?: number[];
}

export interface ProductFilter {
	store: ProductFilterItem[];
}
