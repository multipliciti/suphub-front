import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Supplier } from '@/services/suppliers';

interface CounterState {
	sidebar: boolean;
	selectedSupplier: Supplier | null;
}

const initialState: CounterState = {
	sidebar: false,
	selectedSupplier: null,
};

const suppliersSidebarSlice = createSlice({
	name: 'suppliersSidebarSlice',
	initialState,
	reducers: {
		setSidebar(state, action: PayloadAction<boolean>) {
			state.sidebar = action.payload;
		},
		setSelectedSupplier(state, action: PayloadAction<Supplier | null>) {
			state.selectedSupplier = action.payload;
		},
	},
});

export const { setSidebar, setSelectedSupplier } = suppliersSidebarSlice.actions;

export default suppliersSidebarSlice.reducer;
