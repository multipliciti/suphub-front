'use client';
import s from './Order.module.scss';
import { classNames } from '@/utils/classNames';
import { StatusOrder } from './StatusOrder';
import { Info } from './Info';
import Image from 'next/image';
import back_btn from '@/imgs/Buyer&Seller/back_btn.svg';
import { ProgressOrder } from './ProgressOrder';

interface Product {
	product: any;
}

export const Order = ({ product }: Product) => {
	return (
		<div className={s.wrapper}>
			<button className={s.btn_back}>
				<Image src={back_btn} alt="back_btn" width={20} height={20} />
				<span className={s.btn_text}>Back</span>
			</button>

			<StatusOrder
				code={product.code}
				status_info={product.status_info}
				status={product.status}
			/>
			<Info />
			<ProgressOrder />
		</div>
	);
};
