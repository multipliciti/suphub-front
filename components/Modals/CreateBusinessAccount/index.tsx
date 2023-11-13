'use client';
import React, { useState, ChangeEvent } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
import Image from 'next/image';
import { classNames } from '@/utils/classNames';
import s from '@/components/Modals/CreateBusinessAccount/CreateBusinessAccount.module.scss';
import company_logo from '@/imgs/Modal/CreateBusinessAccount/company_logo.svg';
import company_logo_text from '@/imgs/Modal/CreateBusinessAccount/company_logo_text.svg';
import product_images from '@/imgs/Modal/CreateBusinessAccount/product_images.png';
import check_success from '@/imgs/Modal/CreateBusinessAccount/check_success.svg';
import back_btn from '@/imgs/Modal/back_btn_add_to_rfq.svg';
import modal_close from '@/imgs/close.svg';
import eye from '@/imgs/Modal/eye.svg';
import close_eye from '@/imgs/Modal/close_eye.svg';
import chevron_down from '@/imgs/ProfileSettings/chevron-down.svg';
import { useForm } from 'react-hook-form';
import { Api } from '@/services';
import { PreviousValuesOfCompany, UserDataType } from '@/types/services/auth';
import countries from '@/utils/countries';

export const CreateBusinessAccount = () => {
	const dispatch = useAppDispatch();
	const [step, setStep] = useState(1);
	const [
		previousValuesOfCompanyInfoInCaseYouWentBackAndForth,
		setPreviousValuesOfCompanyInfoInCaseYouWentBackAndForth,
	] = useState<any>({});
	const closeModal = () => {
		dispatch(setModal(''));
		setStep(1);
	};

	const buyMaterialsSVG = () => {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={80}
				height={80}
				className={s.account_type_button_img}
				fill="none"
			>
				<g clipPath="url(#a)">
					<path
						fill="#EDF1F6"
						d="M1.742 48.459v17.395l17.396 9.94V58.4l-17.396-9.94ZM71.324 38.519l-3.727 2.485-3.728-2.485v29.82h7.455V38.52Z"
					/>
					<path
						className={s.account_type_button_img_path}
						d="M77.172 12.788 64.749.365a1.235 1.235 0 0 0-.88-.365H31.563c-.687 0-1.242.557-1.242 1.243v42.234L19.754 37.44a1.24 1.24 0 0 0-1.232 0L1.126 47.38A1.24 1.24 0 0 0 .5 48.46v17.395c0 .446.239.858.626 1.079l17.396 9.94a1.237 1.237 0 0 0 1.232 0l17.396-9.94c.387-.221.626-.633.626-1.079v-3.727h24.85v9.94c0 2.74 2.23 4.97 4.97 4.97 2.742 0 4.97-2.23 4.97-4.97v-9.94h3.728c.688 0 1.243-.557 1.243-1.243V13.668c0-.344-.14-.655-.365-.88Zm-12.06-8.546 8.183 8.183h-8.183V4.242ZM19.138 39.95l14.89 8.509-3.862 2.208-14.891-8.51 3.863-2.207Zm6.829 13.643L10.614 44.82l2.156-1.232 16.308 9.318v4.724l-2.485 1.243V54.67c0-.446-.238-.857-.626-1.078ZM8.111 46.25l14.891 8.509-3.864 2.208-14.89-8.51 3.863-2.207ZM2.985 50.6l14.91 8.52v14.534l-14.91-8.52V50.6Zm17.396 23.054V59.12l3.727-2.13v3.894a1.244 1.244 0 0 0 1.798 1.112l4.97-2.485c.421-.211.687-.641.687-1.112v-5.668l3.728-2.13v14.533l-14.91 8.52Zm45.973-31.986v25.429h-1.242V40.84l1.242.828Zm2.485 0 1.243-.828v26.257h-1.243V41.668Zm-1.242-2.158-2.218-1.479 2.218-5.914 2.218 5.914-2.218 1.48Zm0 35.042a2.488 2.488 0 0 1-2.485-2.485v-2.485h4.97v2.485a2.488 2.488 0 0 1-2.485 2.485Zm7.455-14.91h-2.485V38.519c0-.15-.026-.297-.078-.437l-3.728-9.94a1.245 1.245 0 0 0-2.328 0l-3.728 9.94c-.052.14-.078.287-.078.437v21.123H37.776V48.459a1.24 1.24 0 0 0-.626-1.079l-4.344-2.482V2.485h29.82v11.183c0 .686.556 1.242 1.243 1.242h11.183v44.732Z"
					/>
					<path
						className={s.account_type_button_img_path}
						d="M35.291 17.395h2.485v2.486h-2.485v-2.486ZM40.261 17.395h32.306v2.486H40.26v-2.486ZM70.082 22.366h2.485v2.485h-2.485v-2.485ZM35.291 22.366h32.306v2.485H35.29v-2.485ZM35.291 27.336h24.85v2.485h-24.85v-2.485ZM35.291 32.306h24.85v2.485h-24.85v-2.485Z"
					/>
				</g>
				<defs>
					<clipPath id="a">
						<path fill="#fff" d="M.5 0h80v80H.5z" />
					</clipPath>
				</defs>
			</svg>
		);
	};
	const sellMaterialsSVG = () => {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={80}
				height={80}
				className={s.account_type_button_img}
				fill="none"
			>
				<g fill="#EDF1F6">
					<path d="M51.75 58.75h5V70h-5V58.75ZM24.25 58.75h5V70h-5V58.75ZM21.75 77.5v-5a2.5 2.5 0 0 1 2.5-2.5h32.5a2.5 2.5 0 0 1 2.5 2.5v5" />
				</g>
				<path
					className={s.account_type_button_img_path}
					d="M57.936 40h1.314A3.75 3.75 0 0 0 63 36.25v-2.847a2.491 2.491 0 0 0 1.25-2.153v-5a2.5 2.5 0 0 0-2.5-2.5H60.5A20.045 20.045 0 0 0 45.437 4.385 3.75 3.75 0 0 0 41.75 1.25h-2.5a3.75 3.75 0 0 0-3.688 3.135A20.045 20.045 0 0 0 20.5 23.75h-1.25a2.5 2.5 0 0 0-2.5 2.5v5A2.491 2.491 0 0 0 18 33.403v2.847A3.75 3.75 0 0 0 21.75 40h1.314A17.5 17.5 0 0 0 33 54.538V57.5H23A16.269 16.269 0 0 0 6.75 73.75v3.75A1.25 1.25 0 0 0 8 78.75h65a1.25 1.25 0 0 0 1.25-1.25v-3.75A16.269 16.269 0 0 0 58 57.5H48v-2.962A17.5 17.5 0 0 0 57.936 40Zm1.314-2.5H58v-3.75h2.5v2.5a1.25 1.25 0 0 1-1.25 1.25ZM58 23.75h-2.5V22.5a3.75 3.75 0 0 0-3.75-3.75H45.5V6.975A17.557 17.557 0 0 1 58 23.75Zm-6.25-2.5A1.25 1.25 0 0 1 53 22.5v1.25H28V22.5a1.25 1.25 0 0 1 1.25-1.25h22.5Zm-12.5-17.5h2.5A1.25 1.25 0 0 1 43 5v13.75h-5V5a1.25 1.25 0 0 1 1.25-1.25ZM35.5 6.975V18.75h-6.25a3.75 3.75 0 0 0-3.75 3.75v1.25H23A17.558 17.558 0 0 1 35.5 6.975ZM19.25 26.25h42.5v5h-42.5v-5Zm1.25 10v-2.5H23v3.75h-1.25a1.25 1.25 0 0 1-1.25-1.25Zm5 2.5v-5h30v5a15 15 0 1 1-30 0ZM47.888 60H50.5v8.75h-20V60h2.612a7.491 7.491 0 0 0 14.776 0ZM25.5 68.75V60H28v8.75h-2.5Zm-1.25 2.5h32.5A1.25 1.25 0 0 1 58 72.5v3.75H23V72.5a1.25 1.25 0 0 1 1.25-1.25Zm31.25-2.5H53V60h2.5v8.75Zm-46.25 5A13.766 13.766 0 0 1 23 60v8.98a3.75 3.75 0 0 0-2.5 3.52v3.75H9.25v-2.5Zm62.5 0v2.5H60.5V72.5a3.75 3.75 0 0 0-2.5-3.52V60a13.766 13.766 0 0 1 13.75 13.75Zm-26.25-15a5 5 0 1 1-10 0v-3.237c3.26.983 6.74.983 10 0v3.237Z"
				/>
			</svg>
		);
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

	const {
		register: step1Register,
		handleSubmit: step1HandleSubmit,
		setValue: step1SetValue,
		formState: { errors: step1Errors },
		setError: setError1,
		clearErrors: clearErrors1,
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

	const HOST = process.env.NEXT_PUBLIC_CLIENT_HOST;

	const [selectedAccountType, setSelectedAccountType] = useState<
		'buyer' | 'seller' | null
	>(null);
	const [userData, setUserData] = useState<UserDataType>({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});
	const onSubmitStep1 = async (data: any) => {
		const { firstName, lastName, email, password, confirmPassword } = data;

		const isUserEmailUsed = await api.auth.checkIfEmailIsUsed(email);
		if (isUserEmailUsed) {
			setError1('email', {
				type: 'manual',
				message: 'That email is taken. Try another.',
			});
			return;
		}

		if (password !== confirmPassword) {
			setError1('confirmPassword', {
				type: 'manual',
				message: 'Passwords do not match',
			});
			return;
		}
		setUserData({ firstName, lastName, email, password });
		handleNextStep();
	};

	const api = Api();

	const [hideNewPassword, setHideNewPassword] = React.useState<boolean>(true);
	const [hideConfirmPassword, setHideConfirmPassword] =
		React.useState<boolean>(true);

	const {
		register: step2Register,
		handleSubmit: step2HandleSubmit,
		setValue: set2SetValue,
		setError: setError2,
		clearErrors: clearErrors2,
		getValues: getStep2Values,
		formState: { errors: step2Errors },
	} = useForm({
		defaultValues: {
			companyName: '',
			street: '',
			city: '',
			state: '',
			country: '',
			zipcode: '',
			description: '',
		},
		mode: 'onChange',
		shouldFocusError: true,
		shouldUnregister: true,
	});

	const onSubmitStep2 = async (data: any) => {
		const { companyName, street, city, state, country, zipcode } = data;
		const { firstName, lastName, email, password } = userData;
		try {
			await api.auth.registerUser({
				firstName,
				lastName,
				email,
				password,
				confirmUrl: `${HOST}/confirm-email`,
			});

			if (selectedAccountType === 'buyer') {
				await api.buyerCompany.register({
					name: companyName,
					userEmail: email,
					website: '',
					address: {
						street,
						city,
						state,
						country,
						zipcode,
					},
				});
			} else if (selectedAccountType === 'seller') {
				await api.sellerCompany.register({
					name: companyName,
					userEmail: email,
					abbreviation: '',
					website: '',
					countryProductsCertifiedFor: '',
					productCertifications: '',
					companyAddress: {
						street,
						city,
						state,
						country,
						zipcode,
					},
					factoryAddress: {
						street,
						city,
						state,
						country,
						zipcode,
					},
				});
			}
		} catch (error: any) {
			return;
		}
		handleNextStep();
		set2SetValue('street', '');
	};

	const renderStep = () => {
		switch (step) {
			case 1:
				return (
					<>
						<div className={s.account_type}>
							<div className={s.account_type_title}>Choose account type</div>
							<button
								className={s.account_type_button}
								onClick={() => handleAccountType('buyer')}
							>
								{buyMaterialsSVG()}
								<div className={s.account_type_button_text}>Buy Materials</div>
							</button>
							<button
								className={s.account_type_button}
								onClick={() => handleAccountType('seller')}
							>
								{sellMaterialsSVG()}
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
					</>
				);
			case 2:
				return (
					<>
						<form onSubmit={step1HandleSubmit(onSubmitStep1)} className={s.form}>
							<div className={s.form_title}>Tell us about yourself</div>
							<div className={s.form_input_group}>
								<div>
									<div className={s.form_two_inputs}>
										<label
											className={classNames(
												s.label,
												step1Errors.firstName && s.label_error
											)}
											htmlFor="firstName"
										>
											<input
												{...step1Register('firstName', {
													required: 'Enter first name',
												})}
												type="text"
												name="firstName"
												id={'firstName'}
												placeholder="Enter first name"
												className={s.form_input}
											/>
										</label>
										<label
											className={classNames(
												s.label,
												step1Errors.lastName && s.label_error
											)}
											htmlFor="lastName"
										>
											<input
												{...step1Register('lastName', {
													required: 'Enter last name',
												})}
												type="text"
												name="lastName"
												placeholder="Enter last name"
												className={s.form_input}
											/>
										</label>
									</div>
									<div className={s.form_two_inputs}>
										<div className={s.errorDescription_small}>
											{step1Errors.firstName && step1Errors.firstName.message}
										</div>
										{step1Errors.lastName && (
											<div className={s.errorDescription_small}>
												{step1Errors.lastName.message}
											</div>
										)}
									</div>
								</div>

								<label
									className={classNames(s.label, step1Errors.email && s.label_error)}
									htmlFor="email"
								>
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
								{step1Errors.email && (
									<div className={s.errorDescription}>
										{step1Errors.email.message}
									</div>
								)}
								<label
									className={classNames(
										s.label,
										step1Errors.password && s.label_error
									)}
									htmlFor="password"
								>
									<input
										{...step1Register('password', {
											required: 'Enter password',
											minLength: {
												value: 8,
												message: 'Password must be at least 8 characters long',
											},
											pattern: {
												value: /^(?=.*[0-9]).{8,}$/,
												message: 'Password must contain at least one number',
											},
										})}
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
								{step1Errors.password && (
									<div className={s.errorDescription}>
										{step1Errors.password.message}
									</div>
								)}

								<label
									className={classNames(
										s.label,
										step1Errors.confirmPassword && s.label_error
									)}
									htmlFor="confirmPassword"
								>
									<input
										{...step1Register('confirmPassword', {
											required: 'Enter password confirmation',
											minLength: {
												value: 8,
												message: 'Password must be at least 8 characters long',
											},
										})}
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
								{step1Errors.confirmPassword && (
									<div className={s.errorDescription}>
										{step1Errors.confirmPassword.message}
									</div>
								)}
							</div>

							<button
								className={classNames(
									s.form_button,
									Boolean(!(Object.keys(step1Errors).length > 0)) &&
										s.form_button_active
								)}
								type="submit"
								disabled={Boolean(Object.keys(step1Errors).length > 0)}
							>
								Continue
							</button>
						</form>
					</>
				);
			case 3:
				return (
					<>
						<form
							onSubmit={step2HandleSubmit(onSubmitStep2)}
							className={classNames(s.form, s.form_company)}
						>
							<div className={s.form_title}>Tell us about your company</div>
							<div className={s.form_input_group}>
								<label
									className={classNames(
										s.label,
										step2Errors.companyName && s.label_error
									)}
									htmlFor={'companyName'}
								>
									<input
										{...step2Register('companyName', {
											required: 'Enter company legal name',
										})}
										id={'companyName'}
										name="companyName"
										className={s.form_input}
										type="text"
										placeholder="Company legal name"
									/>
								</label>

								<label
									className={classNames(
										s.label,
										step2Errors.street && s.label_error
									)}
									htmlFor={'street'}
								>
									<input
										{...step2Register('street', {
											required: 'Enter company address',
										})}
										name="street"
										id={'street'}
										className={s.form_input}
										type="text"
										placeholder="Street address"
									/>
								</label>

								<div>
									<div className={s.form_two_inputs}>
										<label
											className={classNames(
												s.label,
												step2Errors.city && s.label_error
											)}
											htmlFor={'city'}
										>
											<input
												{...step2Register('city', {
													required: 'Enter city',
												})}
												name="city"
												id={'city'}
												className={s.form_input}
												type="text"
												placeholder="City"
											/>
										</label>

										<label
											className={classNames(
												s.label,
												step2Errors.state && s.label_error
											)}
											htmlFor={'state'}
										>
											<input
												{...step2Register('state', {
													required: 'Enter state/province',
												})}
												name="state"
												id={'state'}
												className={s.form_input}
												type="text"
												placeholder="State / Province"
											/>
										</label>
									</div>
									<div className={s.form_two_inputs}>
										<div className={s.errorDescription_small}>
											{step2Errors.city && step2Errors.city.message}
										</div>
										{step2Errors.state && (
											<div className={s.errorDescription_small}>
												{step2Errors.state.message}
											</div>
										)}
									</div>
								</div>

								<div>
									<div className={s.form_two_inputs}>
										<label
											className={classNames(
												s.dropdown_wrapper,
												step2Errors.country && s.dropdown_error
											)}
											htmlFor={'country'}
										>
											<select
												className={
													selectedCountry === 'Select Country'
														? classNames(
																s.dropdown_label,
																s.dropdown_label_placeholder
														  )
														: s.dropdown_label
												}
												{...step2Register('country', {
													required: 'Select country',
													validate: (value) => value !== 'Select Country',
												})}
												value={selectedCountry}
												id="beneficiaryCountry"
												onChange={(e) => {
													clearErrors2('country');
													handleCountryChange(e);
												}}
											>
												<option
													className={s.dropdown_label_placeholder}
													value="Select Country"
													disabled
													selected
												>
													Select Country
												</option>
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

										<label
											className={classNames(
												s.label,
												step2Errors.zipcode && s.label_error
											)}
											htmlFor={'zipcode'}
										>
											<input
												{...step2Register('zipcode', {
													required: 'Enter zip code',
												})}
												name="zipcode"
												id={'zipcode'}
												className={classNames(s.form_input, s.form_input_zip)}
												type="text"
												placeholder="Zip code"
											/>
										</label>
									</div>

									<div className={s.form_two_inputs}>
										<div className={s.errorDescription_small}>
											{step2Errors.country && step2Errors.country.message}
										</div>
										{step2Errors.zipcode && (
											<div className={s.errorDescription_small}>
												{step2Errors.zipcode.message}
											</div>
										)}
									</div>
								</div>

								<div className={s.form_input_group_small}>
									<div className={s.form_title_small}>
										Please briefly describe your business
									</div>
									<label
										className={classNames(
											s.label,
											step2Errors.description && s.label_error
										)}
										htmlFor={'description'}
									>
										<input
											{...step2Register('description', {
												required: 'Enter description',
											})}
											name="description"
											id={'description'}
											className={s.form_input}
										/>
									</label>
									{step2Errors.description && (
										<div className={s.errorDescription}>
											{step2Errors.description.message}
										</div>
									)}
								</div>
							</div>

							<div className={s.form_input_group}>
								<button
									className={classNames(
										s.form_button,
										Boolean(!(Object.keys(step2Errors).length > 0)) &&
											s.form_button_active
									)}
									type="submit"
									disabled={Boolean(Object.keys(step2Errors).length > 0)}
								>
									Submit Application
								</button>

								<div className={s.form_disclaimer}>
									By submitting application, you agree to Suphub's{' '}
									<a className={s.form_disclaimer_link}>Terms and Conditions</a> and{' '}
									<a className={s.form_disclaimer_link}>Privacy Policy</a>
								</div>
							</div>
						</form>
					</>
				);
			case 4:
				return (
					<>
						<div className={s.success}>
							<Image
								src={check_success}
								alt="check icon"
								className={s.success_img}
							/>
							<div className={s.success_title}>
								Thank you for submitting an application
							</div>
							<div className={s.success_text}>
								We will send you an email within 24 hours
							</div>
						</div>
					</>
				);
			default:
				return null;
		}
	};

	function fillUserData() {
		step1SetValue('firstName', userData.firstName);
		step1SetValue('lastName', userData.lastName);
		step1SetValue('email', userData.email);
		step1SetValue('password', userData.password);
		step1SetValue('confirmPassword', userData.password);
	}

	function handlePrevStep() {
		if (step === 3) {
			fillUserData();
			setPreviousValuesOfCompanyInfoInCaseYouWentBackAndForth({
				wasReturnedToUser: true,
				companyInfo: getStep2Values(),
			});
		}
		if (step > 1) {
			setStep((prev: number) => prev - 1);
		}
	}

	function handleAccountType(type: 'buyer' | 'seller') {
		setSelectedAccountType(type);
		handleNextStep();
	}

	function handleNextStep() {
		if (
			step === 2 &&
			previousValuesOfCompanyInfoInCaseYouWentBackAndForth.wasReturnedToUser
		) {
			const { companyInfo } = previousValuesOfCompanyInfoInCaseYouWentBackAndForth;
			if (companyInfo !== undefined) {
				if (
					typeof companyInfo.companyName === 'string' &&
					companyInfo.companyName.trim() !== ''
				) {
					set2SetValue('companyName', companyInfo.companyName);
				}
				if (
					typeof companyInfo.street === 'string' &&
					companyInfo.street.trim() !== ''
				) {
					set2SetValue('street', companyInfo.street);
				} else {
					set2SetValue('street', '');
				}
				if (typeof companyInfo.city === 'string' && companyInfo.city.trim() !== '') {
					set2SetValue('city', companyInfo.city);
				}
				if (
					typeof companyInfo.state === 'string' &&
					companyInfo.state.trim() !== ''
				) {
					set2SetValue('state', companyInfo.state);
				}
				if (
					typeof companyInfo.country === 'string' &&
					companyInfo.country.trim() !== ''
				) {
					set2SetValue('country', companyInfo.country);
				}
				if (
					typeof companyInfo.zipcode === 'string' &&
					companyInfo.zipcode.trim() !== ''
				) {
					set2SetValue('zipcode', companyInfo.zipcode);
				}
				if (
					typeof companyInfo.description === 'string' &&
					companyInfo.description.trim() !== ''
				) {
					set2SetValue('description', companyInfo.description);
				}
			}
			setPreviousValuesOfCompanyInfoInCaseYouWentBackAndForth({});
		}
		setStep((prev: number) => prev + 1);
	}

	const topBar = () => (
		<div className={s.content_top_bar}>
			{step !== 1 && step !== 4 && (
				<div onClick={handlePrevStep} className={s.content_top_bar_back_btn}>
					<Image src={back_btn} alt="back_btn" width={22} height={22} />
				</div>
			)}
			{step === 4 && <h3 className={s.content_top_bar_text}>{''}</h3>}
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
