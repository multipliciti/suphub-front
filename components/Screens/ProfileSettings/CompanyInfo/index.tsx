'use client';
import s from './CompanyInfoStyle.module.scss';
import { useAppDispatch } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';
import React, { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import modal_close from '@/imgs/close.svg';
import plus_sign from '@/imgs/ProfileSettings/plus_sign.svg';
import small_cross from '@/imgs/ProfileSettings/small_cross.svg';
import big_cross from '@/imgs/ProfileSettings/big_cross.svg';

import logo_placeholder from '@/imgs/ProfileSettings/logo_placeholder.svg';
import file_icon from '@/imgs/ProfileSettings/file_icon.svg';
import Image from 'next/image';

const CompanyInfo = () => {
	const dispatch = useAppDispatch();
	const [
		isFactoryAddressSameAsCompanyAddress,
		setIsFactoryAddressSameAsCompanyAddress,
	] = useState<boolean>(false);
	const isFactoryAddressSameAsCompanyAddressHandler = () => {
		setIsFactoryAddressSameAsCompanyAddress(!isFactoryAddressSameAsCompanyAddress);
	};
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			companyLegalName: '',
			logo: '',
			companyOverview: '',
			businessCertification: '',
			factoryCertifications: '',
			productsCertifiedFor: '',
			productCertifications: '',
			factoryImages: '',
			companyStreetAddress: '',
			companyCity: '',
			companyStateProvince: '',
			companyCountry: '',
			companyZipCode: '',
			factoryStreetAddress: '',
			factoryCity: '',
			factoryStateProvince: '',
			factoryCountry: '',
			factoryZipCode: '',
		},
		mode: 'onChange',
		shouldFocusError: true,
		shouldUnregister: true,
	});

	const HOST = process.env.NEXT_PUBLIC_CLIENT_HOST;

	const onSubmit: SubmitHandler<any> = async (data) => {
		console.log(data);
		console.log(previewLogo);
	};

	const [logoSrc, setLogoSrc] = useState(null);
	const [previewLogo, setPreviewLogo] = useState<string | any>(null);

	const handleLogoChange = (event: any) => {
		const file = event.target.files[0];
		if (file) {
			setLogoSrc(file);
			setPreviewLogo(URL.createObjectURL(file));
		}
	};

	const [businessCertificationFiles, setBusinessCertificationFiles] = useState<any>(
		[]
	);
	const [factoryCertificationFiles, setFactoryCertificationFiles] = useState<any>(
		[]
	);
	const [factoryImages, setFactoryImages] = useState<any>([]);
	const [factoryImagesPreview, setFactoryImagesPreview] = useState<any>([]);

	const handleBusinessCertificationFiles = (event: any) => {
		const newFiles = Array.from(event.target.files);
		setBusinessCertificationFiles((prevFiles: any) => [...prevFiles, ...newFiles]);
	};
	const handleFactoryCertificationFiles = (event: any) => {
		const newFiles = Array.from(event.target.files);
		setFactoryCertificationFiles((prevFiles: any) => [...prevFiles, ...newFiles]);
	};
	const handleFactoryImages = (event: any) => {
		const newFiles = Array.from(event.target.files);
		setFactoryImages((prevFiles: any) => [...prevFiles, ...newFiles]);

		const newPreviews = newFiles.map((file: any) => URL.createObjectURL(file));
		setFactoryImagesPreview((prevPreviews: any) => [
			...prevPreviews,
			...newPreviews,
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
	const handleRemoveFactoryImages = (index: any) => {
		setFactoryImages((prevFiles: any) =>
			prevFiles.filter((_: any, i: any) => i !== index)
		);
		setFactoryImagesPreview((prevFiles: any) =>
			prevFiles.filter((_: any, i: any) => i !== index)
		);
	};

	const [productsCertifiedFor, setProductsCertifiedFor] = useState<string[]>([
		'USA',
		'China',
	]);
	const [productCertifications, setProductCertifications] = useState<string[]>([
		'AAMA',
		'ASTM',
		'CSA',
		'WDMA',
	]);


	return (
		<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={s.heading}>
				<h5 className={s.title_main}>Company Info</h5>
				<button className={classNames(s.btn_send, s.btn_send_active)}>
					Save Changes
				</button>
			</div>
			<div className={s.settings}>
				<div className={s.title_general}>General Info</div>
				<div className={s.row}>
					<p className={s.title}>Company Legal Name</p>
					<label className={s.label} htmlFor="companyLegalName">
						<input
							className={s.input}
							{...register('companyLegalName', {
								required: 'required companyLegalName',
							})}
							placeholder="Enter company legal name"
							type="text"
							id="companyLegalName"
						/>
					</label>
				</div>
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>Logo</p>
					<div className={s.logo_wrapper}>
						<label htmlFor="logoInput">
							{logoSrc ? (
								<Image
									alt={'Logo placeholder'}
									className={s.logo}
									width={1}
									height={1}
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
				<div className={s.separator}></div>
				<div className={s.row_align_start}>
					<p className={s.title}>Company overview</p>
					<label className={s.label} htmlFor="companyOverview">
						<textarea
							className={s.textarea}
							{...register('companyOverview', { required: 'required' })}
							id="companyOverview"
							placeholder="Enter information about company"
						/>
					</label>
				</div>
			</div>
			<div className={s.settings}>
				<div className={s.title_general}>Files</div>
				<div
					className={
						businessCertificationFiles.length > 0 ? s.row_align_start : s.row
					}
				>
					<p className={s.title}>Business certification</p>
					<div className={s.files_wrapper}>
						{businessCertificationFiles.length > 0 &&
							businessCertificationFiles.map((file: any, index: number) => (
								<div key={index} className={s.upload_row}>
									<div className={s.upload_filename}>
										{file.name}
										<span className={s.upload_filename_size}>
											{(file.size / 1024 / 1024).toFixed(2)} Mb
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
								type="file"
								id="businessFileInput"
								className={s.hidden_input}
								onChange={handleBusinessCertificationFiles}
								multiple
							/>
						</label>
					</div>
				</div>
				<div className={s.separator}></div>
				<div
					className={
						factoryCertificationFiles.length > 0 ? s.row_align_start : s.row
					}
				>
					<p className={s.title}>Factory certifications</p>
					<div className={s.files_wrapper}>
						{factoryCertificationFiles.length > 0 &&
							factoryCertificationFiles.map((file: any, index: number) => (
								<div key={index} className={s.upload_row}>
									<div className={s.upload_filename}>
										{file.name}
										<span className={s.upload_filename_size}>
											{(file.size / 1024 / 1024).toFixed(2)} Mb
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

				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>Products certified for</p>
					<div className={s.tag_wrapper_countries}>
						{productsCertifiedFor.map((product) => (
							<button className={s.tag}>
								<p>{product}</p>
								<Image alt="close" className={s.tag_close} src={modal_close} />
							</button>
						))}
						<button className={s.tag_add}>
							<Image alt={'add product'} src={plus_sign} />
							<p>Add country</p>
						</button>
					</div>
				</div>
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>Product certifications</p>
					<div className={s.tag_wrapper}>
						{productCertifications.map((product) => (
							<button className={s.tag}>
								<p>{product}</p>
								<Image
									alt={'Add product Certification'}
									className={s.tag_close}
									src={modal_close}
								/>
							</button>
						))}
						<button className={s.tag_add}>
							<Image alt="add product certification" src={plus_sign} />
							<p>Add certification</p>
						</button>
					</div>
				</div>
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>Factory images</p>
					<div className={s.logo_wrapper}>
						<div className={s.factory_images}>
							{factoryImagesPreview.length > 0 &&
								factoryImagesPreview.map((image: any, index: number) => (
									<div className={s.factory_image_div} key={index}>
										<Image
											alt={'factory image'}
											className={s.factory_image}
											width={100}
											height={100}
											src={image}
										/>
										<div
											className={s.factory_div}
											onClick={() => handleRemoveFactoryImages(index)}
										>
											<Image
												src={small_cross}
												alt={'small_cross'}
												className={s.factory_close}
											/>
										</div>
									</div>
								))}
							<label htmlFor="factoryImages">
								<Image
									alt={'image placeholder'}
									className={s.logo_placeholder_square}
									src={plus_sign}
								/>
								<input
									{...register('factoryImages')}
									type="file"
									id="factoryImages"
									className={s.hidden_input}
									onChange={handleFactoryImages}
									multiple
								/>
							</label>
						</div>
					</div>
				</div>
			</div>
			<div className={s.settings}>
				<div className={s.title_general}>Company Address</div>
				<div className={s.row}>
					<p className={s.title}>Street address</p>
					<label className={s.label} htmlFor="companyStreetAddress">
						<input
							className={s.input}
							{...register('companyStreetAddress', { required: 'required address' })}
							placeholder="Enter street address"
							type="text"
							id="companyStreetAddress"
						/>
					</label>
				</div>
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>City</p>
					<label className={s.label} htmlFor="companyCity">
						<input
							className={s.input}
							{...register('companyCity', { required: 'required companyCity' })}
							placeholder="Enter city"
							type="text"
							id="companyCity"
						/>
					</label>
				</div>
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>State / Province</p>
					<label className={s.label} htmlFor="companyStateProvince">
						<input
							className={s.input}
							{...register('companyStateProvince', {
								required: 'required companyStateProvince',
							})}
							placeholder="Enter state / Province"
							type="text"
							id="companyStateProvince"
						/>
					</label>
				</div>
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>Country</p>
					<label className={s.label} htmlFor="companyCountry">
						<input
							className={s.input}
							{...register('companyCountry', {
								required: 'required companyCountry',
							})}
							placeholder="Enter Country"
							type="text"
							id="companyCountry"
						/>
					</label>
				</div>
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>Zip Code</p>
					<label className={s.label} htmlFor="companyZipCode">
						<input
							className={s.input}
							{...register('companyZipCode', {
								required: 'required companyZipCode',
							})}
							placeholder="Enter Zip Code"
							type="text"
							id="companyZipCode"
						/>
					</label>
				</div>
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
						htmlFor="factoryStreetAddress"
					>
						<input
							className={s.input}
							{...register('factoryStreetAddress', { required: 'required address' })}
							placeholder="Enter street address"
							type="text"
							id="factoryStreetAddress"
							disabled={isFactoryAddressSameAsCompanyAddress}
						/>
					</label>
				</div>
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
							{...register('factoryCity', { required: 'required factoryCity' })}
							placeholder="Enter city"
							type="text"
							id="factoryCity"
							disabled={isFactoryAddressSameAsCompanyAddress}
						/>
					</label>
				</div>
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>State / Province</p>
					<label
						className={classNames(
							s.label,
							isFactoryAddressSameAsCompanyAddress && s.label_disabled
						)}
						htmlFor="factoryStateProvince"
					>
						<input
							className={s.input}
							{...register('factoryStateProvince', {
								required: 'required factoryStateProvince',
							})}
							placeholder="Enter state / Province"
							type="text"
							id="factoryStateProvince"
							disabled={isFactoryAddressSameAsCompanyAddress}
						/>
					</label>
				</div>
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
								required: 'required factoryCountry',
							})}
							placeholder="Enter Country"
							type="text"
							id="factoryCountry"
							disabled={isFactoryAddressSameAsCompanyAddress}
						/>
					</label>
				</div>
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
								required: 'required factoryZipCode',
							})}
							placeholder="Enter Zip Code"
							type="text"
							id="factoryZipCode"
							disabled={isFactoryAddressSameAsCompanyAddress}
						/>
					</label>
				</div>
			</div>
		</form>
	);
};

export default CompanyInfo;
