import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
	sidebar: boolean;
	projectIdForDelete: number | null;
}

const initialState: CounterState = {
	sidebar: true,
	projectIdForDelete: null,
};

const projectsSidebarSlice = createSlice({
	name: 'projectsSidebarSlice',
	initialState,
	reducers: {
		setSidebar(state, action: PayloadAction<boolean>) {
			state.sidebar = action.payload;
		},
		setProjectIdForDelete(
			state,
			action: PayloadAction<CounterState['projectIdForDelete']>
		) {
			state.projectIdForDelete = action.payload;
		},
	},
});

export const { setSidebar, setProjectIdForDelete } = projectsSidebarSlice.actions;

export default projectsSidebarSlice.reducer;
