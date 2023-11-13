import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegisterUserType, User } from '@/types/services/auth';
interface CounterState {
	statusGetUser: 'pending' | 'seccess' | 'rejected' | 'logouted';
	resetPasswordEmail: string;
	registration: RegisterUserType;
	user: User | null;
}

const initialState: CounterState = {
	resetPasswordEmail: '',
	registration: {
		email: '',
		firstName: '',
		lastName: '',
		password: '',
	},
	user: null,
	statusGetUser: 'pending',
};

const authSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		resetPasswordEmailSet(state, action: PayloadAction<string>) {
			state.resetPasswordEmail = action.payload;
		},
		setRegistration(state, action: PayloadAction<RegisterUserType>) {
			const payload = action.payload;
			state.registration = payload;
		},
		setUser(state, action: PayloadAction<User | null>) {
			const payload = action.payload;
			state.user = payload;
		},
		setStatusGetUser(
			state,
			action: PayloadAction<'pending' | 'seccess' | 'rejected' | 'logouted'>
		) {
			const payload = action.payload;
			state.statusGetUser = payload;
		},
	},
});

export const { resetPasswordEmailSet, setRegistration, setUser, setStatusGetUser } =
	authSlice.actions;

export default authSlice.reducer;
