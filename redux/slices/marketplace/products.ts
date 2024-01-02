import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductItemType } from '@/types/products/product';

interface initialStateType {
	activePage: number;
	total: number;
	status: 'pending' | 'success' | 'rejected';
}

const initialState: initialStateType = {
	activePage: 1,
	total: 0,
	status: 'pending',
};

const marketplaceProduct = createSlice({
	name: 'marketplaceProducts',
	initialState,
	reducers: {
		setActivePage(state, action: PayloadAction<number>) {
			state.activePage = action.payload;
		},

		setTotal(state, action: PayloadAction<number>) {
			state.total = action.payload;
		},
		setStatus(state, action: PayloadAction<'pending' | 'success' | 'rejected'>) {
			state.status = action.payload;
		},
	},
});

export const { setActivePage, setTotal, setStatus } = marketplaceProduct.actions;

export default marketplaceProduct.reducer;
