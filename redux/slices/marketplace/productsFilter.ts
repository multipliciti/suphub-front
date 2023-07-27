import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductFilter } from '@/types/marketplace/productFilters';

const initialState: ProductFilter = {
	store: [
		{
			title: 'Unit Price',
			type: 'range',
			min: '',
			max: '',
		},
		{
			title: 'Lead time',
			type: 'radio',
			items: [
				{
					id: 1,
					title: '5 days - 15 days',
				},
				{
					id: 2,
					title: '15 days - 30 days',
				},
				{
					id: 3,
					title: '30 days - 45 days',
				},
			],
			selectedItems: [],
		},
		{
			title: 'MOQ',
			type: 'range',
			min: '',
			max: '',
		},
		{
			title: 'Warranty',
			type: 'range',
			min: '',
			max: '',
		},
		{
			title: 'Country of origin',
			type: 'select',
			items: [
				{
					id: 1,
					title: 'Canada',
				},
				{
					id: 2,
					title: 'China',
				},
				{
					id: 3,
					title: 'UK',
				},
				{
					id: 4,
					title: 'USA',
				},
			],
			selectedItems: [],
		},
	],
};

const productsFilter = createSlice({
	name: 'productsFilters',
	initialState,
	reducers: {},
});

export const {} = productsFilter.actions;

export default productsFilter.reducer;
