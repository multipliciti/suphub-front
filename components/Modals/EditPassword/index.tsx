'use client';
import s from './EditPassword.module.scss';
import Image from 'next/image';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { classNames } from '@/utils/classNames';
import { Api } from '@/services';
import modal_close from '@/imgs/close.svg';
import modal_password from '@/imgs/Modal/pasword.svg';
import eye from '@/imgs/Modal/eye.svg';
import close_eye from '@/imgs/Modal/close_eye.svg';

export const EditPassword = () => {
	const api = Api();
	const dispatch = useAppDispatch();

	const [hideOldPassword, setHideOldPassword] = React.useState<boolean>(true);
	const [hideNewPassword, setHideNewPassword] = React.useState<boolean>(true);
	const [hideConfirmPassword, setHideConfirmPassword] =
		React.useState<boolean>(true);

	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors, touchedFields },
	} = useForm({
		defaultValues: { oldPassword: '', newPassword: '', confirmPassword: '' },
		mode: 'onChange',
		shouldFocusError: true,
		shouldUnregister: true,
	});

	const closeModal = () => {
		dispatch(setModal(''));
		setHideOldPassword(true);
		setHideNewPassword(true);
		setHideConfirmPassword(true);
		reset();
	};

	const onSubmit: SubmitHandler<any> = async (data) => {
		const { oldPassword, newPassword, confirmPassword } = data;

		const form:any = {};
		form['oldPassword'] = oldPassword;
		form['newPassword'] = newPassword;
		if (newPassword !== confirmPassword) {
			setError('confirmPassword', {
				type: 'manual',
				message: 'New passwords do not match',
			});
			return;
		}

		if (oldPassword === newPassword) {
			setError('newPassword', {
				type: 'manual',
				message: "New password can't match the old one",
			});
			return;
		}
		try {
			  await api.auth.updatePassword(form);
				dispatch(setModal('passwordChanged'));
				setHideOldPassword(true);
				setHideNewPassword(true);
				setHideConfirmPassword(true);
				reset();
		} catch (error:any) {
			const { statusCode, message } = error.response.data;
			if (statusCode === 401 && message === "Unauthorized" ) {
				setError('oldPassword', {
					type: 'manual',
					message: 'Old password is incorrect',
				});
				return;
			}
		}
	};

	return (
		<div className={s.wrapper}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={s.header}>
					<div className={s.header_row}>
						<div className={s.header_title}>Edit password</div>
						<span onClick={closeModal} className={s.back}>
							<Image
								alt="Close Button"
								className={s.header_close}
								src={modal_close}
							/>
						</span>
					</div>
					<div className={s.header_description}>Enter your new password below</div>
				</div>
				<div className={s.separator} />
				<div className={s.content}>
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
									required: 'Enter current password',
									minLength: {
										value: 8,
										message: 'Password must be at least 8 characters long',
									},
								})}
								id={'oldPassword'}
								className={s.password_input}
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
					{errors.oldPassword && (
						<p className={s.errorDescription}>{errors.oldPassword?.message}</p>
					)}
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
									required: 'Enter new password',
									minLength: {
										value: 8,
										message: 'Password must be at least 8 characters long',
									},
									pattern: {
										value: /^(?=.*[0-9])/,
										message: 'Password must contain at least one digit',
									},
								})}
								className={s.password_input}
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
					{errors.newPassword && (
						<p className={s.errorDescription}>{errors.newPassword?.message}</p>
					)}
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
									required: 'Enter confirm password',
									minLength: {
										value: 8,
										message: 'Password must be at least 8 characters long',
									},
								})}
								className={s.password_input}
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
					{errors.confirmPassword && (
						<p className={s.errorDescription}>{errors.confirmPassword?.message}</p>
					)}
				</div>

				<div className={s.bottom}>
					<div className={s.bottom_group}>
						<button
							onClick={(e) => {
								e.preventDefault();
								closeModal();
							}}
							className={s.bottom_button_cancel}
						>
							Cancel
						</button>
						<button
							className={classNames(
								s.bottom_button_send,
								touchedFields.oldPassword &&
									Boolean(!(Object.keys(errors).length > 0)) &&
									s.bottom_button_send_active
							)}
							disabled={
								touchedFields.oldPassword && Boolean(Object.keys(errors).length > 0)
							}
						>
							Save
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};
