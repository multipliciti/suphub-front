'use client';
import s from './Products.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { useAppDispatch } from '@/redux/hooks';
import { ProductItem } from './ProductItem';
import { ProductItemType } from '@/types/products/product';
import { NoResults } from '../NoResults';
import { useState } from 'react';
import { classNames } from '@/utils/classNames';
import Image from 'next/image';
import selected_img from '@/imgs/Marketplace/Filters/selected.svg';
import close_img from '@/imgs/Marketplace/ProductFilter/close.svg';
import { setSortDirection } from '@/redux/slices/favorites/productsFilter';

interface ProductsPropsType {
	products: ProductItemType[] | undefined;
	status: string;
	filtersEmpty: boolean;
}
export const Products = ({ products, status, filtersEmpty }: ProductsPropsType) => {
	const dispatch = useAppDispatch();
	const total = products?.length || 0;
	const activeTitle = useAppSelector(
		(state) => state.favoritesProductFilter.activeTitle
	);
	const [sctiveSort, setActiveSort] = useState<number>(-1);
	const [showSort, setShowSort] = useState<boolean>(false);

	const arrSort = [
		{
			id: 0,
			title: 'Lead time',
			subtitle: '(shortest first)',
			sortDirection: { leadTime: 'asc' },
		},
		{
			id: 1,
			title: 'Lead time',
			subtitle: '(longest first)',
			sortDirection: { leadTime: 'desc' },
		},
		{
			id: 2,
			title: 'Price',
			subtitle: '(highest first)',
			sortDirection: { leadTime: 'desc' },
		},
		{
			id: 3,
			title: 'Price',
			subtitle: '(lowest first)',
			sortDirection: { leadTime: 'asc' },
		},
		{
			id: 4,
			title: 'MOQ',
			subtitle: '(smallest first)',
			sortDirection: { leadTime: 'asc' },
		},
		{
			id: 5,
			title: 'MOQ',
			subtitle: '(largest first)',
			sortDirection: { leadTime: 'desc' },
		},
	];

	return (
		<div className={s.wrapper}>
			<div className={s.results_wrapper}>
				<div className={s.results}>
					Results: <span className={s.results_text}> {total} products </span>
				</div>
				<div onClick={() => setShowSort(!showSort)} className={s.sort}>
					<span className={s.sort_text}>Sort by: </span>
					<span className={s.sort_title}>{activeTitle}</span>
					<Image
						className={classNames(s.img, showSort && s.img_open)}
						src={close_img}
						alt="close_img"
						width={20}
						height={20}
					/>
					<div className={s.sort_wrapper}>
						{showSort &&
							arrSort.map((el, ind) => {
								return (
									<div
										onClick={(e) => {
											e.stopPropagation();
											setActiveSort(el.id);
											dispatch(
												setSortDirection({
													sortDirection: el.sortDirection,
													activeTitle: el.title,
												})
											);
										}}
										className={s.sort_list}
										key={ind}
									>
										<div className={s.sort_list_item}>
											<span className={s.title}>{el.title}</span>
											<span className={s.subtitle}>{el.subtitle}</span>
										</div>
										{el.id === sctiveSort && (
											<Image
												className={s.select_img}
												src={selected_img}
												alt="selected_img"
												width={20}
												height={20}
											/>
										)}
									</div>
								);
							})}
					</div>
				</div>
			</div>
			{status === 'pendung' && <div> Loading...</div>}
			{status === 'rejected' && <div> Error! </div>}
			{products && products.length < 1 && status === 'seccess' && (
				<NoResults filtersEmpty={filtersEmpty} />
			)}
			<div className={s.products}>
				{total > 0 &&
					products?.map((el, ind) => (
						<div key={ind} className={s.products_item}>
							<ProductItem {...el} />
						</div>
					))}
			</div>
		</div>
	);
};
