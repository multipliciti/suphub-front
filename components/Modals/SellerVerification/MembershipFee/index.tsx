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

export const MembershipFee = () => {
	const api = Api();
	const dispatch = useAppDispatch();

	const [hideOldPassword, setHideOldPassword] = React.useState<boolean>(true);

	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors, touchedFields },
	} = useForm({
		defaultValues: { oldPassword: '', newPassword: '', confirmPassword: '' },
		mode: 'onChange',
		shouldFocusError: true,
		shouldUnregister: true,
	});

	const closeModal = () => {
		dispatch(setModal(''));
		reset();
	};

	const onSubmit: SubmitHandler<any> = async (data) => {
		const { oldPassword, newPassword, confirmPassword } = data;

		const form: any = {};
	};

	const [isMonthlyPayment, setIsMonthlyPayment] = useState(true);

	const handleSwitcherClick = () => {
		setIsMonthlyPayment(!isMonthlyPayment);
	};

	return (
		<div className={s.wrapper}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={s.header}>
					<div className={s.header_row}>
						<div className={s.header_title}>Membership fee</div>
						<span onClick={closeModal} className={s.back}>
							<Image
								alt="Close Button"
								className={s.header_close}
								src={modal_close}
							/>
						</span>
					</div>
					<div className={s.header_description}>
						Finish this list to verify your company
					</div>
				</div>
				<div className={s.separator} />
				<div className={s.content}>
					<div className={s.content_group_switcher}>
						<div className={s.content_switcher}>
							<div className={s.content_switcher_text}>Monthly payment</div>
							<span
								className={s.content_switcher_background}
								onClick={handleSwitcherClick}
							>
								<Image
									className={classNames(
										s.content_switcher_circle,
										isMonthlyPayment
											? s.content_switcher_left
											: s.content_switcher_right
									)}
									src={switcher_circle}
									alt="Switcher Button"
								/>
							</span>
							<div className={s.content_switcher_text}>Annual payment</div>
							<div className={s.content_switcher_tag}>
								<div className={s.content_switcher_tag_text}>10% discount</div>
							</div>
						</div>
					</div>
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
									<span className={s.content_payment_price_number}>$89</span>
									<span className={s.content_payment_price_month}>/ month</span>
								</div>
								<button className={s.content_payment_btn}>
									<span className={s.content_payment_btn_text}>Pay with</span>{' '}
									<Image src={stripe_logo} alt={'stripe logo'} />
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};
