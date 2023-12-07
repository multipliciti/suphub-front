import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProjectCart } from '@/types/products/cart';

export interface SelectedRows {
	sellerId: number;
	allProductIds: number[];
	selectedIds: number[];
}

interface CounterState {
	status: 'idle' | 'loading' | 'success' | 'rejected';
	projectCart: ProjectCart | null;
	selectedRows: SelectedRows[];
}

const initialState: CounterState = {
	status: 'idle',
	projectCart: null,
	selectedRows: [],
};

const projectItemSlice = createSlice({
	name: 'projectCartSlice',
	initialState,
	reducers: {
		setStatus(state, action: PayloadAction<CounterState['status']>) {
			state.status = action.payload;
		},
		setProjectCart(state, action: PayloadAction<CounterState['projectCart']>) {
			state.projectCart = action.payload;
		},
		setSelectedRows(state, action: PayloadAction<CounterState['selectedRows']>) {
			state.selectedRows = action.payload;
		},
		toggleAll(state) {
			if (!state.projectCart) {
				return;
			}
			let isAllSelected = state.selectedRows.every((item) => {
				return item.selectedIds.length === item.allProductIds.length;
			});
			state.selectedRows = state.selectedRows.map((item) => ({
				sellerId: item.sellerId,
				allProductIds: item.allProductIds,
				selectedIds: isAllSelected ? [] : item.allProductIds,
			}));
		},
		findAndToggleOneRow(
			state,
			action: PayloadAction<{ sellerId: number; productId: number }>
		) {
			const { sellerId, productId } = action.payload;

			const index = state.selectedRows.findIndex(
				(item) => item.sellerId === sellerId
			);

			if (index === -1) {
				return;
			}

			const selectedProductIds = state.selectedRows[index].selectedIds;

			const isProductIdInList = selectedProductIds.includes(productId);

			if (isProductIdInList) {
				state.selectedRows[index].selectedIds = selectedProductIds.filter(
					(item) => item !== productId
				);
			} else {
				selectedProductIds.push(productId);
			}
		},
		findAndToggleAll(state, action: PayloadAction<{ sellerId: number }>) {
			const { sellerId } = action.payload;

			const index = state.selectedRows.findIndex(
				(item) => item.sellerId === sellerId
			);

			if (index === -1) {
				return;
			}

			const isAllSelected =
				state.selectedRows[index].selectedIds.length ===
				state.selectedRows[index].allProductIds.length;

			if (isAllSelected) {
				state.selectedRows[index].selectedIds = [];
			} else {
				state.selectedRows[index].selectedIds =
					state.selectedRows[index].allProductIds;
			}
		},
		findAndChangeProductQuantity(
			state,
			action: PayloadAction<{ sellerId: number; productId: number; value: number }>
		) {
			const { sellerId, productId, value } = action.payload;

			if (!state.projectCart) {
				return;
			}

			const elementIndex = state.projectCart.elements.findIndex(
				(item) => item.sellerId === sellerId
			);

			if (elementIndex === -1) {
				return;
			}

			const productIndex = state.projectCart.elements[
				elementIndex
			].products.findIndex((item) => item.id === productId);

			if (productIndex === -1) {
				return;
			}

			state.projectCart.elements[elementIndex].products[productIndex].quantity =
				value;
		},
		deleteProductFromCart(
			state,
			action: PayloadAction<{ sellerId: number; productId: number }>
		) {
			const { sellerId, productId } = action.payload;

			if (!state.projectCart) {
				return;
			}
			const sellerIndex = state.projectCart.elements.findIndex(
				(item) => item.sellerId === sellerId
			);
			if (sellerIndex === -1) {
				return;
			}
			state.projectCart.elements[sellerIndex].products = state.projectCart.elements[
				sellerIndex
			].products.filter((item) => item.id !== productId);
		},
		reset: () => initialState,
	},
});

export const {
	setStatus,
	setProjectCart,
	setSelectedRows,
	toggleAll,
	findAndToggleOneRow,
	findAndToggleAll,
	findAndChangeProductQuantity,
	deleteProductFromCart,
	reset,
} = projectItemSlice.actions;

export default projectItemSlice.reducer;
