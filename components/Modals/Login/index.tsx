'use client';
import React, { useState } from 'react';
import { LoginDto } from '@/types/services/auth';
import s from './Login.module.scss';
import { setModal } from '@/redux/slices/modal';
import { useAppDispatch } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';
import { SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import { LayoutModal } from '../layout';
// import { isPassword } from './validation';
import { Api } from '@/services';
import { setCookie } from '@/utils/cookies';
import { useRouter } from 'next/navigation';
import { setLoginIn } from '@/redux/slices/auth';

import { getCookie } from '@/utils/cookies';
//imgs
import modal_logo from '@/imgs/Modal/Modal_logo.svg';
import modal_close from '@/imgs/Modal/Modal_close.svg';
import modal_email from '@/imgs/Modal/email.svg';
import modal_password from '@/imgs/Modal/pasword.svg';
import modal_eye from '@/imgs/Modal/eye.svg';
import modal_done from '@/imgs/Modal/done.svg';
import password_invalid from '@/imgs/Modal/password_invalid.svg';
import password_valid from '@/imgs/Modal/password_valid.svg';
import invalid_icon from '@/imgs/Modal/invalid_icon.svg';
import close_eye from '@/imgs/Modal/close_eye.svg';
import modal_incorrect from '@/imgs/Modal/incorrect.svg';

export const Login: React.FC = () => {
	const dispatch = useAppDispatch();
	const { push } = useRouter();
	const [incorrect, setIncorrect] = useState<boolean>(false);
	const [hidePassword, setHidePassword] = useState<boolean>(false);
	const [notVerified, setNotVerified] = useState<boolean>(false);
	const [correctPassword, setCorrectPassword] = useState<boolean>(false);
	const [correctEmail, setCorrectEmail] = useState<boolean>(false);

	const api = Api();

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm({
		defaultValues: { email: '', password: '' },
		mode: 'onChange',
		shouldFocusError: true,
	});

	const isEmail = (data: string) => {
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		// emailRegex.test(data) ? setCorrectEmail(true) : setIncorrect(false);
		return emailRegex.test(data);
	};

	const isPassword = (data: string) => {
		data.length < 8 ? setCorrectPassword(false) : setCorrectPassword(true);
		return data.length < 8 ? false : true;
	};

	const submit: SubmitHandler<LoginDto> = async (data) => {
		try {
			const response = await api.auth.loginUser(data);
			const { token } = response;
			if (token) {
				setCookie('token', token, 1);
				dispatch(setModal(''));
				dispatch(setLoginIn(true));
				setTimeout(() => {
					push('/marketplace');
				}, 3000);
			}
		} catch (error: any) {
			console.log('err', error);
			if (
				error.response?.data?.statusCode === 401 &&
				error.response?.data?.message === 'Unauthorized'
			) {
				setIncorrect(true);
			}
			if (
				error.response?.data?.statusCode === 401 &&
				error.response?.data?.message === 'Email not verified'
			) {
				setNotVerified(true);
			}
		}
	};

	const onErrors = (errors: any) => {
		console.log('Form Errors:', errors);
	};

	return (
		<LayoutModal>
			<div className={s.content}>
				<h3 className={s.title}>Welcome back</h3>
				<p className={s.subtitle}>
					New to Suphub?
					<span
						onClick={() => dispatch(setModal('registration'))}
						className={s.signup}
					>
						Signup
					</span>
				</p>
			</div>

			<div className={classNames(s.incorrect, incorrect && s.incorrect_active)}>
				<Image
					className={s.label_image}
					src={modal_incorrect}
					alt="modal_incorrect"
					width={24}
					height={24}
				/>
				<p className={s.incorrect_text}>
					Incorrect password or email. Please try again.
				</p>
			</div>

			<form className={classNames(s.form)} onSubmit={handleSubmit(submit, onErrors)}>
				<div className={s.email}>
					<p className={s.email_text}>Email</p>
					<label
						className={classNames(s.email_label, errors?.email && s.label_invalid)}
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
							{...register('email', { required: true, validate: isEmail })}
							className={s.email_input}
							id="email"
							type="text"
						/>

						<Image
							className={classNames(
								s.icon_invalid,
								getValues('email').length > 0 && s.icon_invalid_active
							)}
							src={isEmail(getValues('email')) ? modal_done : invalid_icon}
							alt="invalid_icon"
							width={20}
							height={20}
						/>
					</label>

					<div className={classNames(s.invalid, notVerified && s.invalid_active)}>
						<Image
							className={s.invalid_image}
							src={modal_incorrect}
							alt="modal_incorrect"
							width={12}
							height={12}
						/>
						<span>You need confirm your Email</span>
					</div>
				</div>

				<div className={s.password}>
					<p className={s.password_text}>Password</p>
					<label className={classNames(s.password_label)} htmlFor="password">
						<Image
							className={s.label_image}
							src={modal_password}
							alt="modal_password"
							width={20}
							height={20}
						/>

						<Image
							onClick={() => {
								setHidePassword(!hidePassword);
							}}
							className={`${s.label_image} ${s.label_eye}`}
							src={hidePassword ? close_eye : modal_eye}
							alt="modal_eye"
							width={20}
							height={20}
						/>
						<input
							{...register('password', {
								required: true,
								validate: isPassword,
							})}
							className={s.password_input}
							id="password"
							type={hidePassword ? 'password' : 'text'}
						/>
					</label>
					<div
						className={classNames(
							s.invalid,
							getValues('password').length > 0 && s.invalid_active
						)}
					>
						<Image
							className={s.invalid_image}
							src={correctPassword ? password_valid : password_invalid}
							alt="password_invalid"
							width={12}
							height={12}
						/>
						<span className={s.invalid_password}>Min 8 characters</span>
					</div>
				</div>

				<span
					onClick={() => dispatch(setModal('forgotPassword'))}
					className={s.forgot}
				>
					Forgot password?
				</span>

				<button
					className={classNames(
						s.submit,
						!errors?.password && !errors?.email && s.submit_valid
					)}
				>
					Continue
				</button>
			</form>
		</LayoutModal>
	);
};
