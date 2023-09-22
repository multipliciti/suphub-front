'use client';
import React, { useState } from 'react';
import s from './ForgotPassword.module.scss';
import Image from 'next/image';
import { setModal } from '@/redux/slices/modal';
import { useAppDispatch } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';
import { LayoutModal } from '../layout';
import { resetPasswordEmailSet } from '@/redux/slices/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Api } from '@/services';
import { isEmail } from '@/utils/validationAuth';
//imgs
import modal_email from '@/imgs/Modal/email.svg';
import invalid_icon from '@/imgs/Modal/invalid_icon.svg';
import modal_done from '@/imgs/Modal/done.svg';
import invalid_email from '@/imgs/Modal/incorrect.svg';

interface FormType {
	email: string;
}

export const ForgotPassword: React.FC = () => {
	const api = Api();
	const dispatch = useAppDispatch();
	//for rerender page
	const [forRender, setForRender] = useState(false);
	const [invalidEmail, setInvalidEmail] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm({
		mode: 'onChange',
		defaultValues: { email: '' },
		shouldFocusError: false,
		shouldUnregister: false,
	});
	//I added two validation checks because the page was not being redrawn when the validate function was triggered erroneously. That's why I'm forcing a redraw using forRender.

	const isEmailRerender = (data: string) => {
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		const res = emailRegex.test(data);
		setForRender(!forRender);
		return res;
	};

	const submit: SubmitHandler<FormType> = async (data: FormType) => {
		dispatch(resetPasswordEmailSet(data.email));
		try {
			const response = await api.auth.recovery(data);
			dispatch(setModal('checkEmail'));
		} catch (error: any) {
			const forbidden =
				error.response?.data?.statusCode === 403 &&
				error.response?.data?.message === 'Forbidden';
			if (forbidden) {
				setInvalidEmail(true);
			}
		}
	};

	const onError = () => {
		console.log('error');
	};

	return (
		<LayoutModal>
			<div>
				<div className={s.content}>
					<h3 className={s.title}>Forgot password?</h3>
					<p className={s.subtitle}>
						Please enter your email address and we’ll send you a link to reset your
						password
					</p>
				</div>

				<form className={s.form} onSubmit={handleSubmit(submit, onError)}>
					<div className={s.email}>
						<p className={s.email_text}>Email</p>
						<label
							className={classNames(
								s.email_label,
								invalidEmail && s.label_invalid,
								errors?.email && s.label_invalid
							)}
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
								{...register('email', {
									required: 'required',
									validate: isEmailRerender,
								})}
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
					</div>

					<div className={classNames(s.invalid, invalidEmail && s.invalid_active)}>
						<Image
							className={s.invalid_image}
							src={invalid_email}
							alt="modal_invalid"
							width={12}
							height={12}
						/>
						<span>Please enter a valid email</span>
					</div>

					<button
						className={classNames(
							s.submit,
							isEmail(getValues('email')) && s.submit_active
						)}
					>
						Reset password
					</button>
					<p onClick={() => dispatch(setModal('login'))} className={s.back}>
						<span className={s.back_link}>Back to Login</span>
					</p>
				</form>
			</div>
		</LayoutModal>
	);
};
