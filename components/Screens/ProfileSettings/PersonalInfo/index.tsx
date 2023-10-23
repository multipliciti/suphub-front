'use client';
import s from '../GeneralSettingsStyle.module.scss';
import { setModal, setEmail } from '@/redux/slices/modal';
import { useAppDispatch } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';
import { SubmitHandler, useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import modal_password from '@/imgs/Modal/pasword.svg';
import pencil from '@/imgs/ProfileSettings/pencil.svg';
import { Api } from '@/services';

const PersonalInfo = () => {
	const dispatch = useAppDispatch();
	const HOST = process.env.NEXT_PUBLIC_CLIENT_HOST;

	const api = Api();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: { firstName: '', lastName: '', email: '' },
		mode: 'onChange',
		shouldFocusError: true,
		shouldUnregister: true,
	});

	const [userId, setUserId] = useState<number>(1);

	useEffect(() => {
		const fetch = async () => {
			const response = await api.auth.getUser();
			const { firstName, lastName, email, id } = response.data;
			setValue('firstName', firstName);
			setValue('lastName', lastName);
			setValue('email', email);
			setUserId(id);
		};
		fetch();
	}, []);

	const onSubmit = async (data: any) => {
		const { firstName, lastName, email } = data;
		const form: any = {};
		form['firstName'] = firstName;
		form['lastName'] = lastName;
		form['email'] = email;
		const response = await api.user.update(userId, form);
		if (response.status !== 200) return;
		window.location.reload();
	};

	return (
		<div className={s.content}>
			<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={s.heading}>
					<h5 className={s.title_main}>Personal Info</h5>
					<button
						className={classNames(
							s.btn_send,
							Boolean(!(Object.keys(errors).length > 0)) && s.btn_send_active
						)}
						disabled={Boolean(Object.keys(errors).length > 0)}
					>
						Save Changes
					</button>
				</div>
				<div className={s.settings}>
					<div className={s.title_general}>General Info</div>
					<div className={s.row}>
						<p className={s.title}>First name</p>
						<label className={s.label} htmlFor="firstName">
							<input
								className={s.input}
								{...register('firstName', { required: 'Please enter first name' })}
								placeholder="Enter First Name"
								type="text"
								id="firstName"
							/>
						</label>
					</div>
					{errors.firstName && (
						<div className={s.row_nogap}>
							<p></p>
							<p className={s.errorDescription}>{errors.firstName?.message}</p>
						</div>
					)}
					<div className={s.separator}></div>
					<div className={s.row}>
						<p className={s.title}>Last name</p>
						<label className={s.label} htmlFor="lastName">
							<input
								className={s.input}
								{...register('lastName', { required: 'Please enter last name' })}
								placeholder="Enter Last Name"
								type="text"
								id="lastName"
							/>
						</label>
					</div>
					{errors.lastName && (
						<div className={s.row_nogap}>
							<p></p>
							<p className={s.errorDescription}>{errors.lastName?.message}</p>
						</div>
					)}
					<div className={s.separator}></div>
					<div className={s.row}>
						<p className={s.title}>Email</p>
						<label className={s.label} htmlFor="email">
							<input
								className={s.input}
								{...register('email', {
									required: 'Email is required',
									pattern: {
										value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
										message: 'Invalid email format',
									},
								})}
								id="email"
								placeholder="example@suphub.com"
								type="text"
							/>
						</label>
					</div>
					{errors.email && (
						<div className={s.row_nogap}>
							<p></p>
							<p className={s.errorDescription}>{errors.email?.message}</p>
						</div>
					)}
					<div className={s.separator}></div>
					<div className={s.row}>
						<p className={s.title}>Password</p>
						<label className={s.label} htmlFor="password">
							<Image
								className={s.image}
								src={modal_password}
								alt="password_icon"
								width={20}
								height={20}
							/>
							<input
								className={s.input}
								id="password"
								type={'password'}
								value={'********'}
								disabled
							/>

							<Image
								onClick={() => {
									dispatch(setModal('editPassword'));
								}}
								className={s.image_edit}
								src={pencil}
								alt="edit_password"
								width={20}
								height={20}
							/>
						</label>
					</div>
				</div>
				<div className={s.to_right}>
					<button
						onClick={(e) => {
							e.preventDefault();
							dispatch(setModal('editPassword'));
						}}
						className={classNames(s.btn_send, s.btn_send_reset)}
					>
						Reset Password
					</button>
				</div>
			</form>
		</div>
	);
};

export default PersonalInfo;
