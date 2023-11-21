import { ProjectType } from '@/types/products/project';

type SortOptions = {
	[key: string]: 'asc' | 'desc';
};

export interface ProjectFind {
	limit?: number;
	page?: number;
	sortParams?: {
		id?: string;
		sortDirection?: SortOptions;
	};
	searchText?: string;
	searchParams?: string;
}

export interface FindAllProjectsParams {
	page: number;
	limit: number;
	find: {
		name: {
			contains: string;
		};
	};
}

export interface CreateProjectBody {
	name: string;
	type: ProjectType;
	budget: number;
	floorArea: number;
	address: {
		street: string;
		city: string;
		state: string;
		country: string;
		zipcode: string;
	};
}
