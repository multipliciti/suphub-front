'use client';
import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import s from './BackButton.module.scss';

import backIcon from '@/imgs/Buyer&Seller/back_btn.svg';

interface Props {
	href?: string;
}

export const BackButton: FC<Props> = ({ href }) => {
	const router = useRouter();

	const handleBack = () => {
		if (href) {
			router.push(href);
		} else {
			router.back();
		}
	};

	return (
		<div className={s.wrapper}>
			<button className={s.button} onClick={handleBack}>
				<Image src={backIcon} alt="back_icon" width={20} height={20} />
				<span>Back</span>
			</button>
		</div>
	);
};
