'use client';
import Image from 'next/image';

import s from './ProgressStepDone.module.scss';
import success_img from '@/imgs/ResetPassword/success.svg';

type TypeProps = {
	title: string;
};

export const ProgressStepDone = ({ title }: TypeProps) => {
	return (
		<div className={s.wrapper}>
			<Image src={success_img} alt="success_img" width={150} height={150} />
			<p className={s.title}>{title}</p>
		</div>
	);
};
