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
	// favorites: any[];
	activePage: number;
	total: number;
	status: 'pending' | 'seccess' | 'rejected';
}

const initialState: initialStateType = {
	products: [],
	activePage: 1,
	
	total: 0,
	status: 'pending',
};

const productSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setActivePage(state, action: PayloadAction<number>) {
			state.activePage = action.payload;
		},
		setProducts(state, action: PayloadAction<ProductItemType[]>) {
			state.products = action.payload;
		},
		setTotal(state, action: PayloadAction<number>) {
			state.total = action.payload;
		},
		setStatus(state, action: PayloadAction<'pending' | 'seccess' | 'rejected'>) {
			state.status = action.payload;
		},
	},
});

export const { setActivePage, setProducts, setTotal, setStatus } =
	productSlice.actions;

export default productSlice.reducer;
