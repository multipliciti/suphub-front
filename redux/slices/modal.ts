import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
	modal:
		| ''
		| 'login'
		| 'forgotPassword'
		| 'checkEmail'
		| 'reset sucsess'
		| 'registration'
		| 'verifyEmail'
		| 'addToRFQCart';
	email: string;
}

const initialState: CounterState = {
	modal: '',
	email: '',
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		setModal(
			state,
			action: PayloadAction<
				| 'login'
				| 'forgotPassword'
				| ''
				| 'checkEmail'
				| 'reset sucsess'
				| 'registration'
				| 'verifyEmail'
				| 'addToRFQCart'
			>
		) {
			state.modal = action.payload;
		},
		setEmail(state, action: PayloadAction<string>) {
			state.email = action.payload;
		},
	},
});

export const { setModal, setEmail } = modalSlice.actions;

export default modalSlice.reducer;
