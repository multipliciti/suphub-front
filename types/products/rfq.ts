export interface Project {
	id: number;
	name: string;
	type: string;
	budget: number;
	floorArea: number;
	street: string;
	city: string;
	state: string;
	country: string;
	zipcode: string;
	buyerId: number;
	updatedAt: string;
	createdAt: string;
}

export interface RfqItem {
	id: number;
	productName: string;
	quantity: number;
	budget: number;
	size: string;
	certifications: string;
	additionalComments: string;
	status: string;
	cover: string;
	subCategoryId: number;
	projectId: number;
	updatedAt: string;
	createdAt: string;
	option: any[];
}
