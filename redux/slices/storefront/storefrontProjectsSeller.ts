import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
	projects: any[];
}

const initialState: CounterState = {
	projects: [],
};

const storefrontProjectsSellerSlice = createSlice({
	name: 'storefrontProjectsSeller',
	initialState,
	reducers: {
		setProjects(state, action: PayloadAction<CounterState['projects']>) {
			state.projects = action.payload;
		},
	},
});

export const { setProjects } = storefrontProjectsSellerSlice.actions;

export default storefrontProjectsSellerSlice.reducer;
