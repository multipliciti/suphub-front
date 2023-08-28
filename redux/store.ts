import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { ThunkAction, Action } from '@reduxjs/toolkit';
import modalSlice from './slices/modal';
import sideBarSlice from './slices/sideBar';
import filtersSlice from './slices/marketplace/filters';
import marketplaceProductFilter from './slices/marketplace/productsFilter';
import marketplaceProduct from './slices/marketplace/products';
import favoritesProduct from './slices/favorites/products';
import favoritesProductFilter from './slices/favorites/productsFilter'
import authSlice from './slices/auth';

export function makeStore() {
	return configureStore({
		reducer: {
			authSlice,
			modalSlice,
			sideBarSlice,
			filtersSlice,
			marketplaceProductFilter,
			marketplaceProduct,
			favoritesProduct,
			favoritesProductFilter
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
