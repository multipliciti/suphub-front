import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FindSellerProductsParams } from '@/types/services/sellerProduct';
import { PaginationResponse } from '@/types/pagination';
import { ProductItemType } from '@/types/products/product';
import { ImageType } from '@/types/products/image';

interface CounterState {
	params: FindSellerProductsParams;
	sort: {};
	pagination: {
		total: number;
		label: string;
	};
	status: 'idle' | 'loading' | 'success' | 'rejected' | 'refetch';
	result: ProductItemType[];
}

const initialState: CounterState = {
	params: {
		find: {
			name: {
				contains: '',
			},
			subCategoryId: {
				in: [],
			},
			status: {
				in: [],
			},
		},
		page: 1,
		limit: 10,
	},
	sort: {},
	pagination: {
		total: 0,
		label: '',
	},
	status: 'idle',
	result: [],
};

const storefrontProductsSlice = createSlice({
	name: 'storefrontProducts',
	initialState,
	reducers: {
		setResult(state, action: PayloadAction<PaginationResponse<ProductItemType[]>>) {
			const data = action.payload;

			state.pagination = {
				total: data.totalPages,
				label: data.pagination,
			};
			state.result = data.result;
		},
		setImagesForProductItem(
			state,
			action: PayloadAction<{ productId: number; images: ImageType[] }>
		) {
			const { productId, images } = action.payload;

			const productIndex = state.result.findIndex((item) => item.id === productId);

			if (productIndex === -1) {
				return;
			}

			state.result[productIndex].images = images;
		},
		setStatus(state, action: PayloadAction<CounterState['status']>) {
			state.status = action.payload;
		},
		setPage(state, action: PayloadAction<number>) {
			state.params.page = action.payload;
		},
		setSearchFilter(
			state,
			action: PayloadAction<FindSellerProductsParams['find']['name']['contains']>
		) {
			state.params.page = 1;
			state.params.find.name.contains = action.payload;
		},
		setSubcategoryFilter(
			state,
			action: PayloadAction<FindSellerProductsParams['find']['subCategoryId']['in']>
		) {
			state.params.page = 1;
			state.params.find.subCategoryId.in = action.payload;
		},
		setStatusFilter(
			state,
			action: PayloadAction<FindSellerProductsParams['find']['status']['in']>
		) {
			state.params.find.status.in = action.payload;
		},
	},
});

export const {
	setResult,
	setImagesForProductItem,
	setStatus,
	setPage,
	setSearchFilter,
	setSubcategoryFilter,
	setStatusFilter,
} = storefrontProductsSlice.actions;

export default storefrontProductsSlice.reducer;
