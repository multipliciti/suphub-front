'use client';
import s from '../CompanyInfoStyle.module.scss';
import { classNames } from '@/utils/classNames';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import modal_close from '@/imgs/close.svg';
import plus_sign from '@/imgs/ProfileSettings/plus_sign.svg';
import big_cross from '@/imgs/ProfileSettings/big_cross.svg';
import logo_placeholder from '@/imgs/ProfileSettings/logo_placeholder.svg';
import file_icon from '@/imgs/ProfileSettings/file_icon.svg';
import Image from 'next/image';
import { Api } from '@/services';
import { RemoveCertification, UpdateSellerCompany } from '@/types/services/company';
import { useAppSelector } from '@/redux/hooks';

const SellerCompanyInfo = () => {
	const api = Api();
	const [
		isFactoryAddressSameAsCompanyAddress,
		setIsFactoryAddressSameAsCompanyAddress,
	] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			logo: '',
			businessCertification: [],
			factoryCertifications: [],
			countryProductsCertifiedFor: '',
			productCertifications: '',
			companyStreet: '',
			companyCity: '',
			companyState: '',
			companyCountry: '',
			companyZipCode: '',
			factoryStreet: '',
			factoryCity: '',
			factoryState: '',
			factoryCountry: '',
			factoryZipCode: '',
		},
		mode: 'onChange',
		shouldFocusError: true,
		shouldUnregister: true,
	});

	const sellerCompany = useAppSelector((state) => state.authSlice.sellerCompany);

	const [logoSrc, setLogoSrc] = useState(null);
	const [previewLogo, setPreviewLogo] = useState<string | null>(null);

	const [addCountryInput, setAddCountryInput] = useState<string>('');
	const [addCertificationInput, setAddCertificationInput] = useState<string>('');

	const [countryProductsCertifiedFor, setProductsCertifiedFor] = useState<string[]>(
		[]
	);
	const [productCertifications, setProductCertifications] = useState<string[]>([]);

	const [businessCertificationFiles, setBusinessCertificationFiles] = useState<any>(
		[]
	);
	const [factoryCertificationFiles, setFactoryCertificationFiles] = useState<any>(
		[]
	);

	const [
		initiallyFetchedBusinessCertificationFiles,
		setInitiallyFetchedBusinessCertificationFiles,
	] = useState<any>([]);
	const [
		initiallyFetchedFactoryCertificationFiles,
		setInitiallyFetchedFactoryCertificationFiles,
	] = useState<any>([]);

	const [submitClicked, setSubmitClicked] = useState<boolean>(false);

	const setFactoryAddressIsNotTheSameAsCompanyAddressAnymore = () => {
		const companyStreet = getValues('companyStreet');
		setValue('factoryStreet', companyStreet);
		const companyCity = getValues('companyCity');
		setValue('factoryCity', companyCity);
		const companyState = getValues('companyState');
		setValue('factoryState', companyState);
		const companyCountry = getValues('companyCountry');
		setValue('factoryCountry', companyCountry);
		const companyZipCode = getValues('companyZipCode');
		setValue('factoryZipCode', companyZipCode);
	};

	const setFactoryAddressVisuallyWhenSameAsCompanyAddress = () => {
		setValue('factoryStreet', 'Same as Factory Street');
		setValue('factoryCity', 'Same as Factory City');
		setValue('factoryState', 'Same as Factory State');
		setValue('factoryCountry', 'Same as Factory Country');
		setValue('factoryZipCode', 'Same as Factory Zip Code');
		clearErrors('factoryStreet');
		clearErrors('factoryCity');
		clearErrors('factoryState');
		clearErrors('factoryCountry');
		clearErrors('factoryZipCode');
	};
	const isFactoryAddressSameAsCompanyAddressHandler = () => {
		if (isFactoryAddressSameAsCompanyAddress)
			setFactoryAddressIsNotTheSameAsCompanyAddressAnymore();
		else setFactoryAddressVisuallyWhenSameAsCompanyAddress();
		setIsFactoryAddressSameAsCompanyAddress(!isFactoryAddressSameAsCompanyAddress);
	};

	const handleLogoChange = (event: React.ChangeEvent<any>) => {
		clearErrors('logo');
		const file: any = event.target.files[0];
		if (file.size / 1024 / 1024 > 2) {
			setError('logo', { message: 'File uploads must be under 2MB in size' });
			setTimeout(() => {
				clearErrors('logo');
			}, 5000);
			return;
		}
		if (file) {
			setLogoSrc(file);
			setPreviewLogo(URL.createObjectURL(file));
		}
	};

	const handleAddCertification = () => {
		const trimmedInput = addCertificationInput.trim().toLowerCase();

		if (
			productCertifications.some(
				(certification) => certification.trim().toLowerCase() === trimmedInput
			)
		) {
			setError('productCertifications', {
				message: 'This certification already exists',
			});
			setTimeout(() => {
				clearErrors('productCertifications');
			}, 5000);
		} else if (trimmedInput?.length === 0) {
			setError('productCertifications', {
				message: 'Certification cannot be empty',
			});
			setTimeout(() => {
				clearErrors('productCertifications');
			}, 5000);
		} else {
			setProductCertifications((prev: string[]) => [...prev, addCertificationInput]);
			setAddCertificationInput('');
		}
	};

	const handeRemoveCertification = (certificationNameToRemove: string) => {
		setProductCertifications((prev: string[]) =>
			prev.filter((certification) => certification !== certificationNameToRemove)
		);
	};

	const handleAddCountryCertification = () => {
		const trimmedInput = addCountryInput.trim().toLowerCase();

		if (
			countryProductsCertifiedFor.some(
				(certification) => certification.trim().toLowerCase() === trimmedInput
			)
		) {
			setError('countryProductsCertifiedFor', {
				message: 'This certification already exists',
			});
			setTimeout(() => {
				clearErrors('countryProductsCertifiedFor');
			}, 5000);
		} else if (trimmedInput?.length === 0) {
			setError('countryProductsCertifiedFor', {
				message: 'Country certification cannot be empty',
			});
			setTimeout(() => {
				clearErrors('countryProductsCertifiedFor');
			}, 5000);
		} else {
			setProductsCertifiedFor((prev: string[]) => [...prev, addCountryInput]);
			setAddCountryInput('');
		}
	};

	const handleRemoveCountryCertification = (certificationNameToRemove: string) => {
		setProductsCertifiedFor((prev: string[]) =>
			prev.filter((certification) => certification !== certificationNameToRemove)
		);
	};

	const handleBusinessCertificationFiles = (event: React.ChangeEvent<any>) => {
		clearErrors('businessCertification');
		const newFiles = Array.from(event.target.files);

		for (let i = 0; i < newFiles?.length; i++) {
			const file: any = newFiles[i];
			if (file.size / 1024 / 1024 > 2) {
				setError('businessCertification', {
					message: 'File uploads must be under 2MB in size',
				});
				setTimeout(() => {
					clearErrors('businessCertification');
				}, 5000);
				return;
			}
		}

		setBusinessCertificationFiles((prevFiles: any[]) => [
			...(prevFiles ?? []),
			...newFiles,
		]);
	};
	const handleFactoryCertificationFiles = (event: React.ChangeEvent<any>) => {
		clearErrors('factoryCertifications');
		const newFiles = Array.from(event.target.files);

		for (let i = 0; i < newFiles?.length; i++) {
			const file: any = newFiles[i];
			if (file.size / 1024 / 1024 > 2) {
				setError('factoryCertifications', {
					message: ' File uploads must be under 2MB in size',
				});
				setTimeout(() => {
					clearErrors('factoryCertifications');
				}, 5000);
				return;
			}
		}

		setFactoryCertificationFiles((prevFiles: any[]) => [
			...(prevFiles ?? []),
			...newFiles,
		]);
	};

	const handleRemoveBusinessCertificationFiles = (index: any) => {
		setBusinessCertificationFiles((prevFiles: any) =>
			prevFiles.filter((_: any, i: any) => i !== index)
		);
	};
	const handleRemoveFactoryCertificationFiles = (index: any) => {
		setFactoryCertificationFiles((prevFiles: any) =>
			prevFiles.filter((_: any, i: any) => i !== index)
		);
	};

	useEffect(() => {
		const fetch = async () => {
			const name = sellerCompany?.name;
			const logo = sellerCompany?.logo;
			const businessCertifications = sellerCompany?.businessCertifications;
			const factoryCertifications = sellerCompany?.factoryCertifications;
			const countryProductsCertifiedFor = sellerCompany?.countryProductsCertifiedFor;
			const productCertifications = sellerCompany?.productCertifications;
			const companyAddress = sellerCompany?.companyAddress;
			const factoryAddress = sellerCompany?.factoryAddress;

			setValue('name', name ?? '');
			setValue('companyStreet', companyAddress?.street ?? '');
			setValue('companyCity', companyAddress?.city ?? '');
			setValue('companyState', companyAddress?.state ?? '');
			setValue('companyCountry', companyAddress?.country ?? '');
			setValue('companyZipCode', companyAddress?.zipcode ?? '');
			setValue('factoryStreet', factoryAddress?.street ?? '');
			setValue('factoryCity', factoryAddress?.city ?? '');
			setValue('factoryState', factoryAddress?.state ?? '');
			setValue('factoryCountry', factoryAddress?.country ?? '');
			setValue('factoryZipCode', factoryAddress?.zipcode ?? '');
			setProductsCertifiedFor(
				countryProductsCertifiedFor ? countryProductsCertifiedFor.split(',') : []
			);
			setProductCertifications(
				productCertifications ? productCertifications.split(',') : []
			);
			setBusinessCertificationFiles(businessCertifications || []);
			setFactoryCertificationFiles(factoryCertifications || []);
			setInitiallyFetchedBusinessCertificationFiles(businessCertifications || []);
			setInitiallyFetchedFactoryCertificationFiles(factoryCertifications || []);
			setPreviewLogo(logo ? logo.url : null);
		};
		fetch();
	}, [sellerCompany]);

	const onSubmit: SubmitHandler<any> = async (data) => {
		setSubmitClicked(true);
		const form: UpdateSellerCompany = {};

		const companyAddress: any = {
			street: data.companyStreet,
			city: data.companyCity,
			state: data.companyState,
			country: data.companyCountry,
			zipcode: data.companyZipCode,
		};

		const factoryAddress: any = {
			street: data?.factoryStreet,
			city: data?.factoryCity,
			state: data?.factoryState,
			country: data?.factoryCountry,
			zipcode: data?.factoryZipCode,
		};

		form['name'] = data.name;
		form['countryProductsCertifiedFor'] = countryProductsCertifiedFor.join(',');
		form['productCertifications'] = productCertifications.join(',');
		form['companyAddress'] = companyAddress;
		if (isFactoryAddressSameAsCompanyAddress) {
			form['factoryAddress'] = companyAddress;
		} else {
			form['factoryAddress'] = factoryAddress;
		}

		if (sellerCompany?.id) {
			const responseForm = await api.sellerCompany.update(sellerCompany?.id, form);
			if (responseForm.status !== 200) return;
		}

		if (logoSrc) {
			const formData = new FormData();
			formData.append('file', logoSrc);
			const responseLogo = await api.sellerCompany.uploadLogo(formData);
			if (responseLogo.status !== 201) return;
		}

		const deletedBusinessIds: number[] = [];
		const deletedFactoryIds: number[] = [];

		const businessCertificationIds = new Set(
			businessCertificationFiles
				.filter((file: any) => file && file?.id !== null && file?.id !== undefined)
				.map((file: any) => file.id)
		);

		const factoryCertificationIds = new Set(
			factoryCertificationFiles
				.filter((file: any) => file && file?.id !== null && file?.id !== undefined)
				.map((file: any) => file.id)
		);

		initiallyFetchedBusinessCertificationFiles.forEach((file: any) => {
			if (file && file?.id && !businessCertificationIds.has(file?.id)) {
				deletedBusinessIds.push(file.id);
			}
		});

		initiallyFetchedFactoryCertificationFiles.forEach((file: any) => {
			if (file && file?.id && !factoryCertificationIds.has(file?.id)) {
				deletedFactoryIds.push(file.id);
			}
		});

		if ((deletedBusinessIds ?? []).length > 0) {
			const data: RemoveCertification = {};
			data.type = 'business';
			data.fileIds = deletedBusinessIds;
			const responseDeleteBusiness =
				await api.sellerCompany.removeCertification(data);
			if (responseDeleteBusiness.status !== 200) return;
		}

		if ((deletedFactoryIds ?? []).length > 0) {
			const data: RemoveCertification = {};
			data.type = 'factory';
			data.fileIds = deletedFactoryIds;
			const responseDeleteFactory =
				await api.sellerCompany.removeCertification(data);
			if (responseDeleteFactory.status !== 200) return;
		}

		const formDataBusiness: FormData = new FormData();
		const formDataFactory: FormData = new FormData();
		if (businessCertificationFiles && businessCertificationFiles.length > 0) {
			formDataBusiness.append('type', 'business');
			businessCertificationFiles.forEach((file: any) => {
				const fileExists = initiallyFetchedBusinessCertificationFiles.some(
					(initialFile: any) => initialFile && initialFile?.id === file?.id
				);
				if (!fileExists) {
					formDataBusiness.append('files', file);
				}
			});

			if (formDataBusiness.has('files')) {
				const responseBusiness =
					await api.sellerCompany.uploadCertification(formDataBusiness);
				if (responseBusiness.status !== 201) {
					return;
				}
			}
		}

		if (factoryCertificationFiles && factoryCertificationFiles.length > 0) {
			formDataFactory.append('type', 'factory');
			factoryCertificationFiles.forEach((file: any) => {
				const fileExists = initiallyFetchedFactoryCertificationFiles.some(
					(initialFile: any) => initialFile && initialFile?.id === file?.id
				);
				if (!fileExists) {
					formDataFactory.append('files', file);
				}
			});

			if (formDataFactory.has('files')) {
				const responseFactory =
					await api.sellerCompany.uploadCertification(formDataFactory);
				if (responseFactory.status !== 201) {
					return;
				}
			}
		}

		setSubmitClicked(false);
		window.location.reload();
	};

	return (
		<form className={s.form} onSubmit={handleSubmit(onSubmit)} noValidate>
			<div className={s.heading}>
				<h5 className={s.title_main}>Company Info</h5>
				<button
					className={classNames(
						s.btn_send,
						Boolean(!(Object.keys(errors)?.length > 0)) && s.btn_send_active
					)}
					disabled={Boolean(Object.keys(errors)?.length > 0) || submitClicked}
					type={'submit'}
				>
					Save Changes
				</button>
			</div>
			<div className={s.settings}>
				<div className={s.title_general}>General Info</div>
				<div className={s.row}>
					<p className={s.title}>Company Legal Name</p>
					<label className={s.label} htmlFor="name">
						<input
							className={s.input}
							{...register('name', {
								required: 'Please enter the company name.',
							})}
							placeholder="Enter company legal name"
							type="text"
							id="name"
						/>
					</label>
				</div>
				{errors.name && (
					<div className={s.row_nogap}>
						<p></p>
						<p className={s.errorDescription}>{errors.name?.message}</p>
					</div>
				)}
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>Logo</p>
					<div className={s.logo_wrapper}>
						<label htmlFor="logoInput">
							{previewLogo ? (
								<Image
									alt={'Logo placeholder'}
									className={s.logo}
									width={80}
									height={80}
									src={previewLogo}
								/>
							) : (
								<Image
									alt={'Logo placeholder'}
									className={s.logo_placeholder}
									src={logo_placeholder}
								/>
							)}
							<input
								{...register('logo')}
								type="file"
								id="logoInput"
								className={s.hidden_input}
								onChange={handleLogoChange}
							/>
						</label>
					</div>
				</div>
				{errors.logo && (
					<div className={s.row_nogap}>
						<p></p>
						<p className={s.errorDescription}>{errors.logo?.message}</p>
					</div>
				)}
			</div>
			<div className={s.settings}>
				<div className={s.title_general}>Files</div>
				<div
					className={
						businessCertificationFiles?.length > 0 ? s.row_align_start : s.row
					}
				>
					<p className={s.title}>Business certification</p>
					<div className={s.files_wrapper}>
						{businessCertificationFiles?.length > 0 &&
							businessCertificationFiles.map((file: any, index: number) => (
								<div key={index} className={s.upload_row}>
									<div className={s.upload_filename}>
										{file?.name || 'File Name Missing'}
										<span className={s.upload_filename_size}>
											{file?.size ? (file.size / 1024 / 1024).toFixed(2) : 0} Mb
										</span>
									</div>
									<span
										onClick={() => handleRemoveBusinessCertificationFiles(index)}
									>
										<Image
											src={big_cross}
											alt={'big_cross'}
											className={s.upload_close}
										/>
									</span>
								</div>
							))}
						<label htmlFor={'businessFileInput'}>
							<div className={s.upload_button}>
								<Image alt={'Upload Button'} src={file_icon} />
								Upload files
							</div>
							<input
								{...register('businessCertification')}
								accept=".jpg, .jpeg, .png, .pdf"
								type="file"
								id="businessFileInput"
								className={s.hidden_input}
								onChange={handleBusinessCertificationFiles}
								multiple
							/>
						</label>
					</div>
				</div>
				{errors.businessCertification && (
					<div className={s.row_nogap}>
						<p></p>
						<p className={s.errorDescription}>
							{errors.businessCertification?.message}
						</p>
					</div>
				)}
				<div className={s.separator}></div>
				<div
					className={
						factoryCertificationFiles?.length > 0 ? s.row_align_start : s.row
					}
				>
					<p className={s.title}>Factory certifications</p>
					<div className={s.files_wrapper}>
						{factoryCertificationFiles?.length > 0 &&
							factoryCertificationFiles.map((file: any, index: number) => (
								<div key={index} className={s.upload_row}>
									<div className={s.upload_filename}>
										{file?.name || 'File Name Missing'}
										<span className={s.upload_filename_size}>
											{file?.size ? (file.size / 1024 / 1024).toFixed(2) : 0} Mb
										</span>
									</div>
									<span onClick={() => handleRemoveFactoryCertificationFiles(index)}>
										<Image
											src={big_cross}
											alt={'big_cross'}
											className={s.upload_close}
										/>
									</span>
								</div>
							))}
						<label htmlFor={'factoryFileInput'}>
							<div className={s.upload_button}>
								<Image alt={'Upload Button'} src={file_icon} />
								Upload files
							</div>
							<input
								{...register('factoryCertifications')}
								type="file"
								id="factoryFileInput"
								className={s.hidden_input}
								onChange={handleFactoryCertificationFiles}
								multiple
							/>
						</label>
					</div>
				</div>
				{errors.factoryCertifications && (
					<div className={s.row_nogap}>
						<p></p>
						<p className={s.errorDescription}>
							{errors.factoryCertifications?.message}
						</p>
					</div>
				)}
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>Products certified for</p>
					<div className={s.tag_wrapper_countries}>
						{countryProductsCertifiedFor.map((product, index) => (
							<div className={s.tag} key={index}>
								<p>{product}</p>
								<Image
									alt="close"
									className={s.tag_close}
									src={modal_close}
									onClick={() => handleRemoveCountryCertification(product)}
								/>
							</div>
						))}
						<div className={s.tag_add}>
							<Image
								alt={'add product'}
								src={plus_sign}
								onClick={handleAddCountryCertification}
							/>
							<input
								className={classNames(s.input_certification, s.width_smaller)}
								value={addCountryInput}
								onChange={(e) => {
									setAddCountryInput(e.target.value);
								}}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										e.preventDefault();
										handleAddCountryCertification();
									}
								}}
								placeholder={'Add country'}
							/>
						</div>
					</div>
				</div>
				{errors.countryProductsCertifiedFor && (
					<div className={s.row_nogap}>
						<p></p>
						<p className={s.errorDescription}>
							{errors.countryProductsCertifiedFor?.message}
						</p>
					</div>
				)}
				<div className={s.separator}></div>

				<div className={s.row}>
					<p className={s.title}>Product certifications</p>
					<div className={s.tag_wrapper}>
						{productCertifications.map((product, index) => (
							<div className={s.tag} key={index}>
								<p>{product}</p>
								<Image
									alt={'Add product Certification'}
									className={s.tag_close}
									src={modal_close}
									onClick={() => handeRemoveCertification(product)}
								/>
							</div>
						))}
						<div className={s.tag_add}>
							<Image
								alt="add product certification"
								src={plus_sign}
								onClick={handleAddCertification}
							/>
							<input
								className={classNames(s.input_certification, s.width_bigger)}
								value={addCertificationInput}
								onChange={(e) => {
									setAddCertificationInput(e.target.value);
								}}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										e.preventDefault();
										handleAddCertification();
									}
								}}
								placeholder={'Add certification'}
							/>
						</div>
					</div>
				</div>

				{errors.productCertifications && (
					<div className={s.row_nogap}>
						<p></p>
						<p className={s.errorDescription}>
							{errors.productCertifications?.message}
						</p>
					</div>
				)}
			</div>
			<div className={s.settings}>
				<div className={s.title_general}>Company Address</div>
				<div className={s.row}>
					<p className={s.title}>Street address</p>
					<label className={s.label} htmlFor="companyStreet">
						<input
							className={s.input}
							{...register('companyStreet', {
								required: 'Please provide the street address',
							})}
							placeholder="Enter street address"
							type="text"
							id="companyStreet"
						/>
					</label>
				</div>
				{errors.companyStreet && (
					<div className={s.row_nogap}>
						<p></p>
						<p className={s.errorDescription}>{errors.companyStreet?.message}</p>
					</div>
				)}
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>City</p>
					<label className={s.label} htmlFor="companyCity">
						<input
							className={s.input}
							{...register('companyCity', { required: 'Please fill in the city' })}
							placeholder="Enter city"
							type="text"
							id="companyCity"
						/>
					</label>
				</div>
				{errors.companyCity && (
					<div className={s.row_nogap}>
						<p></p>
						<p className={s.errorDescription}>{errors.companyCity?.message}</p>
					</div>
				)}
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>State / Province</p>
					<label className={s.label} htmlFor="companyState">
						<input
							className={s.input}
							{...register('companyState', {
								required: 'Please specify the state',
							})}
							placeholder="Enter state / Province"
							type="text"
							id="companyState"
						/>
					</label>
				</div>
				{errors.companyState && (
					<div className={s.row_nogap}>
						<p></p>
						<p className={s.errorDescription}>{errors.companyState?.message}</p>
					</div>
				)}
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>Country</p>
					<label className={s.label} htmlFor="companyCountry">
						<input
							className={s.input}
							{...register('companyCountry', {
								required: 'Please indicate the country',
							})}
							placeholder="Enter Country"
							type="text"
							id="companyCountry"
						/>
					</label>
				</div>
				{errors.companyCountry && (
					<div className={s.row_nogap}>
						<p></p>
						<p className={s.errorDescription}>{errors.companyCountry?.message}</p>
					</div>
				)}
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>Zip Code</p>
					<label className={s.label} htmlFor="companyZipCode">
						<input
							className={s.input}
							{...register('companyZipCode', {
								required: 'Please input the ZIP code',
							})}
							placeholder="Enter Zip Code"
							type="text"
							id="companyZipCode"
						/>
					</label>
				</div>
				{errors.companyZipCode && (
					<div className={s.row_nogap}>
						<p></p>
						<p className={s.errorDescription}>{errors.companyZipCode?.message}</p>
					</div>
				)}
			</div>
			<div className={s.settings}>
				<div className={s.row}>
					<div className={s.title_general}>Factory Address (Ship from)</div>
					<div className={s.checkbox}>
						<input
							type="checkbox"
							id={'sameAsCompanyAddress'}
							name={'sameAsCompanyAddress'}
							checked={isFactoryAddressSameAsCompanyAddress}
							onClick={isFactoryAddressSameAsCompanyAddressHandler}
						/>
						<label htmlFor={'sameAsCompanyAddress'}>Same as Company Address</label>
					</div>
				</div>
				<div className={s.row}>
					<p className={s.title}>Street address</p>
					<label
						className={classNames(
							s.label,
							isFactoryAddressSameAsCompanyAddress && s.label_disabled
						)}
						htmlFor="factoryStreet"
					>
						<input
							className={s.input}
							{...register('factoryStreet', {
								required: 'Please provide the street address',
							})}
							placeholder="Enter street address"
							type="text"
							id="factoryStreet"
							disabled={isFactoryAddressSameAsCompanyAddress}
						/>
					</label>
				</div>
				{!isFactoryAddressSameAsCompanyAddress && errors.factoryStreet && (
					<div className={s.row_nogap}>
						<p></p>
						<p className={s.errorDescription}>{errors.factoryStreet?.message}</p>
					</div>
				)}
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>City</p>
					<label
						className={classNames(
							s.label,
							isFactoryAddressSameAsCompanyAddress && s.label_disabled
						)}
						htmlFor="factoryCity"
					>
						<input
							className={s.input}
							{...register('factoryCity', { required: 'Please fill in the city' })}
							placeholder="Enter city"
							type="text"
							id="factoryCity"
							disabled={isFactoryAddressSameAsCompanyAddress}
						/>
					</label>
				</div>
				{!isFactoryAddressSameAsCompanyAddress && errors.factoryCity && (
					<div className={s.row_nogap}>
						<p></p>
						<p className={s.errorDescription}>{errors.factoryCity?.message}</p>
					</div>
				)}
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>State / Province</p>
					<label
						className={classNames(
							s.label,
							isFactoryAddressSameAsCompanyAddress && s.label_disabled
						)}
						htmlFor="factoryState"
					>
						<input
							className={s.input}
							{...register('factoryState', {
								required: 'Please specify the state',
							})}
							placeholder="Enter state / Province"
							type="text"
							id="factoryState"
							disabled={isFactoryAddressSameAsCompanyAddress}
						/>
					</label>
				</div>
				{!isFactoryAddressSameAsCompanyAddress && errors.factoryState && (
					<div className={s.row_nogap}>
						<p></p>
						<p className={s.errorDescription}>{errors.factoryState?.message}</p>
					</div>
				)}
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>Country</p>
					<label
						className={classNames(
							s.label,
							isFactoryAddressSameAsCompanyAddress && s.label_disabled
						)}
						htmlFor="factoryCountry"
					>
						<input
							className={s.input}
							{...register('factoryCountry', {
								required: 'Please indicate the country',
							})}
							placeholder="Enter Country"
							type="text"
							id="factoryCountry"
							disabled={isFactoryAddressSameAsCompanyAddress}
						/>
					</label>
				</div>
				{!isFactoryAddressSameAsCompanyAddress && errors.factoryCountry && (
					<div className={s.row_nogap}>
						<p></p>
						<p className={s.errorDescription}>{errors.factoryCountry?.message}</p>
					</div>
				)}
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>Zip Code</p>
					<label
						className={classNames(
							s.label,
							isFactoryAddressSameAsCompanyAddress && s.label_disabled
						)}
						htmlFor="factoryZipCode"
					>
						<input
							className={s.input}
							{...register('factoryZipCode', {
								required: 'Please input the ZIP code',
							})}
							placeholder="Enter Zip Code"
							type="text"
							id="factoryZipCode"
							disabled={isFactoryAddressSameAsCompanyAddress}
						/>
					</label>
				</div>
				{!isFactoryAddressSameAsCompanyAddress && errors.factoryZipCode && (
					<div className={s.row_nogap}>
						<p></p>
						<p className={s.errorDescription}>{errors.factoryZipCode?.message}</p>
					</div>
				)}
			</div>
		</form>
	);
};

export default SellerCompanyInfo;
