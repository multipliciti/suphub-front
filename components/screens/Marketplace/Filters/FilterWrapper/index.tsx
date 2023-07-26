'use client';
import s from './FilterWrapper.module.scss';
import { ItemFilter } from '@/types/marketplace/filters';
import { Item } from '../Item';
import { useAppSelector } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';
import { useAppDispatch } from '@/redux/hooks';
import { clearBranch, selectAll } from '@/redux/slices/filters';

interface Props {
	itemProps: ItemFilter;
}

export const FilterWrapper = ({ itemProps }: Props) => {
	const { title, items } = itemProps;
	const storeItems = useAppSelector((state) => state.filtersSlice.store[title]);
	const dispatch = useAppDispatch();

	return (
		<div className={s.wrapper}>
			<div className={s.title}>
				<span className={s.text}>{title}</span>
			</div>

			<div className={s.content}>
				{items.map((el, ind) => {
					return (
						<div key={ind}>
							<Item
								text={el.text}
								id={el.id}
								img={el.img}
								selected={storeItems.includes(el.id)}
								title={title}
							/>
						</div>
					);
				})}
			</div>

			<div className={s.select}>
				<button
					onClick={() => {
						dispatch(selectAll(title));
					}}
					className={s.select_btn}
				>
					Select all
				</button>
				<button
					className={classNames(
						s.select_btn_clear,
						storeItems.length > 0 && s.select_btn_clear_active
					)}
					onClick={() => {
						dispatch(clearBranch(title));
					}}
				>
					Clear all
				</button>
			</div>
		</div>
	);
};
