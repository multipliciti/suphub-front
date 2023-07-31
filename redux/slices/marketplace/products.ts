import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import product_img from '@/imgs/Marketplace/Products/product_test2.jpeg';
import { StaticImageData } from 'next/image';

interface Product {
	img: StaticImageData;
	id: number;
	title: string;
	price: number;
	description: {
		[key: string]: string;
	};
}

interface initialStateType {
	products: Product[];
	favorite: number[];
}

const initialState: initialStateType = {
	products: [
		{
			img: product_img,
			id: 1,
			title: 'Vinyl Double Pane Fixed Window...',
			price: 1,
			description: {
				MOQ: '10 units',
				'Lead time (weeks)': '40-50 days',
				Warranty: '12 month',
				Certification: 'AAMA, NFRC...',
				Width: '36”',
				Height: '60”',
				Opening: 'Casement',
				'Frame material': 'Aluminum frame',
				'Glass type': 'Safety glass',
			},
		},
		{
			img: product_img,
			id: 2,
			title: 'Vinyl Double Pane Fixed Window...',
			price: 1,
			description: {
				MOQ: '10 units',
				'Lead time (weeks)': '40-50 days',
				Warranty: '12 month',
				Certification: 'AAMA, NFRC...',
				Width: '36”',
				Height: '60”',
				Opening: 'Casement',
				'Frame material': 'Aluminum frame',
				'Glass type': 'Safety glass',
			},
		},
		{
			img: product_img,
			id: 3,
			title: 'Vinyl Double Pane Fixed Window...',
			price: 1,
			description: {
				MOQ: '10 units',
				'Lead time (weeks)': '40-50 days',
				Warranty: '12 month',
				Certification: 'AAMA, NFRC...',
				Width: '36”',
				Height: '60”',
				Opening: 'Casement',
				'Frame material': 'Aluminum frame',
				'Glass type': 'Safety glass',
			},
		},
		{
			img: product_img,
			id: 4,
			title: 'Vinyl Double Pane Fixed Window...',
			price: 1,
			description: {
				MOQ: '10 units',
				'Lead time (weeks)': '40-50 days',
				Warranty: '12 month',
				Certification: 'AAMA, NFRC...',
				Width: '36”',
				Height: '60”',
				Opening: 'Casement',
				'Frame material': 'Aluminum frame',
				'Glass type': 'Safety glass',
			},
		},
		{
			img: product_img,
			id: 5,
			title: 'Vinyl Double Pane Fixed Window...',
			price: 1,
			description: {
				MOQ: '10 units',
				'Lead time (weeks)': '40-50 days',
				Warranty: '12 month',
				Certification: 'AAMA, NFRC...',
				Width: '36”',
				Height: '60”',
				Opening: 'Casement',
				'Frame material': 'Aluminum frame',
				'Glass type': 'Safety glass',
			},
		},
		{
			img: product_img,
			id: 6,
			title: 'Vinyl Double Pane Fixed Window...',
			price: 1,
			description: {
				MOQ: '10 units',
				'Lead time (weeks)': '40-50 days',
				Warranty: '12 month',
				Certification: 'AAMA, NFRC...',
				Width: '36”',
				Height: '60”',
				Opening: 'Casement',
				'Frame material': 'Aluminum frame',
				'Glass type': 'Safety glass',
			},
		},
		{
			img: product_img,
			id: 7,
			title: 'Vinyl Double Pane Fixed Window...',
			price: 1,
			description: {
				MOQ: '10 units',
				'Lead time (weeks)': '40-50 days',
				Warranty: '12 month',
				Certification: 'AAMA, NFRC...',
				Width: '36”',
				Height: '60”',
				Opening: 'Casement',
				'Frame material': 'Aluminum frame',
				'Glass type': 'Safety glass',
			},
		},
		{
			img: product_img,
			id: 8,
			title: 'Vinyl Double Pane Fixed Window...',
			price: 1,
			description: {
				MOQ: '10 units',
				'Lead time (weeks)': '40-50 days',
				Warranty: '12 month',
				Certification: 'AAMA, NFRC...',
				Width: '36”',
				Height: '60”',
				Opening: 'Casement',
				'Frame material': 'Aluminum frame',
				'Glass type': 'Safety glass',
			},
		},
	],
	favorite: [],
};

const productSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		toggleFavorite(state, action: PayloadAction<number>) {
			const id = action.payload;
			const selected = state.favorite.includes(id);

			if (selected) {
				state.favorite = state.favorite.filter((el) => el !== id);
			} else {
				state.favorite.push(id);
			}
		},
	},
});

export const { toggleFavorite } = productSlice.actions;

export default productSlice.reducer;
