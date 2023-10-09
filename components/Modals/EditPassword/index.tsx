'use client';
import s from './EditPassword.module.scss';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
import { RegisterUserType } from '@/types/services/auth';
//imgs
import modal_close from '@/imgs/close.svg';
// import back_btn from '@/imgs/Modal/back_btn.svg';
import sheet from '@/imgs/Modal/sheet.svg';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Api } from '@/services';
import React from 'react';
import modal_password from '@/imgs/Modal/pasword.svg';
import eye from '@/imgs/Modal/eye.svg';
import close_eye from '@/imgs/Modal/close_eye.svg';
import { classNames } from '@/utils/classNames';

export const EditPassword = () => {
	const api = Api();
	const dispatch = useAppDispatch();
	const email = useAppSelector((state) => state.modalSlice.email);
	const registerFormData = useAppSelector((state) => state.authSlice.registration);

	const [hideOldPassword, setHideOldPassword] = React.useState<boolean>(true);
	const [hideNewPassword, setHideNewPassword] = React.useState<boolean>(true);
	const [hideConfirmPassword, setHideConfirmPassword] =
		React.useState<boolean>(true);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		// getValues,
	} = useForm({
		defaultValues: { oldPassword: '', newPassword: '', confirmPassword: '' },
		mode: 'onChange',
		shouldFocusError: true,
		shouldUnregister: true,
	});

	const fetchAuthResend = async (data: RegisterUserType) => {
		try {
			const response = await api.auth.resendAuth(data);
		} catch (error) {
			console.log('error resendAuth: ', error);
		}
	};

	const closeModal= () => {
		dispatch(setModal(''));
		setValue('oldPassword', '');
		setValue('newPassword', '');
		setValue('confirmPassword', '');
		setHideOldPassword(true);
		setHideNewPassword(true);
		setHideConfirmPassword(true);
	}

	const onSubmit: SubmitHandler<
		// RegisterUserType
		any
	> = async (data) => {
		console.log(data);
		dispatch(setModal('passwordChanged'));
		// const requestData = {
		// 	...data,
		// 	confirmUrl: `${HOST}/confirm-email`,
		// };
		// try {
		// 	const response = await api.auth.registerUser(requestData);
		// 	dispatch(setModal(`verifyEmail`));
		// 	dispatch(setEmail(`${requestData.email}`));
		// 	dispatch(setRegistration(requestData));
		// } catch (error: any) {
		// 	if (
		// 		error.response?.status === 400 &&
		// 		error.response?.data?.message === 'User already exist'
		// 	) {
		// 		setUsedEmail(true);
		// 	}
	};

	return (
		<div className={s.wrapper}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={s.header}>
					<div className={s.header_row}>
						<div className={s.header_title}>Edit password</div>
						<span onClick={closeModal} className={s.back}>
							<Image className={s.header_close} src={modal_close} />
						</span>
					</div>
					<div className={s.header_description}>Enter your new password below</div>
				</div>
				<div className={s.separator} />
				<div className={s.content}>
					{/*First Old Password*/}
					<div className={s.content_input}>
						<p className={s.content_title}>Old password</p>
						<label
							className={classNames(s.label, s.padding_eight)}
							htmlFor="password"
						>
							<Image
								className={s.image}
								src={modal_password}
								alt="password_icon"
								width={20}
								height={20}
							/>
							<input
								{...register('oldPassword', {
									required: 'required',
								})}
								id={'oldPassword'}
								className={s.input}
								placeholder={'Enter old password'}
								type={hideOldPassword ? 'password' : 'text'}
							/>

							<Image
								onClick={() => setHideOldPassword((prev) => !prev)}
								className={s.image}
								src={hideOldPassword ? close_eye : eye}
								alt="edit_password"
								width={20}
								height={20}
							/>
						</label>
					</div>
					{/*New Password*/}
					<div className={s.content_input}>
						<p className={s.content_title}>New password</p>
						<label className={s.label} htmlFor="password">
							<Image
								className={s.image}
								src={modal_password}
								alt="password_icon"
								width={20}
								height={20}
							/>
							<input
								{...register('newPassword', {
									required: 'required',
								})}
								className={s.input}
								placeholder={'Min 8 characters'}
								type={hideNewPassword ? 'password' : 'text'}
							/>

							<Image
								onClick={() => setHideNewPassword((prev) => !prev)}
								className={s.image}
								src={hideNewPassword ? close_eye : eye}
								alt="edit_password"
								width={20}
								height={20}
							/>
						</label>
					</div>
					{/*Confirm Password*/}
					<div className={s.content_input}>
						<p className={s.content_title}>Confirm password</p>
						<label className={s.label} htmlFor="password">
							<Image
								className={s.image}
								src={modal_password}
								alt="password_icon"
								width={20}
								height={20}
							/>
							<input
								{...register('confirmPassword', {
									required: 'required',
								})}
								className={s.input}
								placeholder={'Confirm new password'}
								type={hideConfirmPassword ? 'password' : 'text'}
							/>

							<Image
								onClick={() => setHideConfirmPassword((prev) => !prev)}
								className={s.image}
								src={hideConfirmPassword ? close_eye : eye}
								alt="edit_password"
								width={20}
								height={20}
							/>
						</label>
					</div>
				</div>

				<div className={s.bottom}>
					<div className={s.bottom_group}>
						<button
							onClick={closeModal}
							className={s.bottom_button_cancel}
						>
							Cancel
						</button>
						<button className={s.bottom_button_send}>Save</button>
					</div>
				</div>
			</form>
		</div>
	);
};
