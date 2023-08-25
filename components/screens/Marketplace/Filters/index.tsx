'use client';
import s from './Filters.module.scss';
import Image from 'next/image';
import { FilterWrapper } from './FilterWrapper';
import { ItemFilter } from '@/types/marketplace/filters';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';

//imgs
import close_img from '@/imgs/Marketplace/Filters/close.svg';
import open_img from '@/imgs/Marketplace/Filters/open.svg';
import test from '@/imgs/Marketplace/Filters/Sustainability/test.png';
import { classNames } from '@/utils/classNames';
import { useState } from 'react';
import { clearAll } from '@/redux/slices/marketplace/filters';

export const Filters = () => {
	const dispatch = useAppDispatch();
	const [open, setOpen] = useState(false);
	const charData = useAppSelector((state) => state.filtersSlice.char);
	const filterItems = useAppSelector((state) => state.filtersSlice.itemsFilter);
	const totalAttributeValuesCount = charData.reduce((total, charItem) => {
		return total + charItem.attrValueIds.length;
	}, 0);

	return (
		<div className={classNames(s.wrapper)}>
			<div className={s.header}>
				<Image
					onClick={() => setOpen(!open)}
					className={s.header_img}
					src={open ? close_img : open_img}
					alt="close"
					width={24}
					height={24}
				/>
				<span className={s.header_title}>Filters</span>

				<span
					className={classNames(
						s.header_count,
						open && totalAttributeValuesCount > 0 && s.header_count_active
					)}
				>
					({totalAttributeValuesCount} selected)
				</span>
				<button
					onClick={() => dispatch(clearAll())}
					className={classNames(
						s.clear,
						open && totalAttributeValuesCount > 0 && s.clear_active
					)}
				>
					Clear all
				</button>
			</div>

			<div className={classNames(s.content, open && s.content_active)}>
				{filterItems.map((el, ind) => {
					return <FilterWrapper key={ind} itemProps={el} />;
				})}
			</div>
		</div>
	);
};
