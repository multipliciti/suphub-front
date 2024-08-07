import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Sample } from '@/types/products/product';
import { SampleProps } from '@/types/products/product';
import { RfqFile } from '@/types/services/rfq';

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
	| 'addSampleToCartFromOption'
	| 'goToCart'
	| 'filePreview'
	| 'inviteSuppliers'
	| 'suppliersInvited'
	| 'manageTeam'
	| 'teamMembersInvited';

interface CounterState {
	modal: ModalType;
	//for recover email
	email: string;
	//for sample add to cart
	sample: SampleProps | null;
	//for sample add to cart on options page (<OptionsView />)
	samples: Sample[] | null;
	projectId: number;
	//The card number when something has been successfully added to the cart for reference.
	projectCart: number;
	previewFile: RfqFile | null;
}

const initialState: CounterState = {
	modal: '',
	email: '',
	sample: null,
	samples: null,
	projectId: -1,
	projectCart: -1,
	previewFile: null,
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
		setCartProject(state, action: PayloadAction<number>) {
			state.projectCart = action.payload;
		},
		setPreviewFile(state, action: PayloadAction<RfqFile | null>) {
			state.previewFile = action.payload;
		},
	},
});

export const {
	setModal,
	setEmail,
	setSample,
	setSamples,
	setProjectId,
	setCartProject,
	setPreviewFile,
} = modalSlice.actions;
export default modalSlice.reducer;
