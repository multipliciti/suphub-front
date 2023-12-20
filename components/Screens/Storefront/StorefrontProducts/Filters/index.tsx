'use client';
import { useEffect, useState } from 'react';

import {
	setResult,
	setStatus,
	setSubcategoryFilter,
	setStatusFilter,
} from '@/redux/slices/storefront/storefrontProducts';
import {
	ProductItemStatus,
	productLabelStatuses,
} from '@/types/products/productStatus';
import { StorefrontProductAddProductButton } from './AddProductButton';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { StorefrontProductSearchInput } from './SearchInput';
import { entriesFromObject } from '@/utils/object';
import { categoryService } from '@/services/categoryApi';
import { setCategories } from '@/redux/slices/storefront/storefront';
import { Select } from '@/components/UI/Select';
import { Api } from '@/services';

import s from './StorefrontProductsFilters.module.scss';

export const StorefrontProductsFilters = () => {
	const api = Api();
	const dispatch = useAppDispatch();

	const categories = useAppSelector((state) => state.storefrontSlice.categories);

	const status = useAppSelector((state) => state.storefrontProductsSlice.status);

	const params = useAppSelector((state) => state.storefrontProductsSlice.params);
	const sort = useAppSelector((state) => state.storefrontProductsSlice.sort);

	const [subcategory, setSubcategory] = useState<string[]>([]);
	const [productStatus, setProductStatus] = useState<string[]>([]);

	useEffect(() => {
		if (categories) {
			return;
		}
		fetchCategories();
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

	useEffect(() => {
		changeStatusFilter();
	}, [productStatus]);

	const fetchCategories = async () => {
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

	const changeStatusFilter = () => {
		if (!productStatus.length) {
			return;
		}

		const selectedProductStatues: ProductItemStatus[] = [];

		productStatus.forEach((item) => {
			const statusKey = entriesFromObject(productLabelStatuses).find(
				([_, value]) => value === item
			);

			if (statusKey) {
				selectedProductStatues.push(statusKey[0]);
			}
		});

		dispatch(setStatusFilter(selectedProductStatues));
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
					options={Object.values(productLabelStatuses)}
					isMulti={true}
					value={productStatus}
					setValue={setProductStatus}
				/>
			</div>
		</div>
	);
};
