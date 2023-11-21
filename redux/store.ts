import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { ThunkAction, Action } from '@reduxjs/toolkit';
import modalSlice from './slices/modal';
import sideBarSlice from './slices/sideBars/sideBar';
import filtersSlice from './slices/marketplace/filters';
import marketplaceProductFilter from './slices/marketplace/productsFilter';
import marketplaceProduct from './slices/marketplace/products';
import favoritesProduct from './slices/favorites/products';
import favoritesProductFilter from './slices/favorites/productsFilter';
import authSlice from './slices/auth';
import buyerSidebarSlice from './slices/sideBars/buyerSidebar';
import sellerSidebarSlice from './slices/sideBars/sellerSidebar';
import productSlice from './slices/marketplace/product';
import orderSlice from './slices/Order/order';
import storefrontSlice from './slices/storefront/storefront';
import storefrontProductsSlice from './slices/storefront/storefrontProducts';
import projectsSlice from './slices/projects/projects';
import projectsSidebar from './slices/projects/projectsSidebar';
import projectItemSlice from './slices/projects/projectItem';

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
			favoritesProductFilter,
			buyerSidebarSlice,
			sellerSidebarSlice,
			productSlice,
			orderSlice,
			storefrontSlice,
			storefrontProductsSlice,
			projectsSlice,
			projectsSidebar,
			projectItemSlice,
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
