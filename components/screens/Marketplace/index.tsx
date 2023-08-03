'use client';
import s from './Marketplace.module.scss';
import { Header } from './Header';
import { Filters } from './Filters';
import { ProductsFilter } from './ProductsFilter';
import { Products } from './Products';
import { Pagination } from '@/components/Features/Pagination';
import { classNames } from '@/utils/classNames';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setProducts, setTotal } from '@/redux/slices/marketplace/products';
import { setActivePage } from '@/redux/slices/marketplace/products';
import { useEffect, useState } from 'react';
import { ProductItemType } from '@/types/marketplace/product';
import { Api } from '@/services';

export const Marketplace = () => {
	const dispatch = useAppDispatch();
	const api = Api();
	const [totalPages, setTotalPages] = useState<number>(2);

	const products = useAppSelector((state) => state.productSlice.products);
	const isSideBar = useAppSelector((state) => state.sideBarSlice.sideBar);
	const activePage = useAppSelector((state) => state.productSlice.activePage);
	const total = useAppSelector((state) => state.productSlice.total);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.product.getProduct({
					page: activePage,
					limit: 10,
					sortParams: {
						id: 'desc',
					},
				});
				dispatch(setProducts(response.result));
				dispatch(setTotal(response.total));
				// setTotalPages(response.totalPages);
				console.log('response.totalPage', response);
			} catch (error) {
				console.error('Error:', error);
			}
		};

		fetchData();
	}, [activePage]);
	// console.log('totalPage', totalPage);
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
					<Products total={total} products={products} />
				</div>
				<Pagination
					buttons={true}
					totalPages={totalPages}
					currentPage={activePage}
				/>
			</div>
		</div>
	);
};
