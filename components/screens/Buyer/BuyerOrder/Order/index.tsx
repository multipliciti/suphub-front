'use client';
import s from './Order.module.scss';
import { classNames } from '@/utils/classNames';
import Image from 'next/image';
import back_btn from '@/imgs/Buyer&Seller/back_btn.svg';
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

			<div className={s.info}>
				<span className={s.info_code}>{product.code}</span>
				<span
					className={classNames(
						s.info_status,
						product.status === 'Payment pending' && product.status_panding
					)}
				>
					{product.status}
				</span>
			</div>
		</div>
	);
};
