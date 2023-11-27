'use client';
import s from './BusinessVerification.module.scss';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { classNames } from '@/utils/classNames';
import { Api } from '@/services';
import modal_close from '@/imgs/close.svg';
import file_icon from '@/imgs/ProfileSettings/file_icon.svg';
import check_icon from '@/imgs/Buyer&Seller/SellerVerification/radio-button-check.svg';
import { RemoveCertification, UpdateSellerCompany } from '@/types/services/company';
import big_cross from '@/imgs/ProfileSettings/big_cross.svg';
import plus_sign from '@/imgs/ProfileSettings/plus_sign.svg';

export const BusinessVerification = () => {
	const api = Api();
	const dispatch = useAppDispatch();

	const [companyId, setCompanyId] = useState<number>(0);

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

	const [isBusinessCertificationChecked, setIsBusinessCertificationChecked ] = useState<boolean>(false)
	const [isFactoryCertificationChecked, setIsFactoryCertificationChecked] = useState<boolean>(false)
	const [isProductCertificationsChecked, setIsProductCertificationsChecked] = useState<boolean>(false)


	const [submitClicked, setSubmitClicked] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		setError,
		reset,
		clearErrors,
		formState: { errors, touchedFields },
	} = useForm({
		defaultValues: {
			businessCertification: [],
			factoryCertifications: [],
			countryProductsCertifiedFor: '',
			productCertifications: '',
		},
		mode: 'onChange',
		shouldFocusError: true,
		shouldUnregister: true,
	});

	function shorterString(inputString:string) {
		const maxLength = 37;

		if (inputString.length > maxLength) {
			const truncatedString = inputString.substring(0, 34);
			const fileType = inputString.substring(inputString.lastIndexOf('.') + 1);
			return `${truncatedString} ... .${fileType}`;
		}

		return inputString;
	}


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

		console.log(trimmedInput, countryProductsCertifiedFor)

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




	const closeModal = () => {
		dispatch(setModal(''));
		dispatch(setModal(''));
		reset();
	};

	useEffect(() => {
		const fetch = async () => {
		const userResponse = await api.auth.getUser();
			const { data: { sellerCompanyId } } = userResponse;
			setCompanyId(sellerCompanyId);
		const response = await api.sellerCompany.getById(sellerCompanyId);
		const {
			businessCertifications,
			factoryCertifications,
			countryProductsCertifiedFor,
			productCertifications,
		} = response.data;

		setIsBusinessCertificationChecked(!!businessCertifications?.length);
		setIsFactoryCertificationChecked(!!factoryCertifications?.length);
		setIsProductCertificationsChecked(
			!!countryProductsCertifiedFor?.length || !!productCertifications?.length);

		setInitiallyFetchedBusinessCertificationFiles(businessCertifications || []);
		setInitiallyFetchedFactoryCertificationFiles(factoryCertifications || []);
		setBusinessCertificationFiles(businessCertifications || []);
		setFactoryCertificationFiles(factoryCertifications || []);
		setProductsCertifiedFor(
			countryProductsCertifiedFor ? countryProductsCertifiedFor.split(',') : []
		);
		setProductCertifications(
			productCertifications ? productCertifications.split(',') : []);

	};
	fetch();
}, []);

	const onSubmit: SubmitHandler<any> = async (data) => {
		setSubmitClicked(true);
		const form: UpdateSellerCompany = {};

		form['countryProductsCertifiedFor'] = countryProductsCertifiedFor.join(',');
		form['productCertifications'] = productCertifications.join(',');

		const responseForm = await api.sellerCompany.update(companyId, form);
		if (responseForm.status !== 200) return;

		const deletedFactoryIds: number[] = [];
		const deletedBusinessIds: number[] = [];

		const factoryCertificationIds = new Set(
			factoryCertificationFiles
				.filter((file: any) => file && file?.id !== null && file?.id !== undefined)
				.map((file: any) => file.id)
		);

		const businessCertificationIds = new Set(
			businessCertificationFiles
				.filter((file: any) => file && file?.id !== null && file?.id !== undefined)
				.map((file: any) => file.id)
		);

		initiallyFetchedFactoryCertificationFiles.forEach((file: any) => {
			if (file && file?.id && !factoryCertificationIds.has(file?.id)) {
				deletedFactoryIds.push(file.id);
			}
		});

		initiallyFetchedBusinessCertificationFiles.forEach((file: any) => {
			if (file && file?.id && !businessCertificationIds.has(file?.id)) {
				deletedBusinessIds.push(file.id);
			}
		})


		if ((deletedFactoryIds ?? []).length > 0) {
			const data: RemoveCertification = {};
			data.type = 'factory';
			data.fileIds = deletedFactoryIds;
			const responseDeleteFactory = await api.sellerCompany.removeCertification(
				data
			);
			if (responseDeleteFactory.status !== 200) return;
		}

		if ((deletedBusinessIds ?? []).length > 0) {
			const data: RemoveCertification = {};
			data.type = 'business';
			data.fileIds = deletedBusinessIds;
			const responseDeleteBusiness = await api.sellerCompany.removeCertification(
				data
			);
			if (responseDeleteBusiness.status !== 200) return;
		}

		const formDataFactory: FormData = new FormData();
		const formDataBusiness: FormData = new FormData();

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
				const responseFactory = await api.sellerCompany.uploadCertification(
					formDataFactory
				);
				if (responseFactory.status !== 201) {
					return;
				}
			}
		}

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
				const responseBusiness = await api.sellerCompany.uploadCertification(
					formDataBusiness
				);
				if (responseBusiness.status !== 201) {
					return;
				}
			}
		}

		setSubmitClicked(false);
		window.location.reload();
	};


	return (
		<div className={s.wrapper}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={s.header}>
					<div className={s.header_row}>
						<div className={s.header_title}>Business Verification</div>
						<span onClick={closeModal} className={s.back}>
							<Image
								alt="Close Button"
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
					<div className={s.radio_group}>
						<div className={s.radio_element}>
							<input
								className={s.radio_btn}
								type="radio"
								name="companyDetails"
								id={'companyDetails'}
								checked={true}
							/>
							<div className={s.radio_image}>
								<Image src={check_icon} alt={'Check icon'} />
							</div>
						</div>
						<div className={s.content_product_certifications_group}>
							<div className={s.content_title_group}>
								<div className={s.content_title}>Company details</div>
								<div className={s.content_title_sub}>
									Provide company name, location and website
								</div>
							</div>
						</div>
					</div>
					<div className={s.radio_group}>
						<div className={s.radio_element}>
							<input
								className={s.radio_btn}
								type="radio"
								name="businessCertifications"
								id={'businessCertifications'}
								checked={isBusinessCertificationChecked}
							/>
							{isBusinessCertificationChecked && <div className={s.radio_image}>
								<Image src={check_icon} alt={'Check icon'} />
							</div>}
						</div>
						<div className={s.content_file_upload_group}>
							<div className={s.content_title_group}>
								<div className={s.content_title}>
									Business license and certifications
								</div>
								<div className={s.content_title_sub}>
									Upload your business certification
								</div>
							</div>
							{businessCertificationFiles?.length > 0 &&
								businessCertificationFiles.map((file: any, index: number) => (
									<div key={index} className={s.upload_row}>
										<div className={s.upload_filename}>
											{file?.name ? shorterString(file.name) : 'File Name Missing'}
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
									className={s.upload_hidden_input}
									onChange={handleBusinessCertificationFiles}
									multiple
								/>
							</label>
							{errors.businessCertification && (
								<div>
									<p></p>
									<p className={s.errorDescription}>
										{errors.businessCertification?.message}
									</p>
								</div>
							)}
						</div>
					</div>
					<div className={s.radio_group}>
						<div className={s.radio_element}>
							<input
								className={s.radio_btn}
								type="radio"
								name="factoryCertifications"
								id={'factoryCertifications'}
								checked={isFactoryCertificationChecked}
							/>
							{isFactoryCertificationChecked && <div className={s.radio_image}>
								<Image src={check_icon} alt={'Check icon'} />
							</div>}
						</div>
						<div className={s.content_file_upload_group}>
							<div className={s.content_title_group}>
								<div className={s.content_title}>Factory certification</div>
								<div className={s.content_title_sub}>
									Upload your factory certification
								</div>
							</div>
							{factoryCertificationFiles?.length > 0 &&
								factoryCertificationFiles.map((file: any, index: number) => (
									<div key={index} className={s.upload_row}>
										<div className={s.upload_filename}>
											{file?.name ? shorterString(file.name) : 'File Name Missing'}
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
									accept=".jpg, .jpeg, .png, .pdf"
									type="file"
									id="factoryFileInput"
									className={s.upload_hidden_input}
									onChange={handleFactoryCertificationFiles}
									multiple
								/>
							</label>
							{errors.factoryCertifications && (
								<div>
									<p></p>
									<p className={s.errorDescription}>
										{errors.factoryCertifications?.message}
									</p>
								</div>
							)}
						</div>
					</div>
					<div className={s.radio_group}>
						<div className={s.radio_element}>
							<input
								className={s.radio_btn}
								type="radio"
								name="productsCertifications"
								id={'productsCertifications'}
								checked={isProductCertificationsChecked}
							/>
							{isProductCertificationsChecked && <div className={s.radio_image}>
								<Image src={check_icon} alt={'Check icon'} />
							</div>}
						</div>
						<div className={s.content_product_certifications_group}>
							<div className={s.content_title_group}>
								<div className={s.content_title}>Product certifications</div>
								<div className={s.content_title_sub}>Add product certifications</div>
							</div>
							<div className={s.content_input_group}>
								<p className={s.content_title_small}>Products certifications</p>
								<label
									className={classNames(s.label, s.padding_eight)}
									htmlFor="certificationsProducts"
								>
									<input
										id={'certificationsProducts'}
										name={'certificationsProducts'}
										className={s.content_input}
										placeholder={'Enter product certifications'}
										type={'text'}
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
									/>
									<Image
										alt={'add product'}
										src={plus_sign}
										onClick={handleAddCountryCertification}
									/>
								</label>
								{errors.productCertifications && (
									<div>
										<p></p>
										<p className={s.errorDescription}>
											{errors.productCertifications?.message}
										</p>
									</div>
								)}
								<div className={s.tag_wrapper_countries}>
									{productCertifications.map((product) => (
										<div className={s.tag}>
											<p>{product}</p>
											<Image
												alt={'Add product Certification'}
												className={s.tag_close}
												src={modal_close}
												onClick={() => handeRemoveCertification(product)}
											/>
										</div>
									))}
								</div>

							</div>
							<div className={s.content_input_group}>
								<p className={s.content_title_small}>
									Products are certified for the following countries
								</p>
								<label
									className={classNames(s.label, s.padding_eight)}
									htmlFor="{'certificationsCountries'}"
								>
									<input
										id={'certificationsCountries'}
										name={'certificationsCountries'}
										className={s.content_input}
										placeholder={'Enter countries'}
										type={'text'}
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
									/>
									<Image
										alt={'add product'}
										src={plus_sign}
										onClick={handleAddCountryCertification}
									/>
								</label>
								{errors.countryProductsCertifiedFor && (
									<div>
										<p></p>
										<p className={s.errorDescription}>
											{errors.countryProductsCertifiedFor?.message}
										</p>
									</div>
								)}
								<div className={s.tag_wrapper_countries}>
								{countryProductsCertifiedFor.map((product) => (
									<div className={s.tag}>
										<p>{product}</p>
										<Image
											alt="close"
											className={s.tag_close}
											src={modal_close}
											onClick={() => handleRemoveCountryCertification(product)}
										/>
									</div>
								))}
								</div>
							</div>
						</div>
					</div>
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
							disabled={Boolean(Object.keys(errors)?.length > 0) || submitClicked}
						>
							Submit for verification
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};
