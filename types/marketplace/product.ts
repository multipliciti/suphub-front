interface att {
	attributeDescription: string;
	attributeId: number;
	label: string;
	value: string | number | null;
}

export interface ProductItemType {
	id: number;
	name: string;
	subCategoryId: number;
	attr: att[];
}
