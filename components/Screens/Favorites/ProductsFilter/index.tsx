'use client';
import s from './ProductsFilter.module.scss';
import search_img from '@/imgs/Marketplace/search.svg';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { FilterWrapper } from './FilterWrapper';
import debounce from 'lodash.debounce';
import { searchProducts } from '@/redux/slices/favorites/productsFilter';

export const ProductsFilter = () => {
	const dispatch = useAppDispatch();
	const productFilterItems = useAppSelector(
		(state) => state.favoritesProductFilter.storeProductsFilter
	);

	const debouncedSearch = debounce((value) => {
		dispatch(searchProducts(value));
	}, 300);

	return (
		<div className={s.wrapper}>
			<label className={s.search_label} htmlFor="search">
				<Image src={search_img} alt="search_img" width={20} height={20} />
				<input
					className={s.search_input}
					placeholder="Search product by name"
					id="search"
					type="text"
					onChange={(e) => debouncedSearch(e.target.value)}
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
