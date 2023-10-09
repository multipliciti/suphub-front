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

type PaymentType = 'Domestic bank (USA)' | 'International';
const BankingInfo = () => {
	// const api = Api();
	const dispatch = useAppDispatch();
	const [paymentType, setPaymentType] = useState<PaymentType>('Domestic bank (USA)');
	const buttons = ['Domestic bank (USA)', 'International'];

	const [vendorType, setVendorType] = useState('Business');
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
		defaultValues: {
			swiftCode: '',
			businessName: '',
			accountNumber: '',
			confirmAccountNumber: '',
			beneficiaryCountry: '',
			addressLine1: '',
			addressLine2: '',
		},
		mode: 'onChange',
		shouldFocusError: true,
		shouldUnregister: true,
	});

	const HOST = process.env.NEXT_PUBLIC_CLIENT_HOST;

	const onSubmit: SubmitHandler<
		// RegisterUserType
		any
	> = async (data) => {
		console.log(typeof data);
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
					<h5 className={s.title_main}>Direct Deposit</h5>
					<button
						onClick={() => dispatch(setModal('submitForReview'))}
						className={classNames(
							s.btn_send,
							!errors?.email &&
								!errors?.firstName &&
								!errors?.lastName &&
								!errors?.password &&
								s.btn_send_active
						)}
					>
						Submit for review
					</button>
				</div>
				<div className={s.settings_bankLocation}>
					<div className={s.title_general}>Bank Location</div>
					<div className={s.row}>
						<p className={s.title}>Please select payment type first</p>

						<div className={s.buttons_switch}>
							{buttons.map((buttonName: PaymentType, index: number) => (
								<div
									className={classNames(
										s.label_switch,
										paymentType === buttonName && s.label_switch_active
									)}
									key={index}
									onClick={() => setPaymentType(buttonName)}
								>
									<div className={classNames(s.input)}>{buttonName}</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{paymentType === 'Domestic bank (USA)' && (
					<div className={s.settings}>
						<div className={s.title_general}>Domestic bank (USA)</div>
						<div className={s.radio_row}>
							<p className={s.title}>Vendor type</p>

							<div className={s.radio_group_wrapper}>
								<div className={s.radio_group}>

									<div className={s.radio_element}><input
										type='radio'
										name='vendorType'
										id={'business'}
										value='Business'
										defaultChecked={vendorType === 'Business'}
										onChange={(e) => setVendorType(e.target.value)}
									/>
										<label htmlFor='business'
											// className={classNames(s.radio_btn, s.radio_text)}
										>
											Business
										</label></div>
									<div className={s.radio_element}><input
										type='radio'
										name='vendorType'
										id='individual'
										value='Individual'
										defaultChecked={vendorType === 'Individual'}
										onChange={(e) => setVendorType(e.target.value)}
									/>
										<label htmlFor={'individual'}
											// className={classNames(s.radio_btn, s.radio_text)}
										>
											Individual
										</label></div>

								</div>
							</div>
						</div>
						<div className={s.separator}></div>
						<div className={s.row}>
							<p className={s.title}>Business Name</p>
							<label className={s.label} htmlFor="businessName">
								<input
									className={s.input}
									{...register('businessName')}
									placeholder="Enter Business Name"
									type="text"
									id="lastName"
								/>
							</label>
						</div>
						<div className={s.row}>
							<p></p>
							<p className={s.errorDescription}>
								This name will appear on your payment. Business names cannot contain
								accented letters nor exceed 35 characters.
							</p>
						</div>
						<div className={s.separator}></div>
						<div className={s.row}>
							<p className={s.title}>Routing Number</p>
							<label className={s.label} htmlFor="confirmAccountNumber">
								<input
									className={s.input}
									{...register('routingNumber')}
									id="email"
									placeholder="Enter Routing Number"
									type="text"
								/>
							</label>
						</div>
						<div className={s.separator}></div>
						<div className={s.row}>
							<p className={s.title}>Account Number</p>
							<label className={s.label} htmlFor="accountNumber">
								<input
									className={s.input}
									{...register('accountNumber')}
									id="email"
									placeholder="Enter Account Number"
									type="text"
								/>
							</label>
						</div>
					</div>
				)}
				{paymentType === 'International' && (
					<div className={s.settings}>
						<div className={s.title_general}>International</div>
						<div className={s.row}>
							<p className={s.title}>Swift Code/IBC</p>
							<label className={s.label} htmlFor="swiftCode">
								<input
									className={s.input}
									{...register('swiftCode')}
									placeholder="Enter Swift Code/IBC"
									type="text"
									id="swiftCode"
								/>
							</label>
						</div>
						<div className={s.separator}></div>
						<div className={s.row}>
							<p className={s.title}>Business Name</p>
							<label className={s.label} htmlFor="businessName">
								<input
									className={s.input}
									{...register('businessName')}
									placeholder="Enter Business Name"
									type="text"
									id="lastName"
								/>
							</label>
						</div>
						<div className={s.separator}></div>
						<div className={s.row}>
							<p className={s.title}>Account Number</p>
							<label className={s.label} htmlFor="accountNumber">
								<input
									className={s.input}
									{...register('accountNumber')}
									id="email"
									placeholder="Enter Account Number"
									type="text"
								/>
							</label>
						</div>
						<div className={s.separator}></div>
						<div className={s.row}>
							<p className={s.title}>Confirm Account Number</p>
							<label className={s.label} htmlFor="confirmAccountNumber">
								<input
									className={s.input}
									{...register('confirmAccountNumber')}
									id="email"
									placeholder="Re-nter Account Number"
									type="text"
								/>
							</label>
						</div>
						<div className={s.separator}></div>
						<div className={s.row}>
							<p className={s.title}>Beneficiary Country</p>
							<label className={s.label} htmlFor="beneficiaryCountry">
								<input
									className={s.input}
									{...register('beneficiaryCountry')}
									id="email"
									placeholder="Select Country"
									type="text"
								/>
							</label>
						</div>
						<div className={s.separator}></div>
						<div className={s.row}>
							<p className={s.title}>Address Line 1</p>
							<label className={s.label} htmlFor="addressLine1">
								<input
									className={s.input}
									{...register('addressLine1')}
									id="email"
									placeholder="Enter Address"
									type="text"
								/>
							</label>
						</div>
						<div className={s.separator}></div>
						<div className={s.row}>
							<p className={s.title}>Address Line 2</p>
							<label className={s.label} htmlFor="addressLine2">
								<input
									className={s.input}
									{...register('addressLine2')}
									id="email"
									placeholder="Enter Address"
									type="text"
								/>
							</label>
						</div>
					</div>
				)}
			</form>
		</div>
	);
};

export default BankingInfo;
