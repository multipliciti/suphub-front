'use client';
import Image from 'next/image';

import s from './Done.module.scss';
import success_img from '@/imgs/ResetPassword/success.svg';

type TypeProps = {
	title: string;
};

export const Done = ({ title }: TypeProps) => {
	return (
		<div className={s.wrapper}>
			<Image src={success_img} alt="success_img" width={150} height={150} />
			<p className={s.title}>{title}</p>
		</div>
	);
};
