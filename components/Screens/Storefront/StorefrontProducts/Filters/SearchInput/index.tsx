import { useEffect, useState } from 'react';
import Image from 'next/image';
import debounce from 'lodash.debounce';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setSearchFilter } from '@/redux/slices/storefront/storefrontProducts';

import s from './SearchInput.module.scss';

import search_img from '@/imgs/Marketplace/search.svg';

export const StorefrontProductSearchInput = () => {
	const dispatch = useAppDispatch();

	const initSearchValue = useAppSelector(
		(state) => state.storefrontProductsSlice.params.find.name.contains
	);

	const [searchValue, setSearchValue] = useState(initSearchValue);

	const debouncedSearch = debounce((value) => {
		dispatch(setSearchFilter(value));
	}, 300);

	useEffect(() => {
		debouncedSearch(searchValue);
	}, [searchValue]);

	useEffect(() => {
		return () => {
			debouncedSearch.cancel();
		};
	}, [debouncedSearch]);

	return (
		<label className={s.search_label}>
			<Image src={search_img} alt="search_img" width={20} height={20} />
			<input
				className={s.search_input}
				placeholder="Search product by name"
				type="text"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			/>
		</label>
	);
};
