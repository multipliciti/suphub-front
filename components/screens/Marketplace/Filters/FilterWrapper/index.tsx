'use client';
import s from './FilterWrapper.module.scss';
import { ItemFilter } from '@/types/marketplace/filters';
import { Item } from '../Item';
import { useAppSelector } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';
import { useAppDispatch } from '@/redux/hooks';
import { selectAll } from '@/redux/slices/marketplace/filters';
import { removeChar } from '@/redux/slices/marketplace/filters';

interface Props {
	itemProps: ItemFilter;
}

export const FilterWrapper = ({ itemProps }: Props) => {
	const { attributeName, attributeId, options } = itemProps;
	const charData = useAppSelector((state) => state.filtersSlice.char);
	const countSelected = charData.find((el) => {
		return el.attributeId === attributeId;
	})?.attrValueIds.length;
	const isBranch = charData.some((el) => {
		return el.attributeId === attributeId && el.attrValueIds?.length > 0;
	})
		? true
		: false;

	const dispatch = useAppDispatch();
	const attrValueIdAll = options.map((el) => {
		return el.attrValueId;
	});

	return (
		<div className={s.wrapper}>
			<div className={s.title}>
				<span className={s.text}>{attributeName}</span>
				<span
					className={classNames(
						s.selected,
						countSelected !== undefined && countSelected > 0 && s.selected_active
					)}
				>
					{countSelected !== undefined ? `(${countSelected} selected)` : ''}
				</span>
			</div>

			<div className={s.content}>
				{options.map((el, ind) => {
					return (
						<div key={ind}>
							<Item
								text={el.value}
								attrValueId={el.attrValueId}
								attributeId={attributeId}
							/>
						</div>
					);
				})}
			</div>

			<div className={s.select}>
				<button
					onClick={() => {
						dispatch(selectAll({ attributeId, attrValueIdAll }));
					}}
					className={s.select_btn}
				>
					Select all
				</button>
				<button
					className={classNames(
						s.select_btn_clear,
						isBranch && s.select_btn_clear_active
					)}
					onClick={() => {
						dispatch(removeChar(attributeId));
					}}
				>
					Clear all
				</button>
			</div>
		</div>
	);
};
