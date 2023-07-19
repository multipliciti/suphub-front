'use client';
import React, { useState } from 'react';
import s from './Login.module.scss';
import { setModal } from '@/redux/slices/modal';
import { useAppDispatch } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';
import { SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
//imgs
import modal_logo from '@/imgs/Modal/Modal_logo.svg';
import modal_close from '@/imgs/Modal/Modal_close.svg';
import modal_email from '@/imgs/Modal/email.svg';
import modal_password from '@/imgs/Modal/pasword.svg';
import modal_eye from '@/imgs/Modal/eye.svg';
import modal_incorrect from '@/imgs/Modal/Login/incorrect.svg';

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
	} = useForm({
		defaultValues: { email: '', password: '' },
	});

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

	const handleSubmitF = () => {
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
				<h3 className={s.title}>Welcome back</h3>
				<p className={s.subtitle}>
					New to Suphub? <span className={s.signup}>Signup</span>
				</p>
			</div>
			{incorrect && (
				<div className={s.incorrect}>
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
			)}
			<form
				className={classNames(s.form, incorrect && s.form_incorrect)}
				onSubmit={handleSubmit(submit, onErrors)}
			>
				<div className={s.email}>
					<p className={s.email_text}>Email</p>
					<label className={s.email_label} htmlFor="email">
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
								console.log(isEmail(e.target.value));
								setEmail(e.target.value);
							}}
						/>
					</label>
				</div>

				<div className={s.password}>
					<p className={s.password_text}>Password</p>
					<label className={s.password_label} htmlFor="password">
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
							{...register('password')}
							value={password}
							className={s.password_input}
							id="password"
							type={hidePassword ? 'password' : 'text'}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</label>
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
					className={s.submit}
				>
					Continue
				</button>
			</form>
		</div>
	);
};
