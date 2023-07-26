import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { ThunkAction, Action } from '@reduxjs/toolkit';
import modalSlice from './slices/modal';
import sideBarSlice from './slices/sideBar';
import filtersSlice from './slices/filters';

export function makeStore() {
	return configureStore({
		reducer: {
			modalSlice,
			sideBarSlice,
			filtersSlice,
		},
	});
}

export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

export const wrapper = createWrapper<RootStore>(makeStore, { debug: false });
