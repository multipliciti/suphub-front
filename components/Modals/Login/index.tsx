'use client';
import React, { useState } from 'react';
import s from './Login.module.scss';
import { setModal } from '@/redux/slices/modal';
import { useAppDispatch } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';
import { SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import { LayoutModal } from '../layout';
//imgs
import modal_logo from '@/imgs/Modal/Modal_logo.svg';
import modal_close from '@/imgs/Modal/Modal_close.svg';
import modal_email from '@/imgs/Modal/email.svg';
import modal_password from '@/imgs/Modal/pasword.svg';
import modal_eye from '@/imgs/Modal/eye.svg';
import modal_incorrect from '@/imgs/Modal/Login/incorrect.svg';
import modal_invalid from '@/imgs/Modal/ForgotPassword/invalid.svg';
import password_invalid from '@/imgs/Modal/password_invalid.svg';
import password_valid from '@/imgs/Modal/password_valid.svg';

interface FormType {
	email: string;
	password: string;
}

export const Login: React.FC = () => {
	const dispatch = useAppDispatch();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [incorrect, setIncorrect] = useState<boolean>(true);
	const [hidePassword, setHidePassword] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		trigger,
		getValues,
	} = useForm({
		defaultValues: { email: '', password: '' },
		mode: 'onBlur',
		shouldFocusError: true,
	});

	if (getValues().password === '') {
		errors.password = {
			type: 'manual',
			message: 'First error',
		};
	}

	const submit: SubmitHandler<FormType> = (data) => {
		console.log(data);
	};

	const onErrors = (errors: any) => {
		console.log('Form Errors:', errors);
	};

	const isEmail = (data: string) => {
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		return emailRegex.test(data);
	};

	const isPassword = (data: string) => {
		return data.length < 8 ? false : true;
	};

	const onChangeisPassword = (data: string) => {
		trigger('password');
	};

	return (
		<LayoutModal>
			<div className={s.content}>
				<h3 className={s.title}>Welcome back</h3>
				<p className={s.subtitle}>
					New to Suphub? <span className={s.signup}>Signup</span>
				</p>
			</div>

			{/* <div className={classNames(s.incorrect, incorrect && s.incorrect_active)}>
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
			</div> */}

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
							value={email}
							className={s.email_input}
							id="email"
							type="text"
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
					</label>
					<div className={classNames(s.invalid, errors?.email && s.invalid_active)}>
						<Image
							className={s.invalid_image}
							src={modal_invalid}
							alt="modal_invalid"
							width={12}
							height={12}
						/>
						<span>Please enter a valid email</span>
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
							src={modal_eye}
							alt="modal_eye"
							width={20}
							height={20}
						/>
						<input
							{...register('password', {
								required: true,
								validate: isPassword,
							})}
							// value={password}
							className={s.password_input}
							id="password"
							type={hidePassword ? 'password' : 'text'}
							// onChange={(e) => {
							// 	onChangeisPassword(e.target.value);
							// }}
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
							src={!errors?.password ? password_valid : password_invalid}
							alt="password_invalid"
							width={12}
							height={12}
						/>
						<span className={s.invalid_password}>Min 8 characters</span>
					</div>
				</div>

				<span
					onClick={() => dispatch(setModal('ForgotPassword'))}
					className={s.forgot}
				>
					Forgot password?
				</span>

				<button
					onClick={(e) => {
						// e.preventDefault();
						setIncorrect(!incorrect);
					}}
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
