import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductItemType } from '@/types/products/product';

interface initialStateType {
	products: ProductItemType[];
	activePage: number;
	total: number;
	status: 'pending' | 'success' | 'rejected';
}

const initialState: initialStateType = {
	products: [],
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
		setProducts(state, action: PayloadAction<ProductItemType[]>) {
			state.products = action.payload;
		},
		setTotal(state, action: PayloadAction<number>) {
			state.total = action.payload;
		},
		setStatus(state, action: PayloadAction<'pending' | 'success' | 'rejected'>) {
			state.status = action.payload;
		},
	},
});

export const { setActivePage, setProducts, setTotal, setStatus } =
	marketplaceProduct.actions;

export default marketplaceProduct.reducer;
