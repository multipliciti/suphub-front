'use client';
import s from './Sidebar.module.scss';
import { Search } from './Search';
import { MapList } from './MapList';
import { Toggle } from './Toggle';
import { useAppSelector } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';
import { CategoryItem } from '@/types/sideBar';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setCategories } from '@/redux/slices/sideBar';
import { Api } from '@/services';

export const Sidebar = () => {
	const dispatch = useAppDispatch();
	const api = Api();
	const toggle = useAppSelector((state) => state.sideBarSlice.sideBar);
	const isSideBar = useAppSelector((state) => state.sideBarSlice.sideBar);

	const fetchCategories = async () => {
		try {
			const response = await api.sideBar.getCategoryies();
			if (response) {
				dispatch(setCategories(response));
			} else {
				console.error('Failed to fetch categories:', response.error);
			}
		} catch (error) {
			console.error('Error fetching categories:', error);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<div className={classNames(s.wrapper, toggle && s.wrapper_active)}>
			<Toggle />
			<div className={s.wrapper_scroll}>
				<div className={s.wrapper_inner}>
					<div className={classNames(s.content, isSideBar && s.content_active)}>
						<h5 className={s.title}>All categories</h5>
						<Search />
						<MapList />
					</div>
				</div>
			</div>
		</div>
	);
};
