'use client';
import React, { useState } from 'react';
import s from './Login.module.scss';
import { setModal } from '@/redux/slices/modal';
import { useAppDispatch } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';
import { SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import { LayoutModal } from '../layout';
import { isEmail } from './validation';
import { isPassword } from './validation';
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

interface FormType {
	email: string;
	password: string;
}

export const Login: React.FC = () => {
	const dispatch = useAppDispatch();
	const [incorrect, setIncorrect] = useState<boolean>(true);
	const [hidePassword, setHidePassword] = useState<boolean>(false);

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
							{...register('email', { validate: isEmail })}
							className={s.email_input}
							id="email"
							type="text"
						/>

						<Image
							className={classNames(
								s.icon_invalid,
								errors?.email && s.icon_invalid_active,
								getValues('email').length > 0 &&
									isEmail(getValues('email')) &&
									s.icon_invalid_active
							)}
							src={
								getValues('email').length > 0 && isEmail(getValues('email'))
									? modal_done
									: invalid_icon
							}
							alt="invalid_icon"
							width={20}
							height={20}
						/>
					</label>

					{/* <div className={classNames(s.invalid, errors?.email && s.invalid_active)}>
						<Image
							className={s.invalid_image}
							src={modal_invalid}
							alt="modal_invalid"
							width={12}
							height={12}
						/>
						<span>Please enter a valid email</span>
					</div> */}
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
							src={!errors?.password ? password_valid : password_invalid}
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
					onClick={(e) => {
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
