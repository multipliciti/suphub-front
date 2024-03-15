'use client';
import Image from 'next/image';
import s from './GoToCart.module.scss';
import Link from 'next/link';

import { useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
import { useAppSelector } from '@/redux/hooks';

import added_to_cart_icon from '@/imgs/Buyer&Seller/added_to_cart.svg';
import modal_close from '@/imgs/close.svg';

export const GoToCart = () => {
	const cartId = useAppSelector((state) => state.modalSlice.projectCart);
	const dispatch = useAppDispatch();

	const closeModal = () => {
		dispatch(setModal(''));
	};
	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<Image
					className={s.header_close}
					onClick={() => closeModal()}
					src={modal_close}
					alt="modal_close"
					width={15}
					height={15}
				/>
			</div>

			<Image
				src={added_to_cart_icon}
				alt="added_to_cart_icon"
				width={128}
				height={128}
			/>

			<h3 className={s.title}>Product added to cart!</h3>
			<Link
				className={s.btn}
				onClick={() => closeModal()}
				href={`/projects/${cartId}/cart`}
			>
				Go to cart
			</Link>
		</div>
	);
};
