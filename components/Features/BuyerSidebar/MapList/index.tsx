'use client';
import s from './MapList.module.scss';
import { classNames } from '@/utils/classNames';
import { setActiveId } from '@/redux/slices/sideBars/buyerSidebar';
import { useAppDispatch } from '@/redux/hooks';
import { useAppSelector } from '@/redux/hooks';
export const MapList = () => {
	const dispatch = useAppDispatch();
	const activeId = useAppSelector((state) => state.buyerSidebarSlice.activeId);
	const projectList = useAppSelector((state) => state.buyerSidebarSlice.projectList);
	return (
		<div className={s.wrapper}>
			{projectList.map((el, ind) => {
				return (
					<div
						onClick={() => dispatch(setActiveId(el.id))}
						className={classNames(s.item, activeId === el.id && s.item_active)}
						key={ind}
					>
						<p className={s.item_title}>{el.title}</p>
					</div>
				);
			})}
		</div>
	);
};
