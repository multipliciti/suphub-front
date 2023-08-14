import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductFilter } from '@/types/marketplace/productFilters';

const initialState: ProductFilter = {
	searchFavoriteFilter: '',
	searchProductsFilter: '',
	storeFavoriteFilter: [
		{
			title: 'Unit Price',
			key: 'unitPrice',
			type: 'range',
			min: '',
			max: '',
		},
		{
			title: 'Lead time',
			key: 'leadTime',
			type: 'radio',
			items: [
				{
					id: 1,
					title: '5 days - 15 days',
					value: [5, 15],
				},
				{
					id: 2,
					title: '15 days - 30 days',
					value: [15, 30],
				},
				{
					id: 3,
					title: '30 days - 45 days',
					value: [30, 45],
				},
			],
			selectedItems: [],
		},
		{
			title: 'MOQ',
			key: 'moq',
			type: 'range',
			min: '',
			max: '',
		},
		{
			title: 'Warranty',
			key: 'warranty',
			type: 'range',
			min: '',
			max: '',
		},
		{
			title: 'Country of origin',
			type: 'select',
			key: 'countryOfOrigin',
			items: [
				{
					id: 1,
					title: '5 days - 15 days',
					value: [5, 15],
				},
				{
					id: 2,
					title: '15 days - 30 days',
					value: [15, 30],
				},
				{
					id: 3,
					title: '30 days - 45 days',
					value: [30, 45],
				},
			],
			redioItems: [],
		},
	],
	storeProductsFilter: [
		{
			title: 'Unit Price',
			key: 'unitPrice',
			type: 'range',
			min: '',
			max: '',
		},
		{
			title: 'Lead time',
			key: 'leadTime',
			type: 'radio',
			items: [
				{
					id: 1,
					title: '5 days - 15 days',
					value: [5, 15],
				},
				{
					id: 2,
					title: '15 days - 30 days',
					value: [15, 30],
				},
				{
					id: 3,
					title: '30 days - 45 days',
					value: [30, 45],
				},
			],
			redioItems: [],
		},
		{
			title: 'MOQ',
			key: 'moq',
			type: 'range',
			min: '',
			max: '',
		},
		{
			title: 'Warranty',
			type: 'range',
			key: 'warranty',
			min: '',
			max: '',
		},
		{
			title: 'Country of origin',
			key: 'countryOfOrigin',
			type: 'select',
			items: [
				{
					id: 1,
					title: 'Chicago',
					value: 'Chicago',
				},
				{
					id: 2,
					title: 'Dallas',
					value: 'Dallas',
				},
				{
					id: 3,
					title: 'Atlanta',
					value: 'Atlanta',
				},
				{
					id: 4,
					title: 'USA',
					value: 'USA',
				},
			],
			selectedItems: [],
		},
	],
};

const productsFilter = createSlice({
	name: 'productsFilters',
	initialState,
	reducers: {
		updateMinProducts: (state, action) => {
			state.storeProductsFilter = state.storeProductsFilter.map((filter) =>
				filter.key === action.payload.filterKey
					? { ...filter, min: action.payload.min }
					: filter
			);
		},
		updateMaxproducts: (state, action) => {
			state.storeProductsFilter = state.storeProductsFilter.map((filter) =>
				filter.key === action.payload.filterKey
					? { ...filter, max: action.payload.max }
					: filter
			);
		},
		updateSelectedItemsProsuct: (state, action) => {
			state.storeProductsFilter = state.storeProductsFilter.map((filter) =>
				filter.key === action.payload.filterKey
					? { ...filter, selectedItems: action.payload.selectedItems }
					: filter
			);
		},
		searchProducts: (state, action) => {
			state.searchProductsFilter = action.payload;
		},
	},
});

export const {
	updateMinProducts,
	searchProducts,
	updateMaxproducts,
	updateSelectedItemsProsuct,
} = productsFilter.actions;

export default productsFilter.reducer;
