'use client';
import Image from 'next/image';
import s from './Content.module.scss';
import { DetailTable } from './DetailTable';
import { ProductInfo } from './ProductInfo';
import back_icon from '@/imgs/Buyer&Seller/back_btn.svg';

export const Content = () => {
	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<span className={s.back}>
					<Image src={back_icon} alt="delete_icon" width={20} height={20} />
					<p>Back</p>
				</span>
			</div>
			<div className={s.content}>
				<DetailTable />
				<ProductInfo />
			</div>
		</div>
	);
};
