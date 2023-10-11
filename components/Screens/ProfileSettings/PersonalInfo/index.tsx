'use client';
import s from '../GeneralSettingsStyle.module.scss';
import { setModal, setEmail } from '@/redux/slices/modal';
import { useAppDispatch } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';
import { SubmitHandler, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import Image from 'next/image';
import modal_password from '@/imgs/Modal/pasword.svg';
import pencil from '@/imgs/ProfileSettings/pencil.svg';

const PersonalInfo = () => {
	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { firstName: '', lastName: '', email: '' },
		mode: 'onChange',
		shouldFocusError: true,
		shouldUnregister: true,
	});

	const HOST = process.env.NEXT_PUBLIC_CLIENT_HOST;

	const onSubmit: SubmitHandler<
		any
	> = async (data) => {
		console.log(data);
	};

	return (
		<div className={s.content}>
			<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={s.heading}>
					<h5 className={s.title_main}>Personal Info</h5>
					<button
						className={classNames(
							s.btn_send,
								s.btn_send_active
						)}
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
								{...register('firstName', { required: 'required firstName' })}
								placeholder="Enter First Name"
								type="text"
								id="firstName"
							/>
						</label>
					</div>
					<div className={s.separator}></div>
					<div className={s.row}>
						<p className={s.title}>Last name</p>
						<label className={s.label} htmlFor="lastName">
							<input
								className={s.input}
								{...register('lastName', { required: 'required lastName' })}
								placeholder="Enter Last Name"
								type="text"
								id="lastName"
							/>
						</label>
					</div>
					<div className={s.separator}></div>
					<div className={s.row}>
						<p className={s.title}>Email</p>
						<label className={s.label} htmlFor="email">
							<input
								className={s.input}
								{...register('email', { required: 'required' })}
								id="email"
								placeholder="example@suphub.com"
								type="text"
							/>
						</label>
					</div>
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
						onClick={() => {
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
