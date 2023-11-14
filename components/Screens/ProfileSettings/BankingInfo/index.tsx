'use client';
import s from '../GeneralSettingsStyle.module.scss';
import { classNames } from '@/utils/classNames';
import { SubmitHandler, useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import chevron_down from '@/imgs/ProfileSettings/chevron-down.svg';
import Image from 'next/image';
import { Api } from '@/services';
import countries from '@/utils/countries';

type PaymentType = 'Domestic bank (USA)' | 'International';
const BankingInfo = () => {
	const api = Api();
	const [paymentType, setPaymentType] = useState<PaymentType>('Domestic bank (USA)');
	const buttons: PaymentType[] = ['Domestic bank (USA)', 'International'];

	const [isFirstTimeCreateDomesticBank, setIsFirstTimeCreateDomesticBank] =
		useState(false);
	const [isFirstTimeCreateInternationalBank, setIsFirstTimeCreateInternationalBank] =
		useState(false);

	const [vendorType, setVendorType] = useState('business');
	const [selectedCountry, setSelectedCountry] = useState('Select Country');

	const {
		register,
		handleSubmit,
		setError,
		setValue,
		clearErrors,
		formState: { errors },
	} = useForm({
		defaultValues: {
			swiftCode: '',
			businessNameDomesticBank: '',
			businessNameInternational: '',
			accountNumberDomesticBank: '',
			accountNumberInternational: '',
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
			beneficiaryCountry,
			addressLine1,
			addressLine2,
		} = data;
		setValue('swiftCode', swiftCode);
		setValue('businessNameInternational', businessName);
		setValue('accountNumberInternational', accountNumber);
		setValue('confirmAccountNumber', accountNumber);
		setValue('beneficiaryCountry', beneficiaryCountry);
		setSelectedCountry(beneficiaryCountry);
		setValue('addressLine1', addressLine1);
		setValue('addressLine2', addressLine2);
	};

	useEffect(() => {
		const fetch = async () => {
			if (paymentType === 'Domestic bank (USA)') {
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
	}, [paymentType]);

	const onSubmit: SubmitHandler<any> = async (data) => {
		const form: any = {};
		if (paymentType === 'Domestic bank (USA)') {
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
		<div className={s.content}>
			<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={s.heading}>
					<h5 className={s.title_main}>Direct Deposit</h5>
					<>
						<button
							type={'submit'}
							className={classNames(s.btn_send,
								Boolean(!(Object.keys(errors)?.length > 0)) && s.btn_send_active)
							}
							disabled={Boolean(Object.keys(errors)?.length > 0)}
						>
							Submit for review
						</button>
					</>
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
									<div className={s.radio_element}>
										<input
											className={s.radio_btn}
											type="radio"
											name="vendorType"
											id={'business'}
											value="business"
											checked={vendorType === 'business'}
											onChange={(e: any) => handleVendorTypeChange(e)}
										/>
										<label className={s.radio_text} htmlFor="business">
											Business
										</label>
									</div>
									<div className={s.radio_element}>
										<input
											className={s.radio_btn}
											type="radio"
											name="vendorType"
											id="individual"
											value="individual"
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
						<div className={s.separator}></div>
						<div className={s.row}>
							<p className={s.title}>Business Name</p>
							<label className={s.label} htmlFor="businessNameDomesticBank">
								<input
									className={s.input}
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
									placeholder="Enter Business Name"
									type="text"
									id="businessNameDomesticBank"
								/>
							</label>
						</div>
						<div className={s.row_nogap}>
							<p></p>
							{errors.businessNameDomesticBank ? (
								<p className={s.errorDescription}>
									{errors.businessNameDomesticBank?.message}
								</p>
							) : (
								<p className={s.disclaimer}>
									This name will appear on your payment. Business names cannot
									contain accented letters nor exceed 35 characters.
								</p>
							)}
						</div>
						<div className={s.separator}></div>
						<div className={s.row}>
							<p className={s.title}>Routing Number</p>
							<label className={s.label} htmlFor="routingNumber">
								<input
									className={s.input}
									{...register('routingNumber', {
										required: 'Routing number is required.',
									})}
									id="routingNumber"
									placeholder="Enter Routing Number"
									type="text"
								/>
							</label>
						</div>
						{errors.routingNumber && (
							<div className={s.row_nogap}>
								<p></p>
								<p className={s.errorDescription}>{errors.routingNumber?.message}</p>
							</div>
						)}
						<div className={s.separator}></div>
						<div className={s.row}>
							<p className={s.title}>Account Number</p>
							<label className={s.label} htmlFor="accountNumberDomesticBank">
								<input
									className={s.input}
									{...register('accountNumberDomesticBank', {
										required: 'Account number is required.',
										minLength: {
											value: 2,
											message: 'Account number must be at least 2 characters long.',
										},
									})}
									id="accountNumberDomesticBank"
									placeholder="Enter Account Number"
									type="text"
								/>
							</label>
						</div>
						{errors.accountNumberDomesticBank && (
							<div className={s.row_nogap}>
								<p></p>
								<p className={s.errorDescription}>
									{errors.accountNumberDomesticBank?.message}
								</p>
							</div>
						)}
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
									{...register('swiftCode', {
										required: 'SWIFT/BIC Code is required.',
									})}
									placeholder="Enter Swift Code/IBC"
									type="text"
									id="swiftCode"
								/>
							</label>
						</div>
						{errors.swiftCode && (
							<div className={s.row_nogap}>
								<p></p>
								<p className={s.errorDescription}>{errors.swiftCode?.message}</p>
							</div>
						)}
						<div className={s.separator}></div>
						<div className={s.row}>
							<p className={s.title}>Business Name</p>
							<label className={s.label} htmlFor="businessNameInternational">
								<input
									className={s.input}
									{...register('businessNameInternational', {
										required: 'Business name is required',
									})}
									placeholder="Enter Business Name"
									type="text"
									id="businessNameInternational"
								/>
							</label>
						</div>
						{errors.businessNameInternational && (
							<div className={s.row_nogap}>
								<p></p>
								<p className={s.errorDescription}>
									{errors.businessNameInternational?.message}
								</p>
							</div>
						)}
						<div className={s.separator}></div>
						<div className={s.row}>
							<p className={s.title}>Account Number</p>
							<label className={s.label} htmlFor="accountNumberInternational">
								<input
									className={s.input}
									{...register('accountNumberInternational', {
										required: 'Account number is required.',
										minLength: {
											value: 2,
											message: 'Account number must be at least 2 characters long.',
										},
									})}
									id="accountNumberInternational"
									placeholder="Enter Account Number"
									type="text"
								/>
							</label>
						</div>
						{errors.accountNumberInternational && (
							<div className={s.row_nogap}>
								<p></p>
								<p className={s.errorDescription}>
									{errors.accountNumberInternational?.message}
								</p>
							</div>
						)}
						<div className={s.separator}></div>
						<div className={s.row}>
							<p className={s.title}>Confirm Account Number</p>
							<label className={s.label} htmlFor="confirmAccountNumber">
								<input
									className={s.input}
									{...register('confirmAccountNumber', {
										required: 'Confirm account number ',
										minLength: {
											value: 2,
											message: 'Account number must be at least 2 characters long.',
										},
									})}
									id="confirmAccountNumber"
									placeholder="Re-nter Account Number"
									type="text"
								/>
							</label>
						</div>
						{errors.confirmAccountNumber && (
							<div className={s.row_nogap}>
								<p></p>
								<p className={s.errorDescription}>
									{errors.confirmAccountNumber?.message}
								</p>
							</div>
						)}
						<div className={s.separator}></div>
						<div className={s.row}>
							<p className={s.title}>Beneficiary Country</p>
							<label className={s.dropdown_wrapper} htmlFor="beneficiaryCountry">
								<select
									className={
										selectedCountry === 'Select Country'
											? classNames(s.dropdown_label, s.dropdown_label_placeholder)
											: s.dropdown_label
									}
									{...register('beneficiaryCountry', {
										required: 'Please select a country',
									})}
									id="beneficiaryCountry"
									onChange={handleCountryChange}
								>
									<option
										className={s.dropdown_label_placeholder}
										value=""
										disabled
										selected
									>
										Select Country
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
						{errors.beneficiaryCountry && (
							<div className={s.row_nogap}>
								<p></p>
								<p className={s.errorDescription}>
									{errors.beneficiaryCountry?.message}
								</p>
							</div>
						)}
						<div className={s.separator}></div>
						<div className={s.row}>
							<p className={s.title}>Address Line 1</p>
							<label className={s.label} htmlFor="addressLine1">
								<input
									className={s.input}
									{...register('addressLine1', {
										required: 'Enter address',
									})}
									id="addressLine1"
									placeholder="Enter Address"
									type="text"
								/>
							</label>
						</div>
						{errors.addressLine1 && (
							<div className={s.row_nogap}>
								<p></p>
								<p className={s.errorDescription}>{errors.addressLine1?.message}</p>
							</div>
						)}
						<div className={s.separator}></div>
						<div className={s.row}>
							<p className={s.title}>Address Line 2</p>
							<label className={s.label} htmlFor="addressLine2">
								<input
									className={s.input}
									{...register('addressLine2', {
										required: 'Enter address',
									})}
									id="email"
									placeholder="Enter Address"
									type="text"
								/>
							</label>
						</div>
						{errors.addressLine2 && (
							<div className={s.row_nogap}>
								<p></p>
								<p className={s.errorDescription}>{errors.addressLine2?.message}</p>
							</div>
						)}
					</div>
				)}
			</form>
		</div>
	);
};

export default BankingInfo;
