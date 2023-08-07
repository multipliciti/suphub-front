import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
	isLoggedIn: boolean;
	resetPasswordEmail: string;
}

const initialState: CounterState = {
	isLoggedIn: false,
	resetPasswordEmail: '',
};

const authSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		setLoginIn(state, action: PayloadAction<boolean>) {
			state.isLoggedIn = action.payload;
		},
		resetPasswordEmailSet(state, action: PayloadAction<string>) {
			state.resetPasswordEmail = action.payload;
		},
	},
});

export const { setLoginIn, resetPasswordEmailSet } = authSlice.actions;

export default authSlice.reducer;
