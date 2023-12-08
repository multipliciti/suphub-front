import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CategoryItem } from '@/types/sideBar';

interface CounterState {
	sidebar: boolean;
	categories: CategoryItem[] | null;
	productIdForUploadImages: number | null;
}

const initialState: CounterState = {
	sidebar: false,
	categories: null,
	productIdForUploadImages: null,
};

const storefrontSlice = createSlice({
	name: 'storefront',
	initialState,
	reducers: {
		setSidebar(state, action: PayloadAction<boolean>) {
			state.sidebar = action.payload;
		},
		setCategories(state, action: PayloadAction<CounterState['categories']>) {
			state.categories = action.payload;
		},
		setProductIdForUploadImages(
			state,
			action: PayloadAction<CounterState['productIdForUploadImages']>
		) {
			state.productIdForUploadImages = action.payload;
		},
		resetStorefrontState() {
			return initialState;
		},
	},
});

export const {
	setSidebar,
	setCategories,
	setProductIdForUploadImages,
	resetStorefrontState,
} = storefrontSlice.actions;

export default storefrontSlice.reducer;
