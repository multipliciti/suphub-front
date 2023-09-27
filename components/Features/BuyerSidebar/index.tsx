'use client';
import s from './BuyerSidebar.module.scss';
import { classNames } from '@/utils/classNames';
import { Toggle } from './Toggle';
import { MapList } from './MapList';
import { useAppSelector } from '@/redux/hooks';
import { AddProjectBtn } from './AddProjectBtn';

export const BuyerSidebarComponent = () => {
	const isSideBar = useAppSelector((state) => state.buyerSidebarSlice.sideBar);
	return (
		<div className={classNames(s.wrapper, isSideBar && s.wrapper_active)}>
			<Toggle />
			<div className={s.wrapper_scroll}>
				<div className={s.wrapper_inner}>
					<div className={classNames(s.content, isSideBar && s.content_active)}>
						<h5 className={s.title}>All Products</h5>
						<AddProjectBtn />
						<MapList />
					</div>
				</div>
			</div>
		</div>
	);
};
