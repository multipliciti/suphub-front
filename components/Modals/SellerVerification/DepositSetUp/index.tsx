'use client';
import s from './DepositSetUp.module.scss';
import Image from 'next/image';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { classNames } from '@/utils/classNames';
import { Api } from '@/services';
import countries from '@/utils/countries';
import modal_close from '@/imgs/close.svg';
import chevron_down from '@/imgs/ProfileSettings/chevron-down.svg';
import info_icon from '@/imgs/Buyer&Seller/SellerVerification/info.svg';
import question_icon from '@/imgs/Buyer&Seller/SellerVerification/question-icon.svg';

export const DepositSetUp = () => {
	const api = Api();
	const dispatch = useAppDispatch();

	const [isFirstTimeCreateDomesticBank, setIsFirstTimeCreateDomesticBank] =
		useState(false);
	const [isFirstTimeCreateInternationalBank, setIsFirstTimeCreateInternationalBank] =
		useState(false);

	const [selectedCountry, setSelectedCountry] = useState('United States');
	const [vendorType, setVendorType] = useState<string>('business');

	const {
		register,
		handleSubmit,
		setError,
		setValue,
		clearErrors,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			swiftCode: '',
			businessNameDomesticBank: '',
			businessNameInternational: '',
			accountNumberDomesticBank: '',
			accountNumberInternational: '',
			confirmAccountNumber: '',
			beneficiaryCountry: 'United States',
			routingNumber: '',
			addressLine1: '',
			addressLine2: '',
		},
		mode: 'onChange',
		shouldFocusError: true,
		shouldUnregister: true,
	});


	const closeModal = () => {
		dispatch(setModal(''));
		reset();
	};

	const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCountry(e.target.value);
		clearErrors('beneficiaryCountry');
	};
	const handleVendorTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setVendorType(e.target.value);
	};


	const fillDefaultValuesDomesticBank = (data: any) => {
		const { vendorType, businessName, routingNumber, accountNumber } = data;
		setValue('businessNameDomesticBank', businessName);
		setVendorType(vendorType);
		setValue('routingNumber', routingNumber);
		setValue('accountNumberDomesticBank', accountNumber);
	};

	const fillDefaultValueInternationalBank = (data: any) => {
		const {
			swiftCode,
			businessName,
			accountNumber,
			addressLine1,
			addressLine2,
		} = data;
		setValue('swiftCode', swiftCode);
		setValue('businessNameInternational', businessName);
		setValue('accountNumberInternational', accountNumber);
		setValue('confirmAccountNumber', accountNumber);
		setValue('addressLine1', addressLine1);
		setValue('addressLine2', addressLine2);
	};

	useEffect(() => {
		const fetch = async () => {
			if (selectedCountry === 'United States') {
				try {
					const response = await api.bankUSA.get();
					fillDefaultValuesDomesticBank(response.data);
				} catch (error) {
					setIsFirstTimeCreateDomesticBank(true);
				}
			} else {
				try {
					const response = await api.bankInternational.get();
					fillDefaultValueInternationalBank(response.data);
				} catch (error) {
					setIsFirstTimeCreateInternationalBank(true);
				}
			}
		};
		fetch();
	}, [selectedCountry]);

	const onSubmit: SubmitHandler<any> = async (data) => {
		const form: any = {};
		if (selectedCountry === 'United States') {
			const { businessNameDomesticBank, routingNumber, accountNumberDomesticBank } =
				data;
			form['vendorType'] = vendorType;
			form['businessName'] = businessNameDomesticBank;
			form['routingNumber'] = routingNumber;
			form['accountNumber'] = accountNumberDomesticBank;

			let response;

			if (isFirstTimeCreateDomesticBank) {
				response = await api.bankUSA.add(form);
				if (response.status !== 201) return;
			} else {
				response = await api.bankUSA.update(form);
				if (response.status !== 200) return;
			}
			window.location.reload();
		} else {
			const {
				swiftCode,
				businessNameInternational,
				accountNumberInternational,
				confirmAccountNumber,
				beneficiaryCountry,
				addressLine1,
				addressLine2,
			} = data;

			if (accountNumberInternational !== confirmAccountNumber) {
				setError('confirmAccountNumber', {
					message: 'Account numbers do not match',
				});
				return;
			}

			form['swiftCode'] = swiftCode;
			form['businessName'] = businessNameInternational;
			form['accountNumber'] = accountNumberInternational;
			form['beneficiaryCountry'] = beneficiaryCountry;
			form['addressLine1'] = addressLine1;
			form['addressLine2'] = addressLine2;

			let response;
			if (isFirstTimeCreateInternationalBank) {
				response = await api.bankInternational.add(form);
				if (response.status !== 201) return;
			} else {
				response = await api.bankInternational.update(form);
				if (response.status !== 200) return;
			}
			window.location.reload();
		}
	};


	return (
		<div className={s.wrapper}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={s.header}>
					<div className={s.header_row}>
						<div className={s.header_title}>Deposit set up</div>
						<span onClick={closeModal} className={s.back}>
							<Image
								alt='Close Button'
								className={s.header_close}
								src={modal_close}
							/>
						</span>
					</div>
					<div className={s.header_description}>
						Finish this list to verify your company
					</div>
				</div>
				<div className={s.separator} />
				<div className={s.content}>
					<div className={s.content_dropdown_group}>
						<div className={s.banner}>
							<Image src={info_icon} alt={'Info icon'} width={20} height={20} />
							<div className={s.banner_text}>
								Disbursement may be subject to fees charged by your bank
							</div>
						</div>
						<div className={s.content_dropdown_wrapper}>
							Bank Location
							<label className={s.dropdown_wrapper}>
								<select
									className={s.dropdown_label}
									{...register('beneficiaryCountry', {
										required: 'Please select a country',
									})}
									defaultValue={'United States'}
									value={selectedCountry}
									id='beneficiaryCountry'
									onChange={(e) => handleCountryChange(e)}
								>
									<option
										className={s.dropdown_label_option}
										value={'United States'}
									>
										United States
									</option>
									{countries.map((country, index) => (
										<option
											className={s.dropdown_label_option}
											key={index}
											value={country}
										>
											{country}
										</option>
									))}
								</select>
								<Image
									className={s.dropdown_arrow}
									alt={'chevron_down'}
									src={chevron_down}
								/>
							</label>
						</div>
					</div>
					{errors.beneficiaryCountry && (
						<p className={s.errorDescription}>
							{errors.beneficiaryCountry?.message}
						</p>
					)}
					<div className={s.separator} />

					{selectedCountry === 'United States'
						? (
							<div className={s.content_group}>
								<div className={s.content_input_group}>
									<div className={s.radio_row}>
										<p className={s.radio_title}>Vendor type</p>
										<div className={s.radio_group_wrapper}>
											<div className={s.radio_group}>
												<div className={s.radio_element}>
													<input
														className={s.radio_btn}
														type='radio'
														name='vendorType'
														id={'business'}
														value='business'
														checked={vendorType === 'business'}
														onChange={(e: any) => handleVendorTypeChange(e)}
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
														value='individual'
														checked={vendorType === 'individual'}
														onChange={(e: any) => handleVendorTypeChange(e)}
													/>
													<label className={s.radio_text} htmlFor={'individual'}>
														Individual
													</label>
												</div>
											</div>
										</div>
									</div>
									<div className={s.content_title_group}>
										<p className={s.content_title}>Business Name</p>
										<Image src={question_icon} alt={'question icon'}
													 title={'This name will appear on your payment. Business names cannot contain accented letters nor exceed 35 characters.'} />
									</div>
									<label className={classNames(s.label)} htmlFor={'businessName'}>
										<input
											{...register('businessNameDomesticBank', {
												required: 'Business name is required.',
												minLength: {
													value: 2,
													message: 'Business name must be at least 2 characters long.',
												},
												maxLength: {
													value: 35,
													message: 'Business name cannot exceed 35 characters.',
												},
											})}
											id={'businessName'}
											className={s.content_input}
											placeholder={'Name as on bank documents'}
											type={'text'}
										/>
									</label>
									{errors.businessNameDomesticBank && (
										<p className={s.errorDescription}>
											{errors.businessNameDomesticBank?.message}
										</p>
									)}
								</div>

								<div className={s.content_input_group}>
									<div className={s.content_title_group}>
										<p className={s.content_title}>Routing Number</p>
										<Image src={question_icon} alt={'question icon'}
													 title={'Enter routing number'} />
									</div>
									<label className={classNames(s.label)} htmlFor='routingNumber'>
										<input
											{...register('routingNumber', {
												required: 'Routing number is required.',
											})}
											id={'routingNumber'}
											className={s.content_input}
											placeholder={'Enter Routing Number'}
											type={'text'}
										/>
									</label>
								</div>
								{errors.routingNumber && (
									<p className={s.errorDescription}>{errors.routingNumber?.message}</p>
								)}


								<div className={s.content_input_group}>
									<div className={s.content_title_group}>
										<p className={s.content_title}>Account Number</p>
										<Image src={question_icon} alt={'question icon'}
													 title={'Enter account number'} />
									</div>
									<label className={classNames(s.label)} htmlFor='accountNumberDomesticBank'>
										<input
											{...register('accountNumberDomesticBank', {
												required: 'Account number is required.',
												minLength: {
													value: 2,
													message: 'Account number must be at least 2 characters long.',
												},
											})}
											id={'accountNumberDomesticBank'}
											className={s.content_input}
											type={'text'}
											placeholder={'Enter Account Number'}
										/>
									</label>
								</div>
								{errors.accountNumberDomesticBank && (
									<p className={s.errorDescription}>
										{errors.accountNumberDomesticBank?.message}
									</p>
								)}
							</div>
						)
						: (
							<div className={s.content_group}>

								<div className={s.content_input_group}>
									<div className={s.content_title_group}>
										<p className={s.content_title}>Swift Code/IBC</p>
										<Image src={question_icon} alt={'question icon'}
													 title={'Enter Swift Code/IBC'} />
									</div>
									<label className={classNames(s.label)} htmlFor='swiftCode'>
										<input
											{...register('swiftCode', {
												required: 'SWIFT/BIC Code is required.',
											})}
											id={'swiftCode'}
											className={s.content_input}
											placeholder={'Enter Swift Code/IBC'}
											type={'text'}
										/>
									</label>
								</div>
								{errors.swiftCode && (
										<p className={s.errorDescription}>{errors.swiftCode?.message}</p>
								)}

								<div className={s.content_input_group}>
									<div className={s.content_title_group}>
										<p className={s.content_title}>Business Name</p>
										<Image src={question_icon} alt={'question icon'}
													 title={'Enter Business Name'} />
									</div>
									<label className={classNames(s.label)} htmlFor='businessNameInternational'>
										<input
											{...register('businessNameInternational', {
												required: 'Business name is required',
											})}
											id={'businessNameInternational'}
											className={s.content_input}
											placeholder={'Enter Business Name'}
											type={'text'}
										/>
									</label>
								</div>
								{errors.businessNameInternational && (
										<p className={s.errorDescription}>
											{errors.businessNameInternational?.message}
										</p>
								)}


								<div className={s.content_input_group}>
									<div className={s.content_title_group}>
										<p className={s.content_title}>Account Number</p>
										<Image src={question_icon} alt={'question icon'}
													 title={'Enter Account Number'} />
									</div>
									<label className={classNames(s.label)} htmlFor='accountNumberInternational'>
										<input
											{...register('accountNumberInternational', {
												required: 'Account number is required.',
												minLength: {
													value: 2,
													message: 'Account number must be at least 2 characters long.',
												},
											})}
											id={'accountNumberInternational'}
											className={s.content_input}
											placeholder={'Enter Account Number'}
											type={'text'}
										/>
									</label>
								</div>
								{errors.accountNumberInternational && (
										<p className={s.errorDescription}>
											{errors.accountNumberInternational?.message}
										</p>
								)}

								<div className={s.content_input_group}>
									<div className={s.content_title_group}>
										<p className={s.content_title}>Confirm Account Number</p>
										<Image src={question_icon} alt={'question icon'}
													 title={'Re-nter Account Number'} />
									</div>
									<label className={classNames(s.label)} htmlFor='confirmAccountNumber'>
										<input
											{...register('confirmAccountNumber', {
												required: 'Confirm account number ',
												minLength: {
													value: 2,
													message: 'Account number must be at least 2 characters long.',
												},
											})}
											id={'confirmAccountNumber'}
											className={s.content_input}
											placeholder={'Re-nter Account Number'}
											type={'text'}
										/>
									</label>
								</div>
								{errors.confirmAccountNumber && (
										<p className={s.errorDescription}>
											{errors.confirmAccountNumber?.message}
										</p>
								)}

								<div className={s.content_input_group}>
									<div className={s.content_title_group}>
										<p className={s.content_title}>Address Line 1</p>
										<Image src={question_icon} alt={'question icon'}
													 title={'Enter first Address'} />
									</div>
									<label className={classNames(s.label)} htmlFor='addressLine1'>
										<input
											{...register('addressLine1', {
												required: 'Enter first address',
											})}
											id={'addressLine1'}
											className={s.content_input}
											placeholder={'Enter Address'}
											type={'text'}
										/>
									</label>
								</div>
								{errors.addressLine1 && (
										<p className={s.errorDescription}>{errors.addressLine1?.message}</p>
								)}

								<div className={s.content_input_group}>
									<div className={s.content_title_group}>
										<p className={s.content_title}>Address Line 2</p>
										<Image src={question_icon} alt={'question icon'}
													 title={'Enter second Address'} />
									</div>
									<label className={classNames(s.label)} htmlFor='addressLine2'>
										<input
											{...register('addressLine2', {
												required: 'Enter second address',
											})}
											id={'addressLine2'}
											className={s.content_input}
											placeholder={'Enter Address'}
											type={'text'}
										/>
									</label>
								</div>
								{errors.addressLine2 && (
									<p className={s.errorDescription}>{errors.addressLine2?.message}</p>
								)}


							</div>
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
								Boolean(!(Object.keys(errors)?.length > 0)) && s.bottom_button_send_active
							)}
							disabled={Boolean(Object.keys(errors)?.length > 0)}
						>
							Submit for verification
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};
