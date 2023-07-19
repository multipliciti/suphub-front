import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
	switchModal: boolean;
	modal: '' | 'login' | 'ForgotPassword' | 'checkEmail';
}

const initialState: CounterState = {
	switchModal: false,
	modal: 'checkEmail',
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		switchModal(state, action: PayloadAction<boolean>) {
			state.switchModal = action.payload;
		},
		setModal(
			state,
			action: PayloadAction<'login' | 'ForgotPassword' | '' | 'checkEmail'>
		) {
			state.modal = action.payload;
		},
	},
});

export const { setModal, switchModal } = modalSlice.actions;

export default modalSlice.reducer;
