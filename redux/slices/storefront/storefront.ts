import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CategoryItem } from '@/types/sideBar';

interface CounterState {
	sidebar: boolean;
	categories: CategoryItem[] | null;
}

const initialState: CounterState = {
	sidebar: false,
	categories: null,
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
	},
});

export const { setSidebar, setCategories } = storefrontSlice.actions;

export default storefrontSlice.reducer;
