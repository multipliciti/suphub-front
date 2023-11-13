'use client';
import { useEffect, useState } from 'react';

import {
	setResult,
	setStatus,
	setSubcategoryFilter,
} from '@/redux/slices/storefront/storefrontProducts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { categoryService } from '@/services/categoryApi';
import { setCategories } from '@/redux/slices/storefront/storefront';
import { Select } from '@/components/UI/Select';
import { Api } from '@/services';

import { StorefrontProductAddProductButton } from './AddProductButton';
import { StorefrontProductSearchInput } from './SearchInput';

import s from './StorefrontProductsFilters.module.scss';

export const StorefrontProductsFilters = () => {
	const api = Api();
	const dispatch = useAppDispatch();

	const categories = useAppSelector((state) => state.storefrontSlice.categories);

	const status = useAppSelector((state) => state.storefrontProductsSlice.status);

	const params = useAppSelector((state) => state.storefrontProductsSlice.params);
	const sort = useAppSelector((state) => state.storefrontProductsSlice.sort);

	const [subcategory, setSubcategory] = useState<string[]>([]);
	const [statusFilter, setStatusFilter] = useState<string[]>([]);

	useEffect(() => {
		if (categories) {
			return;
		}
		fetchSubcategories();
	}, []);

	useEffect(() => {
		fetchSellerProducts();
	}, [params, sort]);

	useEffect(() => {
		if (status === 'refetch') {
			fetchSellerProducts();
		}
	}, [status]);

	useEffect(() => {
		changeSubcategoryFilter();
	}, [subcategory]);

	const fetchSubcategories = async () => {
		try {
			const response = await api.category.getCategories();
			dispatch(setCategories(response));
		} catch (e) {
			dispatch(setCategories([]));
		}
	};

	const fetchSellerProducts = async () => {
		dispatch(setStatus('loading'));
		try {
			const response = await api.productSeller.getSellerProducts(params);

			dispatch(setResult(response));
			dispatch(setStatus('success'));
		} catch (e) {
			dispatch(setStatus('rejected'));
		}
	};

	const changeSubcategoryFilter = () => {
		if (!categories?.length) {
			return;
		}

		let subcategoryIds: number[] = [];

		subcategory.forEach((item) => {
			const subcategoryId = categoryService.findSubcategoryIdByName(
				categories,
				item
			);

			if (!subcategoryIds.includes(subcategoryId)) {
				subcategoryIds.push(subcategoryId);
			}
		});

		dispatch(setSubcategoryFilter(subcategoryIds));
	};

	return (
		<div className={s.wrapper}>
			<StorefrontProductAddProductButton />

			<StorefrontProductSearchInput />

			<div className={s.filters}>
				<Select
					title="Subcategories"
					options={categories ? categoryService.getSubcategories(categories) : []}
					isMulti={true}
					value={subcategory}
					setValue={setSubcategory}
				/>

				<Select
					title="Status"
					options={[]}
					isMulti={true}
					value={statusFilter}
					setValue={setStatusFilter}
				/>
			</div>
		</div>
	);
};
