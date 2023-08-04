'use client';
import s from './Products.module.scss';
import { useAppSelector } from '@/redux/hooks';
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
}
export const Products = (props: ProductsPropsType) => {
	const { products, total } = props;

	return (
		<div className={s.wrapper}>
			<div className={s.results}>
				Results: <span className={s.results_text}> {total} products </span>
			</div>

			<div className={s.products}>
				{products && products.length < 1 && <NoResults />}

				{products &&
					products.length > 0 &&
					products.map((el, ind) => <ProductItem key={ind} {...el} />)}
			</div>
		</div>
	);
};
