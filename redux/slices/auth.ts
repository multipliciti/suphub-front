import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
	isLoggedIn: boolean;
	resetPasswordEmail: string;
	registration : {
		email: string,
		firstName:string,
		lastName: string,
		password: string
	}
}

const initialState: CounterState = {
	isLoggedIn: false,
	resetPasswordEmail: '',
	registration : {
		email:'',
		firstName: '',
		lastName: '',
		password: ''
	}
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
		// setRegistration(state, action:PayloadAction<{branch: string, value: string }>){
		// 	const payload = action.payload
		// 	state.registration[payload.branch]	= payload.value
		// }
	},
});

export const { setLoginIn, resetPasswordEmailSet } = authSlice.actions;

export default authSlice.reducer;
