import { AxiosInstance } from 'axios';
import { CategoryItem } from '@/types/sideBar';

export const CategoryApi = (instance: AxiosInstance) => ({
	async getCategories() {
		try {
			const url = `/category`;
			const response = await instance.get<CategoryItem[]>(url);
			return response.data;
		} catch (error) {
			console.error('Category API error:', error);
			throw error;
		}
	},
});

export const categoryService = {
	getSubcategories(categories: CategoryItem[]): string[] {
		let subcategories: string[] = [];

		categories.forEach((i) => {
			i.subCategories.forEach((j) => {
				subcategories.push(j.name);
			});
		});

		return subcategories;
	},

	findSubcategoryIdByName(
		categories: CategoryItem[],
		subcategoryName: string
	): number {
		for (let i = 0; i < categories.length; i++) {
			let category = categories[i];
			for (let j = 0; j < category.subCategories.length; j++) {
				let subcategory = category.subCategories[j];
				if (subcategory.name === subcategoryName) {
					return subcategory.id;
				}
			}
		}
		return 0;
	},

	findSubcategoryNameById(categories: CategoryItem[], id: number): string {
		for (let i = 0; i < categories.length; i++) {
			let category = categories[i];
			for (let j = 0; j < category.subCategories.length; j++) {
				let subcategory = category.subCategories[j];
				if (subcategory.id === id) {
					return subcategory.name;
				}
			}
		}
		return '';
	},
};
