import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductItemType } from '@/types/products/product';

interface ProductState {
	product: ProductItemType | null;
}

const initialState: ProductState = {
	product: null,
};

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		setProduct(state, action: PayloadAction<ProductItemType>) {
			state.product = action.payload;
		},
	},
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
