'use client';
import s from './MapList.module.scss';
import { useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import { useAppDispatch } from '@/redux/hooks';
import { setParentActiveId, setActiveId } from '@/redux/slices/sideBar';
import { classNames } from '@/utils/classNames';
//imgs
import itemActive from '@/imgs/SideBar/itemActive.svg';
import itemInactive from '@/imgs/SideBar/itemInactive.svg';
import { CategoryItem } from '@/types/sideBar';
import { useEffect, useState } from 'react';

export const MapList = () => {
	const dispatch = useAppDispatch();
	const activeId = useAppSelector((state) => state.sideBarSlice.activeId);
	const parentActiveIds = useAppSelector(
		(state) => state.sideBarSlice.parentActiveIds
	);
	const searchQuery = useAppSelector((state)=> state.sideBarSlice.searchQuery)
	const categories = useAppSelector((state)=> state.sideBarSlice.categories)
	const [categoriesFilter, setCategoriesFilter] = useState<CategoryItem[]>()

	useEffect(() => {
		const categoriesFilterInner = categories.filter(category => {
			const searchLower = searchQuery.toLowerCase();
			const categoryNameLower = category.name.toLowerCase();

			const categoryMatches = categoryNameLower.includes(searchLower);
			const subCategoryMatches = category.subCategories.some(subCategory =>
				subCategory.name.toLowerCase().includes(searchLower)
			);
	
			if (subCategoryMatches) {
				const categoryIsActive = parentActiveIds.includes(category.id);
	
				if (!categoryIsActive && searchQuery !== '') {
					dispatch(setParentActiveId(category.id));
				}
			}
	
			return categoryMatches || subCategoryMatches;
		});
	
		setCategoriesFilter(categoriesFilterInner);
	}, [searchQuery, categories]);
	
	
	return (
		<div className={classNames(s.wrapper)}>
			{categoriesFilter?.map((item, index) => {
				return (
					<div key={index}>
						<span
							onClick={() =>
								dispatch(
									setParentActiveId(item.id)
								)
							}
							className={s.item}
						>
							<div className={s.item_wrapper}>
								<Image
									className={s.item_img}
									src={parentActiveIds.includes(item.id) ? itemActive : itemInactive}
									alt="itemActive"
									width={16}
									height={16}
								/>
								<span
									className={
										parentActiveIds.includes(item.id) ? s.item_title : s.item_title_inactive
									}
								>
									{item.name}
								</span>
							</div>
						</span>

						<div
							className={classNames(
								s.inner,
								parentActiveIds.includes(item.id) && s.inner_active
							)}
						>
							
							<div className={s.inner_wrapper}>
							{item.subCategories?.map((el, ind) => {
								return (
									<span
										onClick={() => dispatch(setActiveId(el.id))}
										key={ind}
										className={classNames(
											s.inner_item,
											activeId === el.id && s.inner_item_active
										)}
									>
										{el.name}
									</span>
								);
							})}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};
