'use client';
import s from './Registration.module.scss';
import { LayoutModal } from '../layout';
import { setModal, setEmail } from '@/redux/slices/modal';
import { useAppDispatch } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterUserType } from '@/types/services/auth';
import { useState } from 'react';
import Image from 'next/image';
//imgs
import modal_email from '@/imgs/Modal/email.svg';
import modal_password from '@/imgs/Modal/pasword.svg';
import modal_eye from '@/imgs/Modal/eye.svg';
import close_eye from '@/imgs/Modal/close_eye.svg';
import modal_done from '@/imgs/Modal/done.svg';
import invalid_icon from '@/imgs/Modal/invalid_icon.svg';
import password_invalid from '@/imgs/Modal/password_invalid.svg';
import password_valid from '@/imgs/Modal/password_valid.svg';
import incorrect_email from '@/imgs/Modal/incorrect.svg';
//Api
import { Api } from '@/services/';
import { setRegistration } from '@/redux/slices/auth';

export const Registration = () => {
	const api = Api();
	const dispatch = useAppDispatch();
	const [hidePassword, setHidePassword] = useState<boolean>(true);
	const [usedEmail, setUsedEmail] = useState<boolean>(false);
	//validation
	const [emailCorrect, setEmailCorrect] = useState<boolean>(false);
	const [passworsCorrect, setPasswordCorrect] = useState<boolean>(false);

	const isEmail = (data: string) => {
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		const res = emailRegex.test(data);
		setEmailCorrect(res); //to display when we insert
		return res;
	};

	const isPassword = (data: string) => {
		const res = data.length < 8 ? false : true;
		setPasswordCorrect(res);
		return res;
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm({
		defaultValues: { email: '', password: '', firstName: '', lastName: '' },
		mode: 'onChange',
		shouldFocusError: false,
		shouldUnregister: false,
	});
	
	const HOST = process.env.NEXT_PUBLIC_CLIENT_HOST;

	const onSubmit: SubmitHandler<RegisterUserType> = async (data) => {
		const requestData = {
			...data,
			confirmUrl: `${HOST}/confirm-email`,
		};
		try {
			const response = await api.auth.registerUser(requestData);
			dispatch(setModal(`verifyEmail`));
			dispatch(setEmail(`${requestData.email}`));
			dispatch(setRegistration(requestData))
		} catch (error: any) {
			if (
				error.response?.status === 400 &&
				error.response?.data?.message === 'User already exist'
				
			) {
				setUsedEmail(true);
			} 
		}
	};

	return (
		<LayoutModal>
			<div className={s.description}>
				<h1 className={s.title}>Create a personal account</h1>
				<p className={s.subtitle}>
					Already have an account?
					<span
						onClick={() => dispatch(setModal('login'))}
						className={s.subtitle_login}
					>
						Login
					</span>
				</p>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={s.names}>
					<div className={s.names_wrapper}>
						<p className={s.title}>First name</p>
						<label
							className={classNames(
								s.names_label,
								errors.firstName?.message === 'required firstName' &&
									s.names_label_invalid
							)}
							htmlFor="firstName"
						>
							<input
								{...register('firstName', {
									required: 'required firstName',
								})}
								placeholder="Enter first name"
								className={s.names_input}
								type="text"
								id="firstName"
							/>
						</label>
					</div>

					<div className={s.names_wrapper}>
						<p className={s.title}>Last name</p>
						<label
							className={classNames(
								s.names_label,
								errors.lastName?.message === 'required lastName' &&
									s.names_label_invalid
							)}
							htmlFor="lastName"
						>
							<input
								{...register('lastName', {
									required: 'required lastName',
								})}
								placeholder="Enter last name"
								className={s.names_input}
								type="text"
								id="lastName"
							/>
						</label>
					</div>
				</div>

				<div className={s.auth}>
					<div className={s.auth_email}>
						<p className={s.title}>Email</p>
						<label
							className={classNames(
								s.auth_label,
								errors?.email && s.names_label_invalid
								
							)}
							htmlFor="email"
						>
							<Image
								className={s.image}
								src={modal_email}
								alt="modal_email"
								width={20}
								height={20}
							/>
							<input
								{...register('email', {
									required: 'required',
									validate: isEmail,
								})}
								id="email"
								placeholder="example@suphub.com"
								className={s.input}
								type="text"
							/>

							<Image
								className={classNames(
									s.icon_invalid,
									getValues('email').length > 0 && s.icon_invalid_active
								)}
								src={
									getValues('email').length > 0 && errors?.email
										? invalid_icon
										: modal_done
								}
								alt="invalid_icon"
								width={20}
								height={20}
							/>
						</label>

						<div
							className={classNames(s.used_email, usedEmail && s.used_email_active)}
						>
							<Image
								className={s.image}
								src={incorrect_email}
								alt="incorrect_email"
								width={20}
								height={20}
							/>
							<span className={s.used_text}>This email is already used</span>
						</div>
					</div>
					<div className={s.auth_password}>
						<p className={s.title}>Create password</p>
						<label
							className={classNames(
								s.auth_label,
								errors?.password && s.names_label_invalid
							)}
							htmlFor="password"
						>
							<Image
								className={s.image}
								src={modal_password}
								alt="modal_password"
								width={20}
								height={20}
							/>
							<input
								{...register('password', {
									required: 'required',
									validate: isPassword,
								})}
								id="password"
								className={s.input}
								placeholder="Min 8 characters"
								type={hidePassword ? 'password' : 'text'}
							/>
							<Image
								onClick={() => setHidePassword(!hidePassword)}
								className={s.image}
								src={hidePassword ? close_eye : modal_eye}
								alt="modal_eye"
								width={20}
								height={20}
							/>
						</label>
						<div
							className={classNames(
								s.password,
								getValues('password').length > 0 && s.password_invalid
							)}
						>
							<Image
								src={!errors?.password ? password_valid : password_invalid}
								alt="password_invalid"
								width={12}
								height={12}
							/>
							<span className={s.password_invalid_text}>Min 8 characters</span>
						</div>
					</div>
				</div>

				<button
					className={classNames(
						s.btn_send,
						!errors?.email &&
							!errors?.firstName &&
							!errors?.lastName &&
							!errors?.password &&
							s.btn_send_active
					)}
				>
					Continue
				</button>

				<div className={s.polici}>
					By continuing, you agree to Suphub's
					<span className={s.polici_span}> Terms of Service </span> and
					<span className={s.polici_span}> Privacy Policy</span>
				</div>

				<div className={s.split}>
					<p className={s.text}>or</p>
				</div>

				<button className={s.btn_create}>Create a business account to trade</button>
			</form>
		</LayoutModal>
	);
};
