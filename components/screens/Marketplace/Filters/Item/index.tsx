'use client';
import s from './Item.module.scss';
import Image, { StaticImageData } from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
// import { toggleFilter } from '@/redux/slices/marketplace/filters';
import { setChar } from '@/redux/slices/marketplace/filters';
import { classNames } from '@/utils/classNames';
import selected_img from '@/imgs/Marketplace/Filters/selected.svg';

interface props {
	text: string;
	img?: StaticImageData;
	attributeId: number;
	attrValueId: number;
	selected?: boolean;
	title?: string;
}

export const Item = ({ text, img, attributeId, attrValueId }: props) => {
	const dispatch = useAppDispatch();
	const charData = useAppSelector((state) => state.filtersSlice.char);

	const isAttrValueSelected = (attributeId: any, attrValueId: any) => {
		const charDataForAttribute = charData.find(
			(char) => char.attributeId === attributeId
		);
		if (charDataForAttribute) {
			return charDataForAttribute.attrValueIds.includes(attrValueId);
		}
		return false;
	};
	const selected = isAttrValueSelected(attributeId, attrValueId);

	return (
		<div
			onClick={() => {
				dispatch(setChar({ attributeId, attrValueId }));
			}}
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
