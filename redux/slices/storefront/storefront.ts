import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CategoryItem } from '@/types/sideBar';


interface CounterState {
	categories: CategoryItem[] | null,
	productIdForUploadImages: number | null,

}

const initialState: CounterState = {
	categories: null,
	productIdForUploadImages: null
};


const storefrontSlice = createSlice({
	name: 'storefront',
	initialState,
	reducers: {
		setCategories(state, action: PayloadAction<CounterState['categories']>) {
			state.categories = action.payload;
		},
		setProductIdForUploadImages(state, action: PayloadAction<CounterState['productIdForUploadImages']>) {
			state.productIdForUploadImages = action.payload;
		}
	},
});


export const {
	setCategories,
	setProductIdForUploadImages
} = storefrontSlice.actions;

export default storefrontSlice.reducer;
