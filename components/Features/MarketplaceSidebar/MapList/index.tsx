'use client';
import s from './MapList.module.scss';
import { useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import { useAppDispatch } from '@/redux/hooks';
import { setParentActiveId, setActiveId } from '@/redux/slices/sideBars/sideBar';
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
	const searchQuery = useAppSelector((state) => state.sideBarSlice.searchQuery);
	const categories = useAppSelector((state) => state.sideBarSlice.categories);
	const [categoriesFilter, setCategoriesFilter] = useState<CategoryItem[]>();
	//Sorting alphabetically by the first letter propetry name
	const categoriesFilterSorted = categoriesFilter?.sort((a, b) =>
		a.name[0].localeCompare(b.name[0])
	);

	// Sorting subcategories alphabetically within each category
	const categoriesWithSortedSubcategories = categoriesFilterSorted?.map(
		(category) => ({
			...category,
			subCategories: category.subCategories
				? [...category.subCategories].sort((subA, subB) =>
						subA.name.localeCompare(subB.name)
				  )
				: [],
		})
	);

	// Sorting categories based on search criteria
	useEffect(() => {
		// Filtering categories based on searchQuery
		const categoriesFilterInner = categories.filter((category) => {
			// Convert searchQuery and categoryName to lowercase for case-insensitive comparison
			const searchLower = searchQuery.toLowerCase();
			const categoryNameLower = category.name.toLowerCase();

			// Check if categoryName includes searchQuery
			const categoryMatches = categoryNameLower.includes(searchLower);

			// Check if any subCategory name includes searchQuery
			const subCategoryMatches = category.subCategories.some((subCategory) =>
				subCategory.name.toLowerCase().includes(searchLower)
			);

			// If there's a match in subCategories, check and activate the parent category if necessary
			if (subCategoryMatches) {
				const categoryIsActive = parentActiveIds.includes(category.id);

				// If the category is not active and there's a search query, activate it
				if (!categoryIsActive && searchQuery !== '') {
					dispatch(setParentActiveId(category.id));
				}
			}

			// Return true if either category or subCategory matches the search criteria
			return categoryMatches || subCategoryMatches;
		});

		setCategoriesFilter(categoriesFilterInner);
	}, [searchQuery, categories]);

	return (
		<div className={classNames(s.wrapper)}>
			{categoriesWithSortedSubcategories?.map((item, index) => {
				return (
					<div key={index}>
						<span
							onClick={() => dispatch(setParentActiveId(item.id))}
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
										parentActiveIds.includes(item.id)
											? s.item_title
											: s.item_title_inactive
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
