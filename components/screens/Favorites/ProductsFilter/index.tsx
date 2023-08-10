'use client';
import s from './ProductsFilter.module.scss';
import search_img from '@/imgs/Marketplace/search.svg';
import Image from 'next/image';
import { Api } from '@/services';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { FilterWrapper } from './FilterWrapper';
import { setProducts, setTotal } from '@/redux/slices/marketplace/products';
import debounce from 'lodash.debounce';

export const ProductsFilter = () => {
	const productFilterItems = useAppSelector(
		(state) => state.productsFilter.storeFavoriteFilter
	);

	return (
		<div className={s.wrapper}>
			<label className={s.search_label} htmlFor="search">
				<Image src={search_img} alt="search_img" width={20} height={20} />
				<input
					className={s.search_input}
					placeholder="Search product by name"
					id="search"
					type="text"
				/>
			</label>
			<div className={s.products_filter}>
				{productFilterItems.map((el, ind) => {
					return <FilterWrapper key={ind} item={el} />;
				})}
			</div>
		</div>
	);
};
