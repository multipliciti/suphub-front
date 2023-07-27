'use client';
import s from './ProductsFilter.module.scss';
import search_img from '@/imgs/Marketplace/search.svg';
import Image from 'next/image';
import { useAppSelector } from '@/redux/hooks';
import { FilterWrapper } from './FilterWrapper';

export const ProductsFilter = () => {
	const productFilterItems = useAppSelector((state) => state.productsFilter.store);
	console.log('productFilterItems', productFilterItems);

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

			{productFilterItems.map((el, ind) => {
				return (
					<div className={s.item} key={ind}>
						<FilterWrapper item={el} />
					</div>
				);
			})}
		</div>
	);
};
