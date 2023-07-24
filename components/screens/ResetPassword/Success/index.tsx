'use client';
import s from './Success.module.scss';
import Image from 'next/image';
import { useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
//imgs
import success_img from '@/imgs/ResetPassword/success.svg';

export const Success = () => {
	const dispatch = useAppDispatch();

	return (
		<div className={s.wrapper}>
			<div className={s.content}>
				<Image src={success_img} alt="success_img" width={128} height={128} />

				<h1 className={s.title}>Password changed</h1>
				<p className={s.subtitle}>Your password has been changed successfully.</p>

				<button onClick={() => dispatch(setModal('login'))} className={s.btn}>
					Login
				</button>
			</div>
		</div>
	);
};
