'use client';
import s from './FilterWrapper.module.scss';
import { ItemFilter } from '@/types/marketplace/Filters';
import { Item } from '../Item';

interface Props {
	itemProps: ItemFilter;
}

export const FilterWrapper = ({ itemProps }: Props) => {
	const { title, items } = itemProps;

	return (
		<div className={s.wrapper}>
			<div className={s.title}>
				<span className={s.text}>{title}</span>
			</div>

			<div className={s.content}>
				{items.map((el, ind) => {
					return (
						<div key={ind}>
							<Item text={el.text} id={el.id} img={el.img} />
						</div>
					);
				})}
			</div>

			<div className={s.select}>
				<button className={s.select_btn}>Select all</button>
			</div>
		</div>
	);
};
