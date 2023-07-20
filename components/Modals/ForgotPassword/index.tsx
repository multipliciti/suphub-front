'use client';
import React, { useState } from 'react';
import s from './ForgotPassword.module.scss';
import Image from 'next/image';
import { setModal } from '@/redux/slices/modal';
import { useAppDispatch } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';
import { LayoutModal } from '../layout';
import { SubmitHandler, useForm } from 'react-hook-form';

//imgs
import modal_logo from '@/imgs/Modal/Modal_logo.svg';
import modal_close from '@/imgs/Modal/Modal_close.svg';
import modal_email from '@/imgs/Modal/email.svg';
import modal_invalid from '@/imgs/Modal/ForgotPassword/invalid.svg';

interface FormType {
	email: string;
}

export const ForgotPassword: React.FC = () => {
	const dispatch = useAppDispatch();
	// const [email, setEmail] = useState<string>('');
	// const [validEmail, setValidEmail] = useState<boolean>(true);
	// const [isBlurred, setIsBlurred] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		trigger,
		getValues,
	} = useForm({
		mode: 'onBlur',
		defaultValues: { email: '' },
		shouldFocusError: false,
		shouldUnregister: false,
	});

	// console.log('isBlurred', isBlurred);

	const isEmail = (data: string) => {
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		return emailRegex.test(data);
	};

	const submit: SubmitHandler<FormType> = (data: FormType) => {
		console.log('data', data);
	};

	const onError = () => {
		console.log('error');
	};

	// const onBlurHandler = async () => {
	// 	await trigger('email');
	// 	// if (!isBlurred) setIsBlurred(true);
	// };

	// const onChangeHandler = () => {
	// 	trigger('email');
	// 	console.log(getValues());
	// };

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
								{...register('email', {
									required: true,
									validate: isEmail,
								})}
								className={s.email_input}
								id="email"
								type="text"
							/>
						</label>
					</div>

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

					<button
						className={classNames(
							s.submit,
							isEmail(getValues('email')) && s.submit_active
						)}
					>
						Reset password
					</button>
					<p onClick={() => dispatch(setModal('login'))} className={s.back}>
						Back to Login
					</p>
				</form>
			</div>
		</LayoutModal>
	);
};
