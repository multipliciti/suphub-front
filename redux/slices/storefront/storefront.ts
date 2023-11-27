import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CategoryItem } from '@/types/sideBar';
import { SellerCompany } from '@/types/services/company';

interface CounterState {
	sidebar: boolean;
	sellerCompany: SellerCompany | null;
	categories: CategoryItem[] | null;
	productIdForUploadImages: number | null;
}

const initialState: CounterState = {
	sidebar: false,
	sellerCompany: null,
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
		setSellerCompany(state, action: PayloadAction<SellerCompany>) {
			state.sellerCompany = action.payload;
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
		resetStorefrontState(state) {
			return initialState;
		},
	},
});

export const {
	setSidebar,
	setSellerCompany,
	setCategories,
	setProductIdForUploadImages,
	resetStorefrontState,
} = storefrontSlice.actions;

export default storefrontSlice.reducer;
