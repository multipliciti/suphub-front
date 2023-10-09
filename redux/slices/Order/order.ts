import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StaticImageData } from 'next/image';

interface CounterState {
	img: null | StaticImageData;
}

const initialState: CounterState = {
	img: null,
};

const orderSlice = createSlice({
	name: 'orderSlicer',
	initialState,
	reducers: {
		setPhotoShow(state, action: PayloadAction<StaticImageData>) {
			state.img = action.payload;
		},
	},
});

export const { setPhotoShow } = orderSlice.actions;

export default orderSlice.reducer;
