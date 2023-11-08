'use client';
import s from './MembershipFee.module.scss';
import Image from 'next/image';
import React, { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { classNames } from '@/utils/classNames';
import { Api } from '@/services';
import modal_close from '@/imgs/close.svg';
import switcher from '@/imgs/Buyer&Seller/SellerVerification/switcher.svg';
import switcher_circle from '@/imgs/Buyer&Seller/SellerVerification/switcher-circle.svg';
import stripe_logo from '@/imgs/Buyer&Seller/SellerVerification/stripe-logo.svg';
import { useRouter } from 'next/navigation';

export const MembershipFee = () => {
	const api = Api();
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [hideOldPassword, setHideOldPassword] = React.useState<boolean>(true);

	const HOST = process.env.NEXT_PUBLIC_CLIENT_HOST

	const {
		handleSubmit,
	} = useForm();

	const closeModal = () => {
		dispatch(setModal(''));
	};

	const Subscribe= async (trial= false) => {
		try {
			const planId = 1
			const res = await api.payment.subscribe(
				{
					planId: planId,
					isTrial: trial,
					successUrl: `${HOST}/subscription/success`,
					cancelUrl: `${HOST}/subscription/canceled`,
				},
			);
			if (res.url) router.push(res.url)
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className={s.wrapper}>
				<div className={s.header}>
					<div className={s.header_row}>
						<div className={s.header_title}>Membership fee</div>
						<span onClick={closeModal} className={s.back}>
							<Image
								alt='Close Button'
								className={s.header_close}
								src={modal_close}
							/>
						</span>
					</div>
					<div className={s.header_description}>
						Finish this list to verify your company
					</div>
				</div>
				<div className={s.content}>
					<div className={s.content_group_bottom}>
						<div className={s.content_group_stripe}>
							<div className={s.content_title_group}>
								<div className={s.content_title}>Suphub Verified</div>
								<div className={s.content_title_sub}>
									For teams that need advanced sharing & reporting.
								</div>
							</div>
							<div className={s.content_payment_group}>
								<div className={s.content_payment_group_price}>
									<span className={s.content_payment_price_number}>
										$850
									</span>
									<span className={s.content_payment_price_month}>
										/ month
									</span>
								</div>
								<button className={s.content_payment_btn} onClick={() => Subscribe(true)}>
									<span className={s.content_payment_btn_text}>Trial</span>
								</button>
								<button className={s.content_payment_btn}
								onClick={() => Subscribe(false)}>
									<span className={s.content_payment_btn_text}>Pay with</span>{' '}
									<Image src={stripe_logo} alt={'stripe logo'} />
								</button>
							</div>
						</div>
					</div>
				</div>
		</div>
	);
};
