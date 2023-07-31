'use client';
import s from './Products.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { useState } from 'react';
import { ProductItem } from './ProductItem';
//imgs
import product_img from '@/imgs/Marketplace/Products/product_test2.jpeg';
export const Products = () => {
	const products = useAppSelector((state) => state.productSlice.products);

	return (
		<div className={s.wrapper}>
			<div className={s.results}>
				Results: <span className={s.results_text}> 9,158 products </span>
			</div>

			<div className={s.products}>
				{products.map((el, ind) => {
					return <ProductItem key={ind} item={el} />;
				})}
			</div>
		</div>
	);
};
