'use client';
import s from './ResetForm.module.scss';
import Image from 'next/image';
import { classNames } from '@/utils/classNames';
import { setModal } from '@/redux/slices/modal';
import { useAppDispatch } from '@/redux/hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
//imgs
import modal_password from '@/imgs/Modal/pasword.svg';
import modal_eye from '@/imgs/Modal/eye.svg';
import password_invalid from '@/imgs/Modal/password_invalid.svg';
import password_valid from '@/imgs/Modal/password_valid.svg';
import close_eye from '@/imgs/Modal/close_eye.svg';

export const ResetForm = () => {
	const dispatch = useAppDispatch();
	const [hidePassword, setHidePassword] = useState<boolean>(false);
	const [hidePasswordConfirm, setHidePasswordConfirm] = useState<boolean>(false);
	const { push } = useRouter();

	interface FormType {
		password: string;
		confirm: string;
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		watch,
	} = useForm({
		defaultValues: { confirm: '', password: '' },
		mode: 'onChange',
		shouldFocusError: true,
	});

	const submit: SubmitHandler<FormType> = (data) => {
		console.log(data);
	};

	const onErrors = (errors: any) => {
		console.log('Form Errors:', errors);
	};

	const isPassword = (data: string) => {
		console.log(data);
		return data.length < 8 ? false : true;
	};

	const matchingPassword = (data: string) => {
		return data === getValues().password;
	};

	return (
		<>
			<div className={classNames(s.wrapper)}>
				{/* <div className={s.header}></div> */}
				<div className={s.content}>
					<form onSubmit={handleSubmit(submit, onErrors)} className={s.form}>
						<h3 className={s.title}>Reset your password</h3>
						<p className={s.subtitle}>
							Enter a new password bellow to change your password
						</p>
						<p className={s.label_title}>New password</p>

						<label className={s.label_password} htmlFor="password">
							<Image
								src={modal_password}
								alt="modal_password"
								width={20}
								height={20}
							/>
							<input
								{...register('password', {
									required: true,
									validate: isPassword,
								})}
								placeholder="Min 8 characters"
								id="password"
								className={s.label_password_input}
								type={hidePassword ? 'password' : 'text'}
							/>
							<span
								onClick={() => setHidePassword(!hidePassword)}
								className={s.label_image}
							>
								<Image
									className={s.label_image}
									src={hidePassword ? close_eye : modal_eye}
									alt="modal_eye"
									width={20}
									height={20}
								/>
							</span>
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
						<p className={s.label_title}>Confirm password</p>
						<label className={s.label_confirm} htmlFor="confirm">
							<Image
								src={modal_password}
								alt="modal_password"
								width={20}
								height={20}
							/>
							<input
								{...register('confirm', {
									required: true,
									validate: matchingPassword,
								})}
								placeholder="Min 8 characters"
								className={s.label_confirm_input}
								id="confirm"
								type={hidePasswordConfirm ? 'password' : 'text'}
							/>
							<span
								onClick={() => setHidePasswordConfirm(!hidePasswordConfirm)}
								className={s.label_image}
							>
								<Image
									className={s.label_image}
									src={hidePasswordConfirm ? close_eye : modal_eye}
									alt="modal_eye"
									width={20}
									height={20}
								/>
							</span>
						</label>

						<div
							className={classNames(
								s.invalid,
								getValues().confirm.length > 0 && s.invalid_active
							)}
						>
							<Image
								className={s.invalid_image}
								src={!errors?.confirm ? password_valid : password_invalid}
								alt="password_invalid"
								width={12}
								height={12}
							/>
							<span className={s.invalid_password}>Matching passwords</span>
						</div>

						<button
							className={classNames(
								s.reset,
								isPassword(getValues('password')) &&
									matchingPassword(getValues('confirm')) &&
									s.reset_active
							)}
							onClick={() => push('/success-password')}
						>
							Reset password
						</button>
					</form>

					<p className={s.login}>
						<span
							onClick={() => dispatch(setModal('login'))}
							className={s.login_inner}
						>
							Know your password?
							<span className={s.trylogin}> Try logging in </span>
						</span>
					</p>
				</div>
			</div>
		</>
	);
};
