'use client';
import s from './MembershipFee.module.scss';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
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
import { Plan } from '@/types/services/payment';

export const MembershipFee = () => {
	const api = Api();
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [hideOldPassword, setHideOldPassword] = React.useState<boolean>(true);
  const [plans, setPlans] = React.useState<Plan[]>()

	const HOST = process.env.NEXT_PUBLIC_CLIENT_HOST

	const {
		handleSubmit,
	} = useForm();

	const closeModal = () => {
		dispatch(setModal(''));
	};

	const Subscribe= async (planId:number, trial:boolean = false) => {
		try {
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

	useEffect(() => {
		const fetch = async() => {
			try {
				const response = await api.payment.getPlans();
				setPlans(response)
			} catch (e) {
				console.error(e)
			}
		}
		fetch()
	})

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
						{plans && plans.map((plan) => (
							<div className={s.content_group_planBox}>
							<div className={s.content_group_stripe}>
							<div className={s.content_title_group}>
								<div className={s.content_title}>{plan.title}</div>
								<div className={s.content_title_sub}>
									{plan.description}
								</div>
							</div>
							<div className={s.content_payment_group}>
								<div className={s.content_payment_group_price}>
									<span className={s.content_payment_price_number}>
										${plan.amount / 100}
									</span>
									<span className={s.content_payment_price_month}>
										/ {plan.interval}
									</span>
								</div>
								<span className={s.content_payment_group_buttons}>
									<button className={s.content_payment_btn} onClick={() => Subscribe(plan.id, true)}>
										<span className={s.content_payment_btn_text}>Trial</span>
									</button>
									<button className={s.content_payment_btn}
													onClick={() => Subscribe(plan.id, false)}>
										<span className={s.content_payment_btn_text}>Pay with</span>{' '}
										<Image src={stripe_logo} alt={'stripe logo'} />
									</button>
								</span>
							</div>
						</div>
							</div>
						))}
					</div>
				</div>
		</div>
	);
};
