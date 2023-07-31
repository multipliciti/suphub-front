'use client';
import s from './Marketplace.module.scss';
import { Header } from './Header';
import { Filters } from './Filters';
import { ProductsFilter } from './ProductsFilter';
import { Products } from './Products';
import { Pagination } from '@/components/Features/Pagination';
import { classNames } from '@/utils/classNames';
import { useAppSelector } from '@/redux/hooks';
import { useState } from 'react';

export const Marketplace = () => {
	const [activePage, setActivePage] = useState<number>(3);
	const isSideBar = useAppSelector((state) => state.sideBarSlice.sideBar);

	return (
		<div className={s.wrapper}>
			<div
				className={classNames(
					'content_container',
					isSideBar && 'content_container_sidebar'
				)}
			>
				<div className={s.header}>
					<Header />
					<Filters />
					<ProductsFilter />
					<Products />
				</div>
				<Pagination
					buttons={true}
					totalPages={10}
					onPageChange={setActivePage}
					currentPage={activePage}
				/>
			</div>
		</div>
	);
};
