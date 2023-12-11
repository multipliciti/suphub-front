import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalType =
	| ''
	| 'login'
	| 'forgotPassword'
	| 'checkEmail'
	| 'reset sucsess'
	| 'registration'
	| 'verifyEmail'
	| 'addToRFQCart'
	| 'editPassword'
	| 'passwordChanged'
	| 'submitForReview'
	| 'showPhoto'
	| 'addRequestManually'
	| 'submitedRFQ'
	| 'bulkUpload'
	| 'createBusinessAccount'
	| 'sellerVerificationBusinessVerification'
	| 'sellerVerificationMembershipFee'
	| 'sellerVerificationDepositSetUp'
	| 'warningTrialCanBeUsedOnce'
	| 'sellerAddNewProduct'
	| 'sellerProductBulkUpload'
	| 'sellerProductUploadImage'
	| 'deleteProject'
	| 'selectSamples';

interface CounterState {
	modal: ModalType;
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
		setModal(state, action: PayloadAction<ModalType>) {
			state.modal = action.payload;
		},
		setEmail(state, action: PayloadAction<string>) {
			state.email = action.payload;
		},
	},
});

export const { setModal, setEmail } = modalSlice.actions;

export default modalSlice.reducer;
