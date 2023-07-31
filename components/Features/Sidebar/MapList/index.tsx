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

export const MapList = () => {
	const searchQuery = useAppSelector((state) => state.sideBarSlice.searchQuery);
	const sidebarItems = useAppSelector((state) => state.sideBarSlice.items);
	const activeId = useAppSelector((state) => state.sideBarSlice.activeId);
	const parentActiveId = useAppSelector(
		(state) => state.sideBarSlice.parentActiveId
	);
	const dispatch = useAppDispatch();

	const filteredSidebarItems = sidebarItems.filter((item) =>
		item.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className={classNames(s.wrapper)}>
			{filteredSidebarItems.map((item, index) => {
				return (
					<div key={index}>
						<span
							onClick={() =>
								dispatch(
									setParentActiveId(parentActiveId === item.id ? -1 : item.id)
								)
							}
							className={s.item}
						>
							<div className={s.item_wrapper}>
								<Image
									className={s.item_img}
									src={item.id === parentActiveId ? itemActive : itemInactive}
									alt="itemActive"
									width={16}
									height={16}
								/>
								<span
									className={
										item.id === parentActiveId ? s.item_title : s.item_title_inactive
									}
								>
									{item.title}
								</span>
							</div>
						</span>

						<div
							className={classNames(
								s.inner,
								parentActiveId === item.id && s.inner_active
							)}
						>
							{item.innerItems?.map((el, ind) => {
								return (
									<span
										onClick={() => dispatch(setActiveId(el.id))}
										key={ind}
										className={classNames(
											s.inner_item,
											activeId === el.id && s.inner_item_active
										)}
									>
										{el.title}
									</span>
								);
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
};
