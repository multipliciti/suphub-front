'use client';
import s from './Added.module.scss';
import Image from 'next/image';

import added_to_cart_icon from '@/imgs/Buyer&Seller/added_to_cart.svg';

export const Added = () => {
	return (
		<div className={s.wrapper}>
			<Image
				src={added_to_cart_icon}
				alt="added_to_cart_icon"
				width={128}
				height={128}
			/>
			<h3 className={s.title}>Product added to cart!</h3>
			<button className={s.btn}>Go to cart</button>
		</div>
	);
};
