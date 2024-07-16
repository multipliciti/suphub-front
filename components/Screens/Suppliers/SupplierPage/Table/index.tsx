'use client';
import React from 'react';
import { ProductItem } from '@/components/Screens/Marketplace/Products/ProductItem';
import { ProductItemType } from '@/types/products/product';
import { classNames } from '@/utils/classNames';
import { useAppSelector } from '@/redux/hooks';
import s from './Table.module.scss';

interface TablePropType {
	products: ProductItemType[];
}

function Table({ products }: TablePropType) {
	const isSidebarActive = useAppSelector(
		(state: any) => state.suppliersSidebar.sidebar
	);

	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<span className={s.header_title}>Products ({products.length})</span>
			</div>
			{products.length > 0 ? (
				<div
					className={classNames(
						s.product_wrapper,
						isSidebarActive && s.product_wrapper_active
					)}
				>
					{products.map((product: object, index: number) => (
						<ProductItem key={index} product={product as ProductItemType} />
					))}
				</div>
			) : (
				<span className={s.emptyMessage}>No Products yet!</span>
			)}
		</div>
	);
}

export default Table;
