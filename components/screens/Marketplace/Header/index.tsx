'use client';
import s from './Header.module.scss';
import { useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import support_img from '@/imgs/Marketplace/Header/support.svg';

export const Header = ({}) => {
	const items = useAppSelector((state) => state.sideBarSlice.items);
	const activeId = useAppSelector((state) => state.sideBarSlice.activeId);
	const activeItem = items
		.map((el) => el.innerItems?.find((item) => item.id === activeId))
		.find((item) => item !== undefined);

	const title = activeItem ? activeItem.title : '';

	return (
		<div className={s.wrapper}>
			<h2 className={s.title}>{title}</h2>
			<button className={s.support}>
				<Image src={support_img} alt="support_img" width={20} height={20} />
				<span className={s.support_title}>Support</span>
			</button>
		</div>
	);
};
