import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StaticImageData } from 'next/image';

interface CounterState {
	img: null | StaticImageData | string;
}

const initialState: CounterState = {
	img: null,
};

const orderSlice = createSlice({
	name: 'orderSlicer',
	initialState,
	reducers: {
		setPhotoShow(state, action: PayloadAction<StaticImageData | string>) {
			state.img = action.payload;
		},
	},
});

export const { setPhotoShow } = orderSlice.actions;

export default orderSlice.reducer;
