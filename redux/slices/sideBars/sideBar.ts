import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//types
import { CategoryItem } from '@/types/sideBar';

interface CounterState {
	sideBar: boolean;
	activeId: number;
	parentActiveIds: number[];
	searchQuery: string;
	categories: CategoryItem[];
}

const initialState: CounterState = {
	sideBar: true,
	activeId: 1,
	parentActiveIds: [],
	searchQuery: '',
	categories: [],
};

const sideBarSlice = createSlice({
	name: 'sideBar',
	initialState,
	reducers: {
		setSideBar(state, action: PayloadAction<boolean>) {
			state.sideBar = action.payload;
		},
		setParentActiveId(state, action: PayloadAction<number>) {
			const indexToRemove = state.parentActiveIds.indexOf(action.payload);
			indexToRemove !== -1
				? state.parentActiveIds.splice(indexToRemove, 1)
				: state.parentActiveIds.push(action.payload);
		},
		setActiveId(state, action: PayloadAction<number>) {
			state.activeId = action.payload;
		},
		clearParentActiveId(state) {
			state.parentActiveIds = [];
		},
		setSearchQuery(state, action: PayloadAction<string>) {
			state.searchQuery = action.payload;
		},
		setCategories(state, action: PayloadAction<CategoryItem[]>) {
			state.categories = action.payload;
		},
	},
});

export const {
	setSideBar,
	setParentActiveId,
	setActiveId,
	setSearchQuery,
	setCategories,
	clearParentActiveId,
} = sideBarSlice.actions;

export default sideBarSlice.reducer;
