'use client';
import s from './MembershipFee.module.scss';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
import { classNames } from '@/utils/classNames';
import { Api } from '@/services';
import modal_close from '@/imgs/close.svg';
import stripe_logo from '@/imgs/Buyer&Seller/SellerVerification/stripe-logo.svg';
import { useRouter } from 'next/navigation';
import { Plan } from '@/types/services/payment';
import { SubscriptionType } from '@/types/services/company';
import { useAppSelector } from '@/redux/hooks';

export const MembershipFee = () => {
	const api = Api();
	const sellerCompany = useAppSelector((state) => state.authSlice.sellerCompany);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [plans, setPlans] = React.useState<Plan[]>();
	const [subscriptionType, setSubscriptionType] =
		React.useState<SubscriptionType>('none');

	const HOST = process.env.NEXT_PUBLIC_CLIENT_HOST;

	const closeModal = () => {
		dispatch(setModal(''));
	};

	const Subscribe = async (planId: number, trial: boolean = false) => {
		try {
			const res = await api.payment.subscribe({
				planId: planId,
				isTrial: trial,
				successUrl: `${HOST}/subscription/success`,
				cancelUrl: `${HOST}/subscription/canceled`,
			});
			if (res.url) router.push(res.url);
		} catch (e) {
			dispatch(setModal('warningTrialCanBeUsedOnce'));
		}
	};

	useEffect(() => {
		const fetch = async () => {
			try {
				const response = await api.payment.getPlans();
				setPlans(response);
				if (sellerCompany?.subscription) {
					setSubscriptionType(sellerCompany.subscription.type);
				}
			} catch (e) {
				console.error(e);
			}
		};
		fetch();
	}, []);

	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<div className={s.header_row}>
					<div className={s.header_title}>Membership fee</div>
					<span onClick={closeModal} className={s.back}>
						<Image alt="Close Button" className={s.header_close} src={modal_close} />
					</span>
				</div>
			</div>
			<div className={s.separator}></div>
			<div className={s.content}>
				<div className={s.content_group_bottom}>
					{plans &&
						plans.map((plan, id) => (
							<div className={s.content_group_planBox} key={id}>
								<div className={s.content_group_stripe}>
									<div className={s.flex}>
										<div className={s.halfWidth}>
											<div className={s.content_payment_group_price}>
												<span className={s.content_payment_price_number}>
													${plan.amount / 100}{' '}
												</span>
												<span className={s.content_payment_price_month}>
													{' '}
													/ {plan.interval}
												</span>
											</div>
											{subscriptionType === 'none' && (
												<div className={s.content_payment_group_price}>
													<span className={s.content_payment_price_number}>$0 </span>
													<span className={s.content_payment_price_month}>
														{' '}
														/ 7 days
													</span>
												</div>
											)}
										</div>

										<div className={classNames(s.halfWidth, s.alignEnd)}>
											<>
												<button
													className={s.content_payment_btn}
													onClick={() => Subscribe(plan.id, false)}
												>
													<span className={s.content_payment_btn_text}>
														Pay with
													</span>{' '}
													<Image src={stripe_logo} alt={'stripe logo'} />
												</button>
												{subscriptionType === 'none' && (
													<button
														className={classNames(
															s.content_payment_btn,
															s.content_payment_btn_trial
														)}
														onClick={() => Subscribe(plan.id, true)}
													>
														<span
															className={classNames(
																s.content_payment_btn_text,
																s.content_payment_btn_text_trial
															)}
														>
															Trial
														</span>
													</button>
												)}
											</>
										</div>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};
