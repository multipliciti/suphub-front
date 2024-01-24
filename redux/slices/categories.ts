import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
	categories: any;
}

const initialState: CounterState = {
	categories: [],
};

const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		setCategories: (state, action: PayloadAction<string>) => {
			state.categories = action.payload;
		},
	},
});

export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
