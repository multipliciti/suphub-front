'use client';
import s from './Toggle.module.scss';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setSideBar } from '@/redux/slices/sideBar';
import Image from 'next/image';
import toggle_img from '@/imgs/SideBar/toggle.svg';

export const Toggle = () => {
	const dispatch = useAppDispatch();
	const isSideBar = useAppSelector((state) => state.sideBarSlice.sideBar);
	return (
		<div onClick={() => dispatch(setSideBar(!isSideBar))} className={s.wrapper}>
			<Image
				className={isSideBar ? s.toggle : s.toggle_active}
				src={toggle_img}
				alt="toggle_img"
				width={16}
				height={16}
			/>
		</div>
	);
};
