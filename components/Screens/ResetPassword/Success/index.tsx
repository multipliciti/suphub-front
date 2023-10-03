'use client';
import s from './Success.module.scss';
import Image from 'next/image';
import { useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
//imgs
import success_img from '@/imgs/ResetPassword/success.svg';

type PropsType = {
	title: string;
	subtitle: string;
};

export const Success = ({ title, subtitle }: PropsType) => {
	const dispatch = useAppDispatch();

	return (
		<div className={s.wrapper}>
			<div className={s.content}>
				<Image src={success_img} alt="success_img" width={128} height={128} />

				<h1 className={s.title}>{title}</h1>
				<p className={s.subtitle}>{subtitle}</p>

				<button onClick={() => dispatch(setModal('login'))} className={s.btn}>
					Login
				</button>
			</div>
		</div>
	);
};
