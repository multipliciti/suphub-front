import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
	sideBar: boolean;
	activeId: number;
	projectList: {
		id: number;
		title: string;
	}[];
}

const initialState: CounterState = {
	sideBar: true,
	activeId: 1,
	projectList: [
		{
			id: 1,
			title: 'Project test',
		},
		{
			id: 2,
			title: 'Project test',
		},
		{
			id: 3,
			title: 'Project test',
		},
	],
};

const buyerSidebarSlice = createSlice({
	name: 'buyerSidebar',
	initialState,
	reducers: {
		setBuyerSideBar(state, action: PayloadAction<boolean>) {
			state.sideBar = action.payload;
		},
		setActiveId(state, action: PayloadAction<number>) {
			state.activeId = action.payload;
		},
	},
});

export const { setBuyerSideBar, setActiveId } = buyerSidebarSlice.actions;

export default buyerSidebarSlice.reducer;
