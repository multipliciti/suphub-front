import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoreItem } from '@/types/marketplace/filters';
import { ItemFilter } from '@/types/marketplace/filters';
import test from '@/imgs/Marketplace/Filters/Sustainability/test.png';

interface CounterState {
	store: StoreItem;
	selectedCount: number[];
	items: ItemFilter[];
}

const initialState: CounterState = {
	store: {
		Manufacture: [1, 2],
		Sustainability: [11, 12],
		Certification: [],
		Size: [],
	},
	selectedCount: [],
	items: [
		{
			title: 'Manufacture',
			items: [
				{ text: 'Manufacture 1', id: 1 },
				{ text: 'Manufacture 2', id: 2 },
				{ text: 'Manufacture 3', id: 3 },
				{ text: 'Manufacture 4', id: 4 },
				{ text: 'Manufacture 5', id: 5 },
				{ text: 'Manufacture 6', id: 6 },
				{ text: 'Manufacture 7', id: 7 },
				{ text: 'Manufacture 8', id: 8 },
				{ text: 'Manufacture 9', id: 9 },
			],
			id: 1,
		},
		{
			title: 'Sustainability',
			items: [
				{
					text: 'Energy Star',
					id: 10,
					img: test,
				},
				{
					text: 'PHI',
					id: 11,
					img: test,
				},
				{
					text: 'LEED',
					id: 12,
					img: test,
				},
				{ text: 'FSC', id: 13, img: test },
				{ text: 'NGBS', id: 14, img: test },
				{ text: 'PHI', id: 15, img: test },
				{ text: 'LEED', id: 16, img: test },
				{ text: 'FSC', id: 17, img: test },
				{ text: 'NGBS', id: 18, img: test },
			],
			id: 2,
		},

		{
			title: 'Certification',
			items: [
				{ text: 'AAMA', id: 19, img: test },
				{ text: 'ASTM', id: 20, img: test },
				{ text: 'CSA', id: 21, img: test },
				{ text: 'WDMA', id: 22, img: test },
				{ text: 'NGBS', id: 23, img: test },
				{ text: 'NFRC', id: 24, img: test },
				{ text: 'AAMA', id: 25, img: test },
				{ text: 'ASTM', id: 26, img: test },
				{ text: 'CSA', id: 27, img: test },
				{ text: 'WDMA', id: 28, img: test },
				{ text: 'NGBS', id: 29, img: test },
				{ text: 'NFRC', id: 30, img: test },
			],
			id: 3,
		},
		{
			title: 'Size',
			items: [
				{ text: '20”x20”', id: 31 },
				{ text: '20”x40”', id: 32 },
				{ text: '20”x60”', id: 33 },
				{ text: '40”x40”', id: 34 },
				{ text: '40”x80”', id: 35 },
				{ text: '230”x240”', id: 36 },
				{ text: '205”x450”', id: 37 },
				{ text: '260”x603”', id: 38 },
				{ text: '420”x401”', id: 39 },
				{ text: '400”x820”', id: 40 },
			],
			id: 4,
		},
	],
};

initialState.selectedCount = Object.values(initialState.store).flat();
const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		toggleFilter(state, action: PayloadAction<{ title: string; id: number }>) {
			const { title, id } = action.payload;
			const isSelected = state.selectedCount.includes(id);

			if (isSelected) {
				state.store[title] = state.store[title].filter((itemId) => itemId !== id);
				state.selectedCount = state.selectedCount.filter((itemId) => itemId !== id);
			} else {
				state.store[title].push(id);
				state.selectedCount.push(id);
			}

			//all selectedCount
			state.selectedCount = Object.values(state.store).flat();
		},
		clearBranch(state, action: PayloadAction<string>) {
			state.store[action.payload] = [];

			//all selectedCount
			state.selectedCount = Object.values(state.store).flat();
		},
		selectAll(state, action: PayloadAction<string>) {
			const selectedTitle = state.items.find(
				(item) => item.title === action.payload
			);

			if (selectedTitle) {
				state.store[action.payload] = selectedTitle.items.map((item) => item.id);
			}

			//all selectedCount
			state.selectedCount = Object.values(state.store).flat();
		},
		clearAll(state) {
			for (const key in state.store) {
				state.store[key] = [];
			}

			state.selectedCount = [];
		},
	},
});

export const { toggleFilter, clearBranch, selectAll, clearAll } =
	filtersSlice.actions;

export default filtersSlice.reducer;
