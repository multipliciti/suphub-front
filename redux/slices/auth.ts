import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BuyerCompany, SellerCompany } from '@/types/services/company';
import { RegisterUserType, User } from '@/types/services/auth';

interface CounterState {
	statusGetUser: 'pending' | 'seccess' | 'rejected' | 'logouted';
	resetPasswordEmail: string;
	registration: RegisterUserType;
	user: User | null;
	sellerCompany: SellerCompany | null;
	buyerCompany: BuyerCompany | null;
}

const initialState: CounterState = {
	resetPasswordEmail: '',
	registration: {
		email: '',
		firstName: '',
		lastName: '',
		password: '',
	},
	statusGetUser: 'pending',
	user: null,
	sellerCompany: null,
	buyerCompany: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		resetPasswordEmailSet(state, action: PayloadAction<string>) {
			state.resetPasswordEmail = action.payload;
		},
		setRegistration(state, action: PayloadAction<RegisterUserType>) {
			state.registration = action.payload;
		},
		setUser(state, action: PayloadAction<User | null>) {
			state.user = action.payload;
		},
		setBuyerCompany(state, action: PayloadAction<BuyerCompany | null>) {
			state.buyerCompany = action.payload;
		},
		setSellerCompany(state, action: PayloadAction<SellerCompany | null>) {
			state.sellerCompany = action.payload;
		},
		setStatusGetUser(
			state,
			action: PayloadAction<'pending' | 'seccess' | 'rejected' | 'logouted'>
		) {
			state.statusGetUser = action.payload;
		},
	},
});

export const {
	resetPasswordEmailSet,
	setRegistration,
	setUser,
	setSellerCompany,
	setBuyerCompany,
	setStatusGetUser,
} = authSlice.actions;

export default authSlice.reducer;
