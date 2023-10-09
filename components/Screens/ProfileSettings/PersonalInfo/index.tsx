'use client';
import s from '../GeneralSettingsStyle.module.scss';
// import { LayoutModal } from '../layout';
import { setModal, setEmail } from '@/redux/slices/modal';
import { useAppDispatch } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';
import { SubmitHandler, useForm } from 'react-hook-form';
// import { RegisterUserType } from '@/types/services/auth';
import React, { useState } from 'react';
// import Image from 'next/image';
// //imgs
// import modal_email from '@/imgs/Modal/email.svg';
// import modal_password from '@/imgs/Modal/pasword.svg';
// import modal_eye from '@/imgs/Modal/eye.svg';
// import close_eye from '@/imgs/Modal/close_eye.svg';
// import modal_done from '@/imgs/Modal/done.svg';
// import invalid_icon from '@/imgs/Modal/invalid_icon.svg';
// import password_invalid from '@/imgs/Modal/password_invalid.svg';
// import password_valid from '@/imgs/Modal/password_valid.svg';
// import incorrect_email from '@/imgs/Modal/incorrect.svg';
// //Api
import { Api } from '@/services';
import Image from 'next/image';
import modal_password from '@/imgs/Modal/pasword.svg';
import pencil from '@/imgs/ProfileSettings/pencil.svg';
import close_eye from '@/imgs/Modal/close_eye.svg';
import modal_eye from '@/imgs/Modal/eye.svg';
// import { setRegistration } from '@/redux/slices/auth';

const PersonalInfo = () => {
	// const api = Api();
	const dispatch = useAppDispatch();
	// const [usedEmail, setUsedEmail] = useState<boolean>(false);
	//
	// const [forRender, setForRender] = useState(false);

	//I added two validation checks because the page was not being redrawn when the validate function was triggered erroneously. That's why I'm forcing a redraw using forRender.
	// const isEmailRerender = (data: string) => {
	// 	const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
	// 	const res = emailRegex.test(data);
	// 	setForRender(!forRender); //to display when we insert
	// 	return res;
	// };

	// const isPasswordRerender = (data: string) => {
	// 	const res = data.length < 8 ? false : true;
	// 	setForRender(!forRender); //to display when we insert
	// 	return res;
	// };

	const {
		register,
		handleSubmit,
		formState: { errors },
		// getValues,
	} = useForm({
		defaultValues: { firstName: '', lastName: '', email: '' },
		mode: 'onChange',
		shouldFocusError: true,
		shouldUnregister: true,
	});

	const HOST = process.env.NEXT_PUBLIC_CLIENT_HOST;

	const onSubmit: SubmitHandler<
		// RegisterUserType
		any
	> = async (data) => {
		console.log(data);
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
		// }
	};

	return (
		<div className={s.content}>
			<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={s.heading}>
					<h5 className={s.title_main}>Personal Info</h5>
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
