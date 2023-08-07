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
	const dispatch = useAppDispatch();
	const api = Api();
	const productFilterItems = useAppSelector((state) => state.productsFilter.store);
	console.log('productFilterItems', productFilterItems);
	const activePage = useAppSelector((state) => state.productSlice.activePage);
	const total = useAppSelector((state) => state.productSlice.total);

	const fetchProduct = async (value: string) => {
		try {
			const response = await api.product.getProduct({
				page: activePage,
				limit: 10,
				sortParams: {
					id: 'desc',
				},
				searchText: value,
			});
			dispatch(setProducts(response.result));
			dispatch(setTotal(response.total));
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const debouncedFetchProduct = debounce((value: string) => {
		fetchProduct(value);
	}, 250);

	return (
		<div className={s.wrapper}>
			<label className={s.search_label} htmlFor="search">
				<Image src={search_img} alt="search_img" width={20} height={20} />
				<input
					className={s.search_input}
					placeholder="Search product by name"
					id="search"
					type="text"
					onChange={(e) => debouncedFetchProduct(e.target.value)}
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
