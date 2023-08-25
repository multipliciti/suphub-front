'use client';
import s from './Search.module.scss';
import Image from 'next/image';
import search from '@/imgs/SideBar/search.svg';
import { useAppDispatch } from '@/redux/hooks';
import { clearParentActiveId, setSearchQuery } from '@/redux/slices/sideBar';
import { ChangeEvent } from 'react';

export const Search = () => {
	const dispatch = useAppDispatch();
	
	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearchQuery(event.target.value));
		if(event.target.value === ''){
			dispatch(clearParentActiveId())
		}
		
	};

	return (
		<div className={s.wrapper}>
			<label className={s.label_search} htmlFor="search">
				<Image src={search} alt="search" width={16} height={16} />
				<input
					placeholder="Search"
					className={s.label_input}
					id="search"
					type="text"
					onChange={handleSearchChange}
				/>
			</label>
		</div>
	);
};
