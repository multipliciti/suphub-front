'use client';
import s from './Item.module.scss';
import Image, { StaticImageData } from 'next/image';
import { useAppDispatch } from '@/redux/hooks';
import { toggleFilter } from '@/redux/slices/filters';
import { classNames } from '@/utils/classNames';
import selected_img from '@/imgs/Marketplace/Filters/selected.svg';

interface props {
	text: string;
	img?: StaticImageData;
	id: number;
	selected: boolean;
	title: string;
}

export const Item = ({ text, img, id, selected, title }: props) => {
	const dispatch = useAppDispatch();

	return (
		<div
			onClick={() => dispatch(toggleFilter({ title, id }))}
			className={classNames(s.wrapper, selected && s.wrapper_active)}
		>
			{img && (
				<Image className={s.header_img} src={img} alt="img" width={24} height={24} />
			)}
			<p className={s.text}>{text}</p>
			{selected && (
				<Image
					className={s.selected_img}
					src={selected_img}
					alt="selected_img"
					width={20}
					height={20}
				/>
			)}
		</div>
	);
};
