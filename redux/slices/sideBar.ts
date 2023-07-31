import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//types
import { Item } from '@/types/marketplace/sideBar';

interface CounterState {
	sideBar: boolean;
	items: Item[];
	activeId: number;
	parentActiveId: number;
	searchQuery: string;
}

const initialState: CounterState = {
	sideBar: false,
	items: [
		{
			id: 1,
			title: 'Windows',
			innerItems: [
				{ id: 11, title: 'Aluminum Windows' },
				{ id: 12, title: 'Wood Windows' },
				{ id: 13, title: 'Vinyl Windows' },
			],
		},
		{
			id: 2,
			title: 'Window Accessories',
			innerItems: [
				{ id: 21, title: 'inner 1' },
				{ id: 22, title: 'inner 2' },
			],
		},

		{
			id: 3,
			title: 'Doors',
		},
		{
			id: 4,
			title: 'Lighting',
		},
		{
			id: 5,
			title: 'Bathroom Hardware',
		},
		{
			id: 6,
			title: 'Bathroom Vanities',
		},
		{
			id: 7,
			title: 'HVAC Systems',
		},
		{
			id: 8,
			title: 'Structural Systems',
		},
		{
			id: 9,
			title: 'Kitchen Fixtures',
		},
	],
	activeId: 11,
	parentActiveId: 1,
	searchQuery: '',
};

const sideBarSlice = createSlice({
	name: 'sideBar',
	initialState,
	reducers: {
		setSideBar(state, action: PayloadAction<boolean>) {
			state.sideBar = action.payload;
		},
		setParentActiveId(state, action: PayloadAction<number>) {
			state.parentActiveId = action.payload;
		},
		setActiveId(state, action: PayloadAction<number>) {
			state.activeId = action.payload;
		},
		setSearchQuery(state, action: PayloadAction<string>) {
			state.searchQuery = action.payload;
		},
	},
});

export const { setSideBar, setParentActiveId, setActiveId, setSearchQuery } =
	sideBarSlice.actions;

export default sideBarSlice.reducer;
