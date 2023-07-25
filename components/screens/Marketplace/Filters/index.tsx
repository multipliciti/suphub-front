'use client';
import s from './Filters.module.scss';
import Image from 'next/image';
import { FilterWrapper } from './FilterWrapper';
import { ItemFilter } from '@/types/marketplace/Filters';
//imgs
import close from '@/imgs/Marketplace/Filters/close.svg';
import open from '@/imgs/Marketplace/Filters/open.svg';
import test from '@/imgs/Marketplace/Filters/Sustainability/test.png';

export const Filters = () => {
	const items: ItemFilter[] = [
		{
			title: 'Manufacture',
			items: [
				{ text: 'Manufacture 1', id: 1 },
				{ text: 'Manufacture 2', id: 2 },
				{ text: 'Manufacture 3', id: 3 },
				{ text: 'Manufacture 4', id: 4 },
				{ text: 'Manufacture 5', id: 5 },
				{ text: 'Manufacture 6', id: 6 },
				{ text: 'Manufacture 7', id: 7 },
				{ text: 'Manufacture 8', id: 8 },
				{ text: 'Manufacture 9', id: 9 },
			],
			id: 1,
		},
		{
			title: 'Sustainability',
			items: [
				{ text: 'Energy Star', id: 1, img: test },
				{ text: 'PHI', id: 2, img: test },
				{ text: 'LEED', id: 3, img: test },
				{ text: 'FSC', id: 4, img: test },
				{ text: 'NGBS', id: 5, img: test },
				{ text: 'PHI', id: 6, img: test },
				{ text: 'LEED', id: 7, img: test },
				{ text: 'FSC', id: 8, img: test },
				{ text: 'NGBS', id: 9, img: test },
			],
			id: 2,
		},

		{
			title: 'Certification',
			items: [
				{ text: 'AAMA', id: 1, img: test },
				{ text: 'ASTM', id: 2, img: test },
				{ text: 'CSA', id: 3, img: test },
				{ text: 'WDMA', id: 4, img: test },
				{ text: 'NGBS', id: 5, img: test },
				{ text: 'NFRC', id: 6, img: test },
				{ text: 'AAMA', id: 7, img: test },
				{ text: 'ASTM', id: 8, img: test },
				{ text: 'CSA', id: 9, img: test },
				{ text: 'WDMA', id: 10, img: test },
				{ text: 'NGBS', id: 11, img: test },
				{ text: 'NFRC', id: 12, img: test },
			],
			id: 3,
		},
		{
			title: 'Size',
			items: [
				{ text: '20”x20”', id: 1 },
				{ text: '20”x40”', id: 2 },
				{ text: '20”x60”', id: 3 },
				{ text: '40”x40”', id: 4 },
				{ text: '40”x80”', id: 5 },
				{ text: '230”x240”', id: 6 },
				{ text: '205”x450”', id: 7 },
				{ text: '260”x603”', id: 8 },
				{ text: '420”x401”', id: 9 },
				{ text: '400”x820”', id: 10 },
			],
			id: 4,
		},
	];

	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<Image
					className={s.header_img}
					src={close}
					alt="close"
					width={24}
					height={24}
				/>
				<span className={s.header_title}>Filters</span>
			</div>

			<div className={s.content}>
				{items.map((el, ind) => {
					return <FilterWrapper itemProps={el} />;
				})}
			</div>
		</div>
	);
};
