import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
	sideBar: boolean;
}

const initialState: CounterState = {
	sideBar: true,
};

const sellerSidebarSlice = createSlice({
	name: 'sellerSidebar',
	initialState,
	reducers: {
		setBuyerSideBar(state, action: PayloadAction<boolean>) {
			state.sideBar = action.payload;
		},
	},
});

export const { setBuyerSideBar } = sellerSidebarSlice.actions;

export default sellerSidebarSlice.reducer;
