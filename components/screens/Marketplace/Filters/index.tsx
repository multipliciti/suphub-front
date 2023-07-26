'use client';
import s from './Filters.module.scss';
import Image from 'next/image';
import { FilterWrapper } from './FilterWrapper';
import { ItemFilter } from '@/types/marketplace/filters';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { clearAll } from '@/redux/slices/filters';
//imgs
import close from '@/imgs/Marketplace/Filters/close.svg';
import open from '@/imgs/Marketplace/Filters/open.svg';
import test from '@/imgs/Marketplace/Filters/Sustainability/test.png';
import { classNames } from '@/utils/classNames';

export const Filters = () => {
	const dispatch = useAppDispatch();
	const items = useAppSelector((state) => state.filtersSlice.items);
	const countAllItems = useAppSelector(
		(state) => state.filtersSlice.selectedCount.length
	);

	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<Image
					className={s.header_img}
					src={close}
					alt="close"
					width={24}
					height={24}
				/>
				<span className={s.header_title}>Filters</span>

				<span
					className={classNames(
						s.header_count,
						countAllItems > 0 && s.header_count_active
					)}
				>
					({countAllItems} selected)
				</span>
				<button
					onClick={() => dispatch(clearAll())}
					className={classNames(s.clear, countAllItems > 0 && s.clear_active)}
				>
					Clear all
				</button>
			</div>

			<div className={s.content}>
				{items.map((el, ind) => {
					return <FilterWrapper key={ind} itemProps={el} />;
				})}
			</div>
		</div>
	);
};
