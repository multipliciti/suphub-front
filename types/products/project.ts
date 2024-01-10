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

export type ProjectType =
	| 'singleFamily'
	| 'commercial'
	| 'custom'
	| 'renovation'
	| 'retrofit'
	| 'residential';

export const projectTypeLabels: { [key in ProjectType]: string } = {
	singleFamily: 'Single Family Project',
	commercial: 'Commercial Project',
	custom: 'Custom Project',
	renovation: 'Renovation Project',
	retrofit: 'Retrofit Project',
	residential: 'Residential Project',
};
