import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
	isLoggedIn: boolean;
}

const initialState: CounterState = {
	isLoggedIn: false,
};

const authSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		setLoginIn(state, action: PayloadAction<boolean>) {
			state.isLoggedIn = action.payload;
		},
	},
});

export const { setLoginIn } = authSlice.actions;

export default authSlice.reducer;
