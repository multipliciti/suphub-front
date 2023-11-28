import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
	rfqId: number;
}

const initialState: CounterState = {
	rfqId: -1,
};

const sideBarRequestDetailSlice = createSlice({
	name: 'sellerSidebar',
	initialState,
	reducers: {
		setRfqId(state, action: PayloadAction<number>) {
			state.rfqId = action.payload;
		},
	},
});

export const { setRfqId } = sideBarRequestDetailSlice.actions;

export default sideBarRequestDetailSlice.reducer;
