'use client';
import Image from 'next/image';

import s from './Successful.module.scss';

import { useAppDispatch } from '@/redux/hooks';
import { useAppSelector } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';

import modal_close from '@/imgs/close.svg';
import success_img from '@/imgs/ResetPassword/success.svg';

export const Successful = () => {
	const dispatch = useAppDispatch();
	const text = useAppSelector((state) => state.modalSlice.successfulText);
	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<span className={s.header_title}>Successful</span>
				<Image
					className={s.header_close}
					onClick={() => dispatch(setModal(''))}
					src={modal_close}
					alt="modal_close"
					width={15}
					height={15}
				/>
			</div>
			<div className={s.content}>
				<Image
					className={s.header_close}
					onClick={() => dispatch(setModal(''))}
					src={success_img}
					alt="success_img"
					width={100}
					height={100}
				/>
				<h3 className={s.title}>{text}</h3>
				<button onClick={() => dispatch(setModal(''))} className={s.close}>
					Close
				</button>
			</div>
		</div>
	);
};
