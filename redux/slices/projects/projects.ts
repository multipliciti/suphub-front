import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Project } from '@/types/products/project';

interface CounterState {
	params: {
		find: {
			name: {
				contains: string;
			};
		};
		page: number;
		limit: number;
	};
	status:
		| 'idle'
		| 'loading'
		| 'success'
		| 'rejected'
		| 'refetch'
		| 'refetchByCreating';
	result: Project[];
}

const initialState: CounterState = {
	params: {
		find: {
			name: {
				contains: '',
			},
		},
		page: 1,
		limit: 100,
	},
	status: 'idle',
	result: [],
};

const projectsSlice = createSlice({
	name: 'projectsSlice',
	initialState,
	reducers: {
		setStatus(state, action: PayloadAction<CounterState['status']>) {
			state.status = action.payload;
		},
		setSearchFilter(state, action: PayloadAction<string>) {
			state.params.find.name.contains = action.payload;
		},
		setResult(state, action: PayloadAction<Project[]>) {
			state.result = action.payload;
		},
		updateProjectName(state, action: PayloadAction<{ id: number; name: string }>) {
			const { id, name } = action.payload;
			const projectToUpdate = state.result.find((item) => item.id === id);
			if (projectToUpdate) {
				projectToUpdate['name'] = name;
			}
		},
	},
});

export const { setStatus, setSearchFilter, setResult, updateProjectName } =
	projectsSlice.actions;

export default projectsSlice.reducer;
