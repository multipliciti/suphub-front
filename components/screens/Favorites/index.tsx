'use client';
import s from './Favorites.module.scss';
import { ProductsFilter } from './ProductsFilter';
import { Products } from './Products';

export const FavoritesComponents = () => {
	return (
		<div className={s.wrapper}>
			<h3 className={s.title}>My favorites</h3>
			<ProductsFilter />
			<Products />
		</div>
	);
};
