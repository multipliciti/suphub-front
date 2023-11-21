import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import debounce from 'lodash.debounce';

import { useAppDispatch } from '@/redux/hooks';
import { setSearchFilter } from '@/redux/slices/projects/projects';

import s from './ProjectsSearchInput.module.scss';

import search_img from '@/imgs/Marketplace/search.svg';

export const ProjectsSearchInput: FC = () => {
	const dispatch = useAppDispatch();

	const [searchValue, setSearchValue] = useState('');

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
				placeholder="Search"
				type="text"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			/>
		</label>
	);
};
