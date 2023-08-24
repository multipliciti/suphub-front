import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoreItem } from '@/types/marketplace/filters';
import { Char } from '@/types/marketplace/filters';
import { ItemFilter } from '@/types/marketplace/filters';
import test from '@/imgs/Marketplace/Filters/Sustainability/test.png';

interface CounterState {
	selectedCount: number[];
	itemsFilter: any[];
	char: Char[];
}
//test
const initialState: CounterState = {
	char: [],
	selectedCount: [],
	itemsFilter: [],
};

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setChar: (state, action) => {
			const { attributeId, attrValueId } = action.payload;
			const charState = state.char;
			const existingChar = charState.find(
				(char) => char.attributeId === attributeId
			);

			if (existingChar) {
				const updatedAttributeValues = existingChar.attributeValues.includes(
					attrValueId
				)
					? existingChar.attributeValues.filter((id) => id !== attrValueId)
					: [...existingChar.attributeValues, attrValueId];

				if (updatedAttributeValues.length > 0) {
					existingChar.attributeValues = updatedAttributeValues;
				} else {
					state.char = charState.filter((char) => char.attributeId !== attributeId);
				}
			} else {
				charState.push({ attributeId, attributeValues: [attrValueId] });
			}
		},

		removeChar: (state, action) => {
			const charState = state.char;
			const attributeIdToRemove = action.payload;
			state.char = charState.filter(
				(char) => char.attributeId !== attributeIdToRemove
			);
		},
		selectAll(state, action) {
			const { attributeId, attrValueIdAll } = action.payload;
			const charState = state.char;
			const existingChar = charState.find(
				(char) => char.attributeId === attributeId
			);
			if (existingChar) {
				existingChar.attributeValues = attrValueIdAll;
			} else {
				charState.push({ attributeId, attributeValues: attrValueIdAll });
			}
		},
		setItemsFilter(state, action) {
			console.log('action.payload', action.payload);
			state.itemsFilter = action.payload;
		},
		clearAll(state) {
			state.char = [];
		},
	},
});

export const { removeChar, setChar, setItemsFilter, selectAll, clearAll } =
	filtersSlice.actions;

export default filtersSlice.reducer;
