export type ProjectType = 'singleFamily' | 'multifamily' | 'custom';

export interface Project {
	id: number;
	name: string;
	budget: number;
	floorArea: number;

	type: ProjectType;

	addressId: number | null;
	buyerId: number | null;

	address?: {
		street: string;
		city: string;
		state: string;
		country: string;
		zipcode: string;
	};

	updatedAt: string;
	createdAt: string;
}
