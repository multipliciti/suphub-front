'use client';
import s from './GetStarted.module.scss';
import Image from 'next/image';
import { classNames } from '@/utils/classNames';
import React, { useEffect, useState } from 'react';
import shield_done from '@/imgs/Buyer&Seller/SellerVerification/shield-done.svg';
import time_title_in_review_icon from '@/imgs/Buyer&Seller/SellerVerification/time-title-in-review.svg';
import alert_icon from '@/imgs/Buyer&Seller/SellerVerification/alert-icon.svg';
import time_in_review_icon from '@/imgs/Buyer&Seller/SellerVerification/time-in-review.svg';
import check_done from '@/imgs/Buyer&Seller/SellerVerification/check-done.svg';
import briefcase from '@/imgs/Buyer&Seller/SellerVerification/briefcase.svg';
import dollarCircle from '@/imgs/Buyer&Seller/SellerVerification/dollar-circle.svg';
import creditCardOutcome from '@/imgs/Buyer&Seller/SellerVerification/credit-card-outcome.svg';
import { setModal } from '@/redux/slices/modal';
import { useAppDispatch } from '@/redux/hooks';
import { Api } from '@/services';

export const StorefrontGetStarted = () => {
	const dispatch = useAppDispatch();
	const api = Api();
	const [status, setStatus] = useState<
		'notVerified' | 'businessVerified' | 'declined' | 'verified'
	>('notVerified');
	const [subscriptionPaid, setSubscriptionPaid] = useState<boolean>(false);

	useEffect(() => {
		try {
			const fetch = async () => {
				const res = await api.auth.getUser();
				const { sellerCompanyId } = res.data;
				if (!sellerCompanyId) return;
				const res2 = await api.sellerCompany.getById(sellerCompanyId);
				setStatus(res2.data.status);
				setSubscriptionPaid(res2.data.subscription.paid);
			};
			fetch();
		} catch (e) {
			console.error(e);
		}
	});
	return (
		<div className={s.content_group}>
			<div className={s.main_group}>
				<div className={s.main_logo_bg}>
					{status === 'notVerified' && (
						<Image
							alt={'Shield logo'}
							className={s.main_logo}
							width={44}
							height={44}
							src={shield_done}
						/>
					)}
					{status === 'businessVerified' && (
						<Image
							alt={'Time logo'}
							className={s.main_logo}
							width={44}
							height={44}
							src={time_title_in_review_icon}
						/>
					)}
					{status === 'declined' && (
						<div className={classNames(s.main_logo_bg, s.main_logo_bg_alert)}>
							<Image
								alt={'Alert logo'}
								className={s.main_logo}
								width={44}
								height={44}
								src={alert_icon}
							/>
						</div>
					)}
					{status === 'verified' && (
						<Image
							alt={'Shield logo'}
							className={s.main_logo}
							width={44}
							height={44}
							src={shield_done}
						/>
					)}
				</div>
				<div className={s.main_text_group}>
					{status === 'notVerified' && (
						<>
							<div className={s.main_title}>Become a verified seller</div>
							<div className={s.main_text}>
								You are 3 steps away from becoming a verified seller!
							</div>
						</>
					)}
					{status === 'businessVerified' && (
						<>
							<div className={s.main_title}>You account is in review</div>
							<div className={s.main_text}>
								You’ve added everything you need for review.
							</div>
						</>
					)}
					{status === 'declined' && (
						<>
							<div className={s.main_title}>We’re sorry</div>
							<div className={s.main_text}>
								Your verification did not pass our review. We will refund your fee
								within 5-7 business days.
							</div>
						</>
					)}
					{status === 'verified' && (
						<>
							<div className={s.main_title}>Congratulation</div>
							<div className={s.main_text}>
								Your verification did pass our review.
							</div>
						</>
					)}
				</div>
			</div>
			<div className={s.steps}>
				<div
					className={classNames(s.step, status !== 'notVerified' && s.step_status)}
				>
					<div className={s.step_logotitle_group}>
						<div
							className={classNames(
								s.step_logo,
								status !== 'notVerified' && s.step_logo_status
							)}
						>
							<svg
								className={classNames(
									s.step_logo_img,
									status !== 'notVerified' && s.step_logo_img_submitted
								)}
								xmlns="http://www.w3.org/2000/svg"
								width={40}
								height={40}
							>
								<path
									fillRule="evenodd"
									d="M14.75 9.999a5.417 5.417 0 1 1 10.833 0h2.5a7.917 7.917 0 1 0-15.833.026c-3.093.076-4.948.367-6.313 1.487a6.663 6.663 0 0 0-.924.924c-.8.974-1.176 2.198-1.354 3.945-.013.121-.024.245-.035.372a.241.241 0 0 0 .148.243c.908.378 2.226.885 3.85 1.393 1.026.32 2.17.64 3.406.927a1 1 0 0 0 1.222-.984 1.25 1.25 0 0 1 2.5 0c0 .21 0 .316.012.417.083.677.62 1.271 1.286 1.422.099.023.19.032.374.05a37.13 37.13 0 0 0 3.744.194c1.28 0 2.534-.07 3.745-.193.183-.019.275-.028.374-.05a1.709 1.709 0 0 0 1.286-1.423c.012-.101.012-.206.012-.417a1.25 1.25 0 0 1 2.5 0 1 1 0 0 0 1.222.984 47.425 47.425 0 0 0 3.405-.927 44.972 44.972 0 0 0 3.85-1.393.242.242 0 0 0 .149-.243 20.53 20.53 0 0 0-.035-.372c-.177-1.747-.554-2.97-1.354-3.945a6.664 6.664 0 0 0-.924-.924c-1.844-1.513-4.584-1.513-10.063-1.513H14.75Zm-8.5 10.575a49.773 49.773 0 0 0 4.824 1.315 1.486 1.486 0 0 1 1.176 1.443 1.25 1.25 0 1 0 2.5 0c0-.419.369-.74.785-.692 1.484.173 3.036.275 4.631.275 1.596 0 3.148-.102 4.632-.275a.701.701 0 0 1 .785.692 1.25 1.25 0 0 0 2.5 0c0-.697.496-1.294 1.177-1.443a49.782 49.782 0 0 0 4.824-1.315c.478-.156.717-.234.877-.254a1.634 1.634 0 0 1 1.842 1.336c.03.157.03.386.03.843 0 5.479 0 8.218-1.513 10.062a6.664 6.664 0 0 1-.924.924C32.552 35 29.812 35 24.333 35H16c-5.48 0-8.219 0-10.063-1.514a6.663 6.663 0 0 1-.924-.924C3.5 30.717 3.5 27.978 3.5 22.5c0-.457 0-.686.03-.843a1.634 1.634 0 0 1 1.843-1.336c.159.02.398.098.876.254Z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<div className={s.step_title}>Business verification</div>
					</div>
					{status === 'notVerified' ? (
						<button
							onClick={(e) => {
								e.preventDefault();
								dispatch(setModal('sellerVerificationBusinessVerification'));
							}}
							className={classNames(s.step_btn_send)}
						>
							<div className={classNames(s.step_btn_text, s.step_btn_text_send)}>
								Start
							</div>
						</button>
					) : (
						<button className={classNames(s.step_btn_status)}>
							<Image src={check_done} alt={'check icon'} />
							<div className={classNames(s.step_btn_text, s.step_btn_text_done)}>
								Done
							</div>
						</button>
					)}
				</div>
				<div className={classNames(s.step, status === 'verified' && s.step_status)}>
					<div className={s.step_logotitle_group}>
						<div
							className={classNames(
								s.step_logo,
								status === 'verified' && s.step_logo_status
							)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className={classNames(
									s.step_logo_img,
									status === 'verified' && s.step_logo_img_submitted
								)}
								width={40}
								height={40}
							>
								<path
									fillRule="evenodd"
									d="M20.5 36.667c9.205 0 16.667-7.462 16.667-16.666 0-9.205-7.462-16.667-16.667-16.667-9.205 0-16.667 7.462-16.667 16.667 0 9.204 7.462 16.666 16.667 16.666ZM14.75 16.24a3.656 3.656 0 0 1 3.655-3.656h1.345v-1.75a.75.75 0 0 1 1.5 0v1.75h.916a4.083 4.083 0 0 1 4.084 4.084.75.75 0 0 1-1.5 0 2.583 2.583 0 0 0-2.584-2.584h-.916v5.376l2.5.834a3.656 3.656 0 0 1-1.156 7.123H21.25v1.75a.75.75 0 0 1-1.5 0v-1.75h-.917a4.083 4.083 0 0 1-4.083-4.083.75.75 0 0 1 1.5 0 2.583 2.583 0 0 0 2.583 2.584h.917V20.54l-2.5-.833a3.656 3.656 0 0 1-2.5-3.468Zm5 2.72v-4.876h-1.345a2.156 2.156 0 0 0-.681 4.2l2.026.676Zm1.5 2.081v4.877h1.344a2.156 2.156 0 0 0 .682-4.201l-2.026-.675Z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<div className={s.step_title}>Membership fee</div>
					</div>

					{subscriptionPaid ? (
						<button className={classNames(s.step_btn_status)}>
							<Image src={check_done} alt={'check icon'} />
							<div className={classNames(s.step_btn_text, s.step_btn_text_done)}>
								Done
							</div>
						</button>
					) : (
						<button
							onClick={(e) => {
								e.preventDefault();
								dispatch(setModal('sellerVerificationMembershipFee'));
							}}
							className={classNames(s.step_btn_send)}
						>
							<div className={classNames(s.step_btn_text, s.step_btn_text_send)}>
								Start
							</div>
						</button>
					)}
				</div>
				<div className={s.step}>
					<div className={s.step_logotitle_group}>
						<div className={s.step_logo}>
							<Image
								alt={'Credit Card logo'}
								className={s.step_logo_img}
								width={40}
								height={40}
								src={creditCardOutcome}
							/>
						</div>
						<div className={s.step_title}>Deposit set up</div>
					</div>
					<button
						onClick={(e) => {
							e.preventDefault();
							dispatch(setModal('sellerVerificationDepositSetUp'));
						}}
						className={classNames(s.step_btn_send)}
					>
						<div className={classNames(s.step_btn_text, s.step_btn_text_send)}>
							Start
						</div>
					</button>
				</div>
			</div>
		</div>
	);
};
