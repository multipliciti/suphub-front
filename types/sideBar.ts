export interface itemInner {
	id: number;
	title: string;
}

export interface SubCategoryItem {
	id: number;
	csiCode: string;
	name: string;
	categoryId: number;
	updatedAt: string;
	createdAt: string;
}

export interface CategoryItem {
	id: number;
	name: string;
	csiCode: string;
	updatedAt: string;
	createdAt: string;
	subCategories: SubCategoryItem[];
}
