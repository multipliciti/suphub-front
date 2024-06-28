'use client';
import React from 'react';
import { ProductItem } from '@/components/Screens/Marketplace/Products/ProductItem';
import { ProductItemType, dummyProductItems } from '@/types/products/product';
import { classNames } from '@/utils/classNames';
import { useAppSelector } from '@/redux/hooks';
import s from './Table.module.scss';

function Table() {
	const isSidebarActive = useAppSelector(
		(state: any) => state.suppliersSidebar.sidebar
	);
	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<span className={s.header_title}>Products (7)</span>
			</div>
			<div
				className={classNames(
					s.product_wrapper,
					isSidebarActive && s.product_wrapper_active
				)}
			>
				{dummyProductItems.map((product: object, index: number) => (
					<ProductItem key={index} product={product as ProductItemType} />
				))}
			</div>
		</div>
	);
}

export default Table;
