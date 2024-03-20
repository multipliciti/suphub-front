import { SellerCompany } from './company';
import { ProjectType } from '@/types/products/project';
import { Delivery } from '@/types/services/orders';
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
	address?: {
		street: string;
		city: string;
		state: string;
		country: string;
		zipcode: string;
	};
}

export interface FetchFind {
	limit?: number;
	page?: number;
	sortParams?: {
		id?: string;
		sortDirection?: SortOptions;
	};
	searchText?: string;
	searchParams?: string;
}

export interface Order {
	id: number;
	status: string;
	type: string;
	amount: number;
	shipmentAmount: number;
	PO: string;
	sellerCompany: SellerCompany;
	delivery: Delivery;
	productNames: string[];
	buyerCompanyId: number;
	sellerCompanyId: number;
	estDate: string;
	updatedAt: string;
	createdAt: string;
}
