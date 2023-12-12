import { combineReducers, Reducer } from 'redux';
import { createAction } from '@reduxjs/toolkit';

import modalSlice from './slices/modal';
import sideBarSlice from './slices/sideBars/sideBar';
import filtersSlice from './slices/marketplace/filters';
import marketplaceProductFilter from './slices/marketplace/productsFilter';
import marketplaceProduct from './slices/marketplace/products';
import favoritesProduct from './slices/favorites/products';
import favoritesProductFilter from './slices/favorites/productsFilter';
import authSlice from './slices/auth';
import productSlice from './slices/marketplace/product';
import orderSlice from './slices/Order/order';
import storefrontSlice from './slices/storefront/storefront';
import storefrontProductsSlice from './slices/storefront/storefrontProducts';
import storefrontProjectsSellerSlice from './slices/storefront/storefrontProjectsSeller';
import projectsSlice from './slices/projects/projects';
import projectsSidebar from './slices/projects/projectsSidebar';
import projectItemSlice from './slices/projects/projectItem';
import projectCartSlice from './slices/projects/projectsCart';
import sideBarRequestDetailSlice from './slices/sideBars/sideBarRequestDetail';

const combinedReducer = combineReducers({
	authSlice,
	modalSlice,
	sideBarSlice,
	filtersSlice,
	marketplaceProductFilter,
	marketplaceProduct,
	favoritesProduct,
	favoritesProductFilter,
	productSlice,
	orderSlice,
	storefrontSlice,
	storefrontProductsSlice,
	storefrontProjectsSellerSlice,
	projectsSlice,
	projectsSidebar,
	projectItemSlice,
	projectCartSlice,
	sideBarRequestDetailSlice,
});

export const resetState = createAction('state/reset');

export const rootReducer: Reducer<ReturnType<typeof combinedReducer>> = (
	state,
	action
) => {
	if (action.type === 'state/reset') {
		state = undefined;
	}
	return combinedReducer(state, action);
};
