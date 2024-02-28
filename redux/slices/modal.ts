import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Sample } from '@/types/products/product';
import { SampleProps } from '@/types/products/product';

type ModalType =
	| ''
	| 'login'
	| 'forgotPassword'
	| 'checkEmail'
	| 'reset sucsess'
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
	| 'addSampleToCart'
	| 'addSampleToCartFromOption';

interface CounterState {
	modal: ModalType;
	//for recover email
	email: string;
	//for sample add to cart
	sample: SampleProps | null;
	//for sample add to cart on options page (<OptionsView />)
	samples: Sample[] | null;
	projectId: number;
}

const initialState: CounterState = {
	modal: '',
	email: '',
	sample: null,
	samples: null,
	projectId: -1,
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
		setSample(state, action: PayloadAction<SampleProps>) {
			state.sample = action.payload;
		},
		setSamples(state, action: PayloadAction<Sample[]>) {
			state.samples = action.payload;
		},
		setProjectId(state, action: PayloadAction<number>) {
			state.projectId = action.payload;
		},
	},
});

export const { setModal, setEmail, setSample, setSamples, setProjectId } =
	modalSlice.actions;
export default modalSlice.reducer;
