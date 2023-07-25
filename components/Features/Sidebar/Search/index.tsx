'use client';
import s from './Search.module.scss';
import Image from 'next/image';
import search from '@/imgs/SideBar/search.svg';
export const Search = () => {
	return (
		<div className={s.wrapper}>
			<label className={s.label_search} htmlFor="search">
				<Image src={search} alt="search" width={16} height={16} />
				<input
					placeholder="Search"
					className={s.label_input}
					id="search"
					type="text"
				/>
			</label>
		</div>
	);
};
