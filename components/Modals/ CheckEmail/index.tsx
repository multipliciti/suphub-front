'use client';
import React, { useState } from 'react';
import s from './CheckEmail.module.scss';
import { setModal } from '@/redux/slices/modal';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Api } from '@/services';
import { classNames } from '@/utils/classNames';
import Image from 'next/image';
//imgs
import modal_close from '@/imgs/Modal/Modal_close.svg';
import back_btn from '@/imgs/Modal/CheckEmail/back_btn.svg';
import sheet from '@/imgs/Modal/CheckEmail/sheet.svg';
export const CheckEmail = () => {
	const email = useAppSelector((state) => state.authSlice.resetPasswordEmail);
	const dispatch = useAppDispatch();
	const api = Api();

	const resend = async () => {
		try {
			const response = await api.auth.recovery({ email });

			dispatch(setModal('checkEmail'));
		} catch (error: any) {
			console.log('error', error);
		}
	};

	return (
		<div className={s.wrapper}>
			<div className={s.modal_header}>
				<div onClick={() => dispatch(setModal('forgotPassword'))} className={s.back}>
					<Image src={back_btn} alt="back_btn" width={20} height={20} />
					<span className={s.back_text}>Back</span>
				</div>
				<span onClick={() => dispatch(setModal(''))} className={s.close}>
					<Image src={modal_close} alt="modal_close" width={15} height={15} />
				</span>
			</div>

			<div className={s.content}>
				<div className={s.sheet}>
					<Image src={sheet} alt="sheet" width={128} height={128} />
				</div>

				<h3 className={s.title}>Check your email</h3>
				<p className={s.subtitle}>
					Instruction for resetting your password have been sent to
					<span className={s.subtitle_email}> {email}</span>
				</p>
				<p className={s.description}>
					If you don’t receive it right away, check your spam folder
				</p>
				<button onClick={() => resend()} className={s.resend}>
					Resend email
				</button>
				<p className={s.contacts}>
					Need help? <span className={s.contacts_us}> Contact us </span>
				</p>
			</div>
		</div>
	);
};
