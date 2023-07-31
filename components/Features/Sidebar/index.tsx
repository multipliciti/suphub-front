'use client';
import s from './Sidebar.module.scss';
import { Search } from './Search';
import { MapList } from './MapList';
import { Toggle } from './Toggle';
import { useAppSelector } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';

export const Sidebar = () => {
	const toggle = useAppSelector((state) => state.sideBarSlice.sideBar);
	const isSideBar = useAppSelector((state) => state.sideBarSlice.sideBar);

	return (
		<div className={classNames(s.wrapper, toggle && s.wrapper_active)}>
			<Toggle />
			<div className={classNames(s.content, isSideBar && s.content_active)}>
				<h5 className={s.title}>All categories</h5>
				<Search />
				<MapList />
			</div>
		</div>
	);
};
