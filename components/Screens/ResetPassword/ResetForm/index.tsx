'use client';
import s from './ResetForm.module.scss';
import Image from 'next/image';
import { classNames } from '@/utils/classNames';
import { setModal } from '@/redux/slices/modal';
import { useAppDispatch } from '@/redux/hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Api } from '@/services';
//This is the import of a standard validation check. If you need to redraw the page, then use matchingPasswordAndRerender and isPasswordAndRerender below.
import { isPassword, matchingPassword } from '@/utils/validationAuth';
//imgs
import modal_password from '@/imgs/Modal/pasword.svg';
import modal_eye from '@/imgs/Modal/eye.svg';
import password_invalid from '@/imgs/Modal/password_invalid.svg';
import password_valid from '@/imgs/Modal/password_valid.svg';
import close_eye from '@/imgs/Modal/close_eye.svg';

interface PropsType {
	token: string;
}

export const ResetForm = ({ token }: PropsType) => {
	const api = Api();

	type FormType = {
		password: string;
		confirm: string;
	};
	const dispatch = useAppDispatch();
	const [hidePassword, setHidePassword] = useState<boolean>(false);
	const [hidePasswordConfirm, setHidePasswordConfirm] = useState<boolean>(false);
	const { push } = useRouter();
	//for rerender page
	const [forRender, setForRender] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm({
		defaultValues: { confirm: '', password: '' },
		mode: 'onChange',
		shouldFocusError: true,
	});

	const onSubmit: SubmitHandler<FormType> = (data) => {
		const requestData = {
			newPassword: data.confirm,
			token,
		};
		try {
			api.auth.createPassword(requestData);
			push('/auth/success-password');
		} catch (error: any) {}
	};

	const onErrors = (errors: any) => {
		console.log('Form Errors:', errors);
	};

	//I added two validation checks because the page was not being redrawn when the validate function was triggered erroneously. That's why I'm forcing a redraw using forRender.
	const isPasswordAndRerender = (data: string) => {
		setForRender(!forRender);
		const res = data.length < 8 ? false : true;
		return res;
	};

	const matchingPasswordAndRerender = (data: string) => {
		setForRender(!forRender);
		return data === getValues().password;
	};

	return (
		<>
			<div className={classNames(s.wrapper)}>
				<div className={s.content}>
					<form onSubmit={handleSubmit(onSubmit, onErrors)} className={s.form}>
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
									validate: isPasswordAndRerender,
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
									validate: matchingPasswordAndRerender,
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
									matchingPassword(getValues('confirm'), getValues('password')) &&
									s.reset_active
							)}
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
