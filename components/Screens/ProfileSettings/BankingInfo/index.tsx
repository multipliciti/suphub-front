'use client';
import s from '../GeneralSettingsStyle.module.scss';
import { setModal, setEmail } from '@/redux/slices/modal';
import { useAppDispatch } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';
import { SubmitHandler, useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import chevron_down from '@/imgs/ProfileSettings/chevron-down.svg';
import Image from 'next/image';

type PaymentType = 'Domestic bank (USA)' | 'International';
const BankingInfo = () => {
	const dispatch = useAppDispatch();
	const [paymentType, setPaymentType] = useState<PaymentType>('Domestic bank (USA)');
	const buttons: PaymentType[] = ['Domestic bank (USA)', 'International'];

	const [vendorType, setVendorType] = useState('Business');
	const countries = [
		'China',
		'Hong Kong',
		'Singapore',
		'Taiwan',
		'Canada',
		'United Kingdom',
		'Germany',
		'France',
		'Italy',
		'Spain',
		'Netherlands',
		'Belgium',
		'Sweden',
		'Austria',
		'Poland',
		'Denmark',
		'Ireland',
		'Finland',
		'Portugal',
		'Czech Republic',
		'Greece',
		'Hungary',
		'Romania',
		'Slovakia',
		'Bulgaria',
		'Croatia',
		'Slovenia',
		'Lithuania',
		'Latvia',
		'Estonia',
		'Cyprus',
		'Malta',
		'Luxembourg',
	];

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			swiftCode: '',
			businessName: '',
			accountNumber: '',
			confirmAccountNumber: '',
			beneficiaryCountry: '',
			routingNumber: '',
			addressLine1: '',
			addressLine2: '',
		},
		mode: 'onChange',
		shouldFocusError: true,
		shouldUnregister: true,
	});

	const HOST = process.env.NEXT_PUBLIC_CLIENT_HOST;

	const onSubmit: SubmitHandler<any> = async (data) => {
		console.log(typeof data);
	};

	return (
		<div className={s.content}>
			<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={s.heading}>
					<h5 className={s.title_main}>Direct Deposit</h5>
					<button
						onClick={() => dispatch(setModal('submitForReview'))}
						className={classNames(s.btn_send, s.btn_send_active)}
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
										paymentType === buttonName && s.label_switch_active,
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
									<div className={s.radio_element}>
										<input
											className={s.radio_btn}
											type='radio'
											name='vendorType'
											id={'business'}
											value='Business'
											checked={vendorType === 'Business'}
											onChange={(e) => setVendorType(e.target.value)}
										/>
										<label className={s.radio_text} htmlFor='business'>
											Business
										</label>
									</div>
									<div className={s.radio_element}>
										<input
											className={s.radio_btn}
											type='radio'
											name='vendorType'
											id='individual'
											value='Individual'
											checked={vendorType === 'Individual'}
											onChange={(e) => setVendorType(e.target.value)}
										/>
										<label className={s.radio_text} htmlFor={'individual'}>
											Individual
										</label>
									</div>
								</div>
							</div>
						</div>
						<div className={s.separator}></div>
						<div className={s.row}>
							<p className={s.title}>Business Name</p>
							<label className={s.label} htmlFor='businessName'>
								<input
									className={s.input}
									{...register('businessName')}
									placeholder='Enter Business Name'
									type='text'
									id='lastName'
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
							<label className={s.label} htmlFor='confirmAccountNumber'>
								<input
									className={s.input}
									{...register('routingNumber')}
									id='email'
									placeholder='Enter Routing Number'
									type='text'
								/>
							</label>
						</div>
						<div className={s.separator}></div>
						<div className={s.row}>
							<p className={s.title}>Account Number</p>
							<label className={s.label} htmlFor='accountNumber'>
								<input
									className={s.input}
									{...register('accountNumber')}
									id='email'
									placeholder='Enter Account Number'
									type='text'
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
							<label className={s.label} htmlFor='swiftCode'>
								<input
									className={s.input}
									{...register('swiftCode')}
									placeholder='Enter Swift Code/IBC'
									type='text'
									id='swiftCode'
								/>
							</label>
						</div>
						<div className={s.separator}></div>
						<div className={s.row}>
							<p className={s.title}>Business Name</p>
							<label className={s.label} htmlFor='businessName'>
								<input
									className={s.input}
									{...register('businessName')}
									placeholder='Enter Business Name'
									type='text'
									id='lastName'
								/>
							</label>
						</div>
						<div className={s.separator}></div>
						<div className={s.row}>
							<p className={s.title}>Account Number</p>
							<label className={s.label} htmlFor='accountNumber'>
								<input
									className={s.input}
									{...register('accountNumber')}
									id='email'
									placeholder='Enter Account Number'
									type='text'
								/>
							</label>
						</div>
						<div className={s.separator}></div>
						<div className={s.row}>
							<p className={s.title}>Confirm Account Number</p>
							<label className={s.label} htmlFor='confirmAccountNumber'>
								<input
									className={s.input}
									{...register('confirmAccountNumber')}
									id='email'
									placeholder='Re-nter Account Number'
									type='text'
								/>
							</label>
						</div>
						<div className={s.separator}></div>
						<div className={s.row}>
							<p className={s.title}>Beneficiary Country</p>
							<label className={s.dropdown_wrapper} htmlFor='beneficiaryCountry'>
								<select className={s.dropdown_label} {...register('beneficiaryCountry')}
									id="beneficiaryCountry"
									placeholder="Select Country"
									>
									{countries.map((country, index) => (
											<option
												key={index} value={country}>
												{country}

											</option>
										),
									)}
								</select>
								<Image className={s.dropdown_arrow} alt={'chevron_down'} src={chevron_down} />
							</label>
						</div>
						<div className={s.separator}></div>
						<div className={s.row}>
							<p className={s.title}>Address Line 1</p>
							<label className={s.label} htmlFor='addressLine1'>
								<input
									className={s.input}
									{...register('addressLine1')}
									id='email'
									placeholder='Enter Address'
									type='text'
								/>
							</label>
						</div>
						<div className={s.separator}></div>
						<div className={s.row}>
							<p className={s.title}>Address Line 2</p>
							<label className={s.label} htmlFor='addressLine2'>
								<input
									className={s.input}
									{...register('addressLine2')}
									id='email'
									placeholder='Enter Address'
									type='text'
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
