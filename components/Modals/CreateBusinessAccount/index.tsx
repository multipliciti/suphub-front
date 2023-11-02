'use client';
import React, { useEffect, useState, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
import Image from 'next/image';
import { classNames } from '@/utils/classNames';
import s from '@/components/Modals/CreateBusinessAccount/CreateBusinessAccount.module.scss';
import company_logo from '@/imgs/Modal/CreateBusinessAccount/company_logo.svg';
import company_logo_text from '@/imgs/Modal/CreateBusinessAccount/company_logo_text.svg';
import product_images from '@/imgs/Modal/CreateBusinessAccount/product_images.png';
import product_images_low_size from '@/imgs/Modal/CreateBusinessAccount/product_images_low_size.png';
import buy_materials from '@/imgs/Modal/CreateBusinessAccount/buy_materials.svg';
import sell_materials from '@/imgs/Modal/CreateBusinessAccount/sell_materials.svg';
import check_success from '@/imgs/Modal/CreateBusinessAccount/check_success.svg';
import back_btn from '@/imgs/Modal/back_btn_add_to_rfq.svg';
import modal_close from '@/imgs/close.svg';
import eye from '@/imgs/Modal/eye.svg';
import close_eye from '@/imgs/Modal/close_eye.svg';
import chevron_down from '@/imgs/ProfileSettings/chevron-down.svg';
import { useForm } from 'react-hook-form';
import countries from '@/utils/countries';

export const CreateBusinessAccount = () => {
	const dispatch = useAppDispatch();
	const [step, setStep] = useState(1);
	const closeModal = () => {
		dispatch(setModal(''));
		setStep(1);
	};

	const {
		register: step2Register,
		handleSubmit: step2HandleSubmit,
		setValue: step2SetValue,
		formState: { errors: set2Errors },
		setError: setError2,
	} = useForm({
		defaultValues: {
			companyName: '',
			companyAddress: '',
			city: '',
			state: '',
			country: '',
			zipcode: '',
		},
		mode: 'onChange',
		shouldFocusError: true,
		shouldUnregister: true,
	});

	const onSubmitStep2 = (data: any) => {
		setStep(4);
		console.log(data);
	};

	const [selectedCountry, setSelectedCountry] = useState('Select Country');

	const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectedCountry(e.target.value);
	};

	const openCreatePersonalAccount = () => {
		dispatch(setModal('registration'));
	};

	const renderCompanySection = () => (
		<div className={s.company_section}>
			<div className={s.company_section_wrapper}>
				<div className={s.company_header}>
					<div className={s.company_header_images}>
						<Image src={company_logo} alt="Company Logo" />
						<Image src={company_logo_text} alt="Company Text" />
					</div>
					<div className={s.company_header_title}>Procurement Streamlined</div>
				</div>
				<Image src={product_images} alt="Product Images" className={s.product_img} />
			</div>
		</div>
	);
	const SelectAccountType = () => (
		<div className={s.account_type}>
			<div className={s.account_type_title}>Choose account type</div>
			<button className={s.account_type_button} onClick={() => setStep(2)}>
				<Image
					src={buy_materials}
					alt="Buy Materials"
					className={s.account_type_button_img}
				/>
				<div className={s.account_type_button_text}>Buy Materials</div>
			</button>
			<button className={s.account_type_button} onClick={() => setStep(2)}>
				<Image
					src={sell_materials}
					alt="Sell Materials"
					className={s.account_type_button_img}
				/>
				<div className={s.account_type_button_text}>Sell Materials</div>
			</button>
			<div className={s.account_type_text}>
				<div>Or</div>
				<div>
					Create a{' '}
					<a
						className={s.account_type_text_link}
						onClick={openCreatePersonalAccount}
					>
						Personal Account
					</a>{' '}
					to browse products only
				</div>
			</div>
		</div>
	);

	const {
		register: step1Register,
		handleSubmit: step1HandleSubmit,
		setValue: step1SetValue,
		formState: { errors: step1Errors },
		setError: setError1,
	} = useForm({
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		mode: 'onChange',
		shouldFocusError: true,
		shouldUnregister: true,
	});

	const onSubmitStep1 = (data: any) => {
		setStep(3);
		console.log(data);
	};

	const UserInfoForm = () => {
		const [hideNewPassword, setHideNewPassword] = React.useState<boolean>(true);
		const [hideConfirmPassword, setHideConfirmPassword] =
			React.useState<boolean>(true);

		return (
			<div className={s.form}>
				<div className={s.form_title}>Tell us about yourself</div>
				<div className={s.form_input_group}>
					<div className={s.form_two_inputs}>
						<label className={s.label} htmlFor="firstName">
							<input
								{...step1Register('firstName', { required: 'Enter first name' })}
								type="text"
								name="firstName"
								id={'firstName'}
								placeholder="Enter first name"
								className={s.form_input}
							/>
						</label>
						<label className={s.label} htmlFor="lastName">
							<input
								{...step1Register('lastName', { required: 'Enter last name' })}
								type="text"
								name="lastName"
								placeholder="Enter last name"
								className={s.form_input}
							/>
						</label>
					</div>

					<label className={s.label} htmlFor="email">
						<input
							{...step1Register('email', {
								required: 'Enter business email address',
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: 'Entered value does not match email format',
								},
							})}
							name="email"
							placeholder="Business email address"
							className={s.form_input}
						/>
					</label>
					<label className={s.label} htmlFor="password">
						<input
							{...step1Register('password', { required: '', minLength: 8 })}
							type={hideNewPassword ? 'password' : 'text'}
							name="password"
							className={s.form_password_input}
							placeholder="Enter password"
						/>
						<Image
							onClick={() => setHideNewPassword((prev) => !prev)}
							className={s.form_password_img}
							src={hideNewPassword ? close_eye : eye}
							alt="edit_password"
							width={20}
							height={20}
						/>
					</label>

					<label className={s.label} htmlFor="password">
						<input
							{...step1Register('confirmPassword', { required: '', minLength: 8 })}
							type={hideConfirmPassword ? 'password' : 'text'}
							name="confirmPassword"
							placeholder="Confirm password"
							className={s.form_password_input}
						/>
						<Image
							onClick={() => setHideConfirmPassword((prev) => !prev)}
							className={s.form_password_img}
							src={hideConfirmPassword ? close_eye : eye}
							alt="edit_password"
							width={20}
							height={20}
						/>
					</label>
				</div>

				<button
					className={classNames(s.form_button, s.form_button_active)}
					onClick={() => setStep(3)}
				>
					Continue
				</button>
			</div>
		);
	};

	const CompanyInfoForm = () => {
		const [companyName, setCompanyName] = useState('');
		const [address, setAddress] = useState('');
		const [city, setCity] = useState('');
		const [state, setState] = useState('');
		const [country, setCountry] = useState('');
		const [zip, setZip] = useState('');
		const [description, setDescription] = useState('');

		return (
			<div className={classNames(s.form, s.form_company)}>
				<div className={s.form_title}>Tell us about your company</div>

				<div className={s.form_input_group}>
					<label className={s.label} htmlFor={companyName}>
						<input
							className={s.form_input}
							type="text"
							placeholder="Company legal name"
							value={companyName}
							onChange={(e) => setCompanyName(e.target.value)}
						/>
					</label>

					<label className={s.label} htmlFor={address}>
						<input
							className={s.form_input}
							type="text"
							placeholder="Company address"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						/>
					</label>

					<div className={s.form_two_inputs}>
						<label className={s.label} htmlFor={city}>
							<input
								className={s.form_input}
								type="text"
								placeholder="City"
								value={city}
								onChange={(e) => setCity(e.target.value)}
							/>
						</label>

						<label className={s.label} htmlFor={state}>
							<input
								className={s.form_input}
								type="text"
								placeholder="State / Province"
								value={state}
								onChange={(e) => setState(e.target.value)}
							/>
						</label>
					</div>

					<div className={s.form_two_inputs}>
						<label className={s.dropdown_wrapper} htmlFor={country}>
							<select
								className={
									selectedCountry === 'Select Country'
										? classNames(s.dropdown_label, s.dropdown_label_placeholder)
										: s.dropdown_label
								}
								value={selectedCountry}
								id="beneficiaryCountry"
								onChange={(e) => handleCountryChange(e)}
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

						<label className={s.label} htmlFor={zip}>
							<input
								className={classNames(s.form_input)}
								type="text"
								placeholder="Zip code"
								value={zip}
								onChange={(e) => setZip(e.target.value)}
							/>
						</label>
					</div>
					<div className={s.form_input_group_small}>
						<div className={s.form_title_small}>
							Please briefly describe your business
						</div>
						<label className={s.label} htmlFor={description}>
							<input
								className={s.form_input}
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</label>
					</div>
				</div>

				<div className={s.form_input_group}>
					<button className={s.form_button} type="submit" onClick={() => setStep(4)}>
						Submit Application
					</button>

					<div className={s.form_disclaimer}>
						By submitting application, you agree to Suphub's{' '}
						<a className={s.form_disclaimer_link}>Terms and Conditions</a> and{' '}
						<a className={s.form_disclaimer_link}>Privacy Policy</a>
					</div>
				</div>
			</div>
		);
	};

	const SuccessComponent = () => (
		<div className={s.success}>
			<Image src={check_success} alt="check icon" className={s.success_img} />
			<div className={s.success_title}>Thank you for submitting an application</div>
			<div className={s.success_text}>We will send you an email within 24 hours</div>
		</div>
	);

	const renderStep = () => {
		switch (step) {
			case 1:
				return <SelectAccountType />;
			case 2:
				return <UserInfoForm />;
			case 3:
				return <CompanyInfoForm />;
			case 4:
				return <SuccessComponent />;
			default:
				return null;
		}
	};

	function handlePrevStep() {
		if (step > 1) {
			setStep((prev) => prev - 1);
		}
	}

	const topBar = () => (
		<div className={s.content_top_bar}>
			{step !== 1 && (
				<div onClick={() => handlePrevStep()} className={s.content_top_bar_back_btn}>
					<Image src={back_btn} alt="back_btn" width={22} height={22} />
				</div>
			)}
			{step === 2 && <h3 className={s.content_top_bar_text}>Step 1/2</h3>}
			{step === 3 && <h3 className={s.content_top_bar_text}>Step 2/2</h3>}

			<div
				onClick={closeModal}
				className={
					step === 1 ? s.content_top_bar_close_to_right : s.content_top_bar_close
				}
			>
				<Image src={modal_close} alt="modal_close" width={14} height={14} />
			</div>
		</div>
	);

	return (
		<div className={s.modal}>
			{renderCompanySection()}
			<div className={s.content}>
				{topBar()}
				<div className={s.content_steps}>{renderStep()}</div>
			</div>
		</div>
	);
};
