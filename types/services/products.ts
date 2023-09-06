type SortOptions = {
	[key: string]: "asc" | "desc";
};

export interface ProductFind {
	limit: number;
	page: number;
	sortParams?: {
		id?: string;
		sortDirection?: SortOptions;
	};
	searchText?: string;
	searchParams?: string;
}
