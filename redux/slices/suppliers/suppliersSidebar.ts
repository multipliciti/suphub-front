import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
	sidebar: boolean;
}

const initialState: CounterState = {
	sidebar: false,
};

const suppliersSidebarSlice = createSlice({
	name: 'suppliersSidebarSlice',
	initialState,
	reducers: {
		setSidebar(state, action: PayloadAction<boolean>) {
			state.sidebar = action.payload;
		},
	},
});

export const { setSidebar } = suppliersSidebarSlice.actions;

export default suppliersSidebarSlice.reducer;
