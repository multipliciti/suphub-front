'use client';
import React, { useState } from 'react';
import { LoginDto } from '@/types/services/auth';
import s from './Login.module.scss';
import { setModal } from '@/redux/slices/modal';
import { useAppDispatch } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';
import { SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { LayoutModal } from '../layout';
//This is the import of a standard validation check. If you need to redraw the page, then use matchingPasswordAndRerender and isPasswordAndRerender below.
import { isEmail } from '@/utils/validationAuth';
import { Api } from '@/services';
import { useRouter } from 'next/navigation';
import { setStatusGetUser } from '@/redux/slices/auth';
import { setUser } from '@/redux/slices/auth';
//imgs
import modal_email from '@/imgs/Modal/email.svg';
import modal_password from '@/imgs/Modal/pasword.svg';
import modal_eye from '@/imgs/Modal/eye.svg';
import modal_done from '@/imgs/Modal/done.svg';
import invalid_icon from '@/imgs/Modal/invalid_icon.svg';
import close_eye from '@/imgs/Modal/close_eye.svg';
import modal_incorrect from '@/imgs/Modal/incorrect.svg';

export const Login: React.FC = () => {
	const searchParams = useSearchParams();
	const dispatch = useAppDispatch();
	const { push } = useRouter();
	const [incorrect, setIncorrect] = useState<boolean>(false);
	const [hidePassword, setHidePassword] = useState<boolean>(true);
	const [notVerified, setNotVerified] = useState<boolean>(false);
	//for rerender page
	const [forRender, setForRender] = useState(false);

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
	//I added two validation checks because the page was not being redrawn when the validate function was triggered erroneously. That's why I'm forcing a redraw using forRender.
	const isEmailRerender = (data: string) => {
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		const res = emailRegex.test(data);
		setForRender(!forRender);
		return res;
	};

	const submit: SubmitHandler<LoginDto> = async (data) => {
		try {
			const response = await api.auth.loginUser(data);
			if (response) {
				dispatch(setModal(''));
				const userResponse = await api.auth.getUser();
				const user = userResponse.data;

				if (user) {
					dispatch(setUser(user));
					dispatch(setStatusGetUser('success'));
					dispatch(setModal(''));
					if (searchParams.get('id') && searchParams.get('token')) {
						push('/marketplace');
					}
				} else {
					dispatch(setUser(null));
					dispatch(setStatusGetUser('rejected'));
				}
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
						onClick={() => dispatch(setModal('createBusinessAccount'))}
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
							placeholder="example@suphub.com"
							{...register('email', { required: true, validate: isEmailRerender })}
							className={s.email_input}
							id="email"
							type="text"
						/>

						<Image
							className={classNames(
								s.icon_invalid,
								getValues('email').length > 0 && s.icon_invalid_active
							)}
							src={!errors.email ? modal_done : invalid_icon}
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
							placeholder="Enter your password"
							{...register('password', {
								required: true,
							})}
							className={s.password_input}
							id="password"
							type={hidePassword ? 'password' : 'text'}
						/>
					</label>
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
						isEmail(getValues('email')) && s.submit_valid
					)}
				>
					Continue
				</button>
			</form>
		</LayoutModal>
	);
};
