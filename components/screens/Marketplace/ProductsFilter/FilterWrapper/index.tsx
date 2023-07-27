'use client';
import s from './FilterWrapper.module.scss';
import Image from 'next/image';
import { useState } from 'react';
//img
import close_img from '@/imgs/Marketplace/ProductFilter/close.svg';
import open_img from '@/imgs/Marketplace/ProductFilter/open.svg';
import { classNames } from '@/utils/classNames';

interface TypeProps {
	title: string;
	type: string;
	from?: string;
	to?: string;
	items?: {
		id: number;
		title: string;
	}[];
	selectedItems?: number[];
}

export const FilterWrapper = (props: any) => {
	const { title, min, max, items, selectedItems, type } = props.item;
	const [open, setOpen] = useState<boolean>(false);

	return (
		<div className={s.wrapper}>
			<span className={s.text}> {title} </span>
			<Image
				onClick={() => setOpen(!open)}
				className={s.img}
				src={open ? open_img : close_img}
				alt="close_img"
				width={20}
				height={20}
			/>

			{type === 'range' && (
				<div className={classNames(s.inner_wrapper, open && s.inner_wrapper_active)}>
					<label className={s.label} htmlFor={title}>
						<input placeholder="min" className={s.input} id={title} type="text" />
					</label>
					<label className={s.label} htmlFor={title}>
						<input placeholder="max" className={s.input} id={title} type="text" />
					</label>
					<button className={s.clear}>Clear filter</button>
				</div>
			)}
		</div>
	);
};
