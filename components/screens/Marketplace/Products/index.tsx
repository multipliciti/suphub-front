'use client';
import s from './Products.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';
import { useState } from 'react';
import { ProductItem } from './ProductItem';
import { Api } from '@/services';
import { ProductItemType } from '@/types/marketplace/product';
//imgs
import product_img from '@/imgs/Marketplace/Products/product_test2.jpeg';
import { NoResults } from '../NoResults';

interface ProductsPropsType {
	products: ProductItemType[] | undefined;
	total: number;
	status: string;
}

export const Products = (props: ProductsPropsType) => {
	const { products, total, status } = props;
	const isSideBar = useAppSelector((state)=> state.sideBarSlice.sideBar)
	return (
		<div className={s.wrapper}>
			<div className={s.results}>
				Results: <span className={s.results_text}> {total} products </span>
			</div>

			{status === 'pendung' && <div> Loading...</div>}
			{status === 'rejected' && <div> Error! </div>}
			{products && products.length < 1 && status === 'seccess' && <NoResults />}
			{products && status === 'seccess' && (
				<div className={classNames(s.products, isSideBar && s.products_sidebar  )}>
					{products.map((el, ind) => (
						<div key={ind} className={s.products_item}>
							<ProductItem {...el} />
						</div>
					))}
				</div>
			)}
		</div>
	);
};
