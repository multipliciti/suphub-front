import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Project } from '@/types/products/project';

interface CounterState {
	status: 'idle' | 'loading' | 'success' | 'rejected';
	project: Project | null;
}

const initialState: CounterState = {
	status: 'idle',
	project: null,
};

const projectItemSlice = createSlice({
	name: 'projectItemSlice',
	initialState,
	reducers: {
		setStatus(state, action: PayloadAction<CounterState['status']>) {
			state.status = action.payload;
		},
		setProject(state, action: PayloadAction<CounterState['project']>) {
			state.project = action.payload;
		},
	},
});

export const { setStatus, setProject } = projectItemSlice.actions;

export default projectItemSlice.reducer;
