import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
	modal:
		| ''
		| 'login'
		| 'forgotPassword'
		| 'checkEmail'
		| 'reset sucsess'
		| 'registration'
		| 'verifyEmail';
}

const initialState: CounterState = {
	modal: '',
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
			>
		) {
			state.modal = action.payload;
		},
	},
});

export const { setModal } = modalSlice.actions;

export default modalSlice.reducer;
