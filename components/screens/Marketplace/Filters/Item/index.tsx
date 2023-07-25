'use client';
import s from './Item.module.scss';
import Image, { StaticImageData } from 'next/image';

interface props {
	text: string;
	img?: StaticImageData;
	id: number;
}

export const Item = ({ text, img }: props) => {
	return (
		<div className={s.wrapper}>
			{img && (
				<Image className={s.header_img} src={img} alt="img" width={24} height={24} />
			)}
			<p className={s.text}>{text}</p>
		</div>
	);
};
