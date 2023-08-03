import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import product_img from '@/imgs/Marketplace/Products/product_test2.jpeg';
import { StaticImageData } from 'next/image';
import { ProductItemType } from '@/types/marketplace/product';

interface Product {
	img: StaticImageData;
	id: number;
	title: string;
	price: number;
	description: {
		[key: string]: string;
	};
}

interface initialStateType {
	products: ProductItemType[];
	favorite: number[];
	activePage: number;
	total: number;
}

const initialState: initialStateType = {
	products: [],
	activePage: 1,
	favorite: [],
	total: 0,
};

const productSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		toggleFavorite(state, action: PayloadAction<number>) {
			const id = action.payload;
			const selected = state.favorite.includes(id);

			if (selected) {
				state.favorite = state.favorite.filter((el) => el !== id);
			} else {
				state.favorite.push(id);
			}
		},
		setActivePage(state, action: PayloadAction<number>) {
			state.activePage = action.payload;
		},
		setProducts(state, action: PayloadAction<ProductItemType[]>) {
			state.products = action.payload;
		},
		setTotal(state, action: PayloadAction<number>) {
			state.total = action.payload;
		},
	},
});

export const { toggleFavorite, setActivePage, setProducts, setTotal } =
	productSlice.actions;

export default productSlice.reducer;
