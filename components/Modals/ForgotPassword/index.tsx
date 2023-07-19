'use client';
import React, { useState } from 'react';
import s from './ForgotPassword.module.scss';
import Image from 'next/image';
import { setModal } from '@/redux/slices/modal';
import { useAppDispatch } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';
//imgs
import modal_logo from '@/imgs/Modal/Modal_logo.svg';
import modal_close from '@/imgs/Modal/Modal_close.svg';
import modal_email from '@/imgs/Modal/email.svg';
import modal_invalid from '@/imgs/Modal/ForgotPassword/invalid.svg';

export const ForgotPassword: React.FC = () => {
	const dispatch = useAppDispatch();
	const [email, setEmail] = useState<string>('');
	const [validEmail, setValidEmail] = useState<boolean>(true);

	const handleSubmit = () => {
		console.log('отправка формы');
	};

	return (
		<div className={s.wrapper}>
			<div className={s.modal_header}>
				<div className={s.logo}>
					<Image src={modal_logo} alt="logo" width={32} height={32} />
				</div>
				<span onClick={() => dispatch(setModal(''))} className={s.close}>
					<Image src={modal_close} alt="logo" width={15} height={15} />
				</span>
			</div>

			<div className={s.content}>
				<h3 className={s.title}>Forgot password?</h3>
				<p className={s.subtitle}>
					Please enter your email address and we’ll send you a link to reset your
					password
				</p>
			</div>

			<form className={s.form} onSubmit={handleSubmit}>
				<div className={s.email}>
					<p className={s.email_text}>Email</p>
					<label
						className={classNames(s.email_label, validEmail && s.label_invalid)}
						htmlFor="email"
					>
						<Image
							className={s.label_image}
							src={modal_email}
							alt="modal_email"
							width={20}
							height={20}
						/>

						<input
							value={email}
							className={s.email_input}
							id="email"
							type="text"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</label>
				</div>

				<div className={classNames(s.invalid, validEmail && s.invalid_active)}>
					<Image
						className={s.invalid_image}
						src={modal_invalid}
						alt="modal_invalid"
						width={12}
						height={12}
					/>
					<span>Please enter a valid email</span>
				</div>

				<button
					onClick={(e) => {
						setValidEmail(!validEmail);
						e.preventDefault();
					}}
					className={classNames(s.submit, email && s.submit_active)}
				>
					Reset password
				</button>
				<p onClick={() => dispatch(setModal('login'))} className={s.back}>
					Back to Login
				</p>
			</form>
		</div>
	);
};
