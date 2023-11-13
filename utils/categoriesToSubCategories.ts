import { SubCategoryItem } from '@/types/sideBar';
import { CategoryItem } from '@/types/sideBar';

interface Category {
	id: number;
	name: string;
	csiCode: string;
	updatedAt: string;
	createdAt: string;
	subCategories: SubCategoryItem[];
}

type InputArray = CategoryItem[];

export function categoriesToSubCategories(input: InputArray): SubCategoryItem[] {
	return input.reduce((accumulator, category) => {
		// Concatenate subCategories arrays from each category
		return accumulator.concat(category.subCategories);
	}, [] as SubCategoryItem[]);
}
