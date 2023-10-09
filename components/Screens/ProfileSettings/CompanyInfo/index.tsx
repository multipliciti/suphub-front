'use client';
import s from './CompanyInfoStyle.module.scss';
// import { LayoutModal } from '../layout';
import { setModal, setEmail } from '@/redux/slices/modal';
import { useAppDispatch } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';
import { SubmitHandler, useForm } from 'react-hook-form';
// import { RegisterUserType } from '@/types/services/auth';
import modal_close from '@/imgs/close.svg';
import plus_sign from '@/imgs/ProfileSettings/plus_sign.svg';
import React, { useEffect, useRef, useState } from 'react';
// //imgs
// import modal_email from '@/imgs/Modal/email.svg';
// import modal_password from '@/imgs/Modal/pasword.svg';
// import modal_done from '@/imgs/Modal/done.svg';
// import invalid_icon from '@/imgs/Modal/invalid_icon.svg';
import logo_placeholder from '@/imgs/ProfileSettings/logo_placeholder.svg';
import file_icon from '@/imgs/ProfileSettings/file_icon.svg';
// //Api
import { Api } from '@/services';
import Image from 'next/image';
import modal_password from '@/imgs/Modal/pasword.svg';
import pencil from '@/imgs/ProfileSettings/pencil.svg';
import close_eye from '@/imgs/Modal/close_eye.svg';
import modal_eye from '@/imgs/Modal/eye.svg';
// import { setRegistration } from '@/redux/slices/auth';

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
		// getValues,
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
	};

	const [imageSrc, setImageSrc] = useState(null);

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => setImageSrc(e.target.result);
			reader.readAsDataURL(file);
		}
	};

	const [files, setFiles] = useState([]);

	const handleFileChange = (event) => {
		const newFiles = Array.from(event.target.files);
		setFiles((prevFiles) => [...prevFiles, ...newFiles]);
	};

	const handleFileRemove = (index) => {
		setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
	};

	const [productsCertifiedFor, setProductsCertifiedFor] = useState<string[]>([
		'USA',
		'China',
	]);
	const [productCertifications, setProductCertifications] = useState<string[]>([
		'AAMA',
		'CSA',
	]);

	// TODO same as company
	const companyAddressRef = useRef({
		street: '',
		city: '',
		state: '',
		country: '',
		zip: '',
	});

	const handleFactoryAddressChange = () => {
		setIsFactoryAddressSameAsCompanyAddress(false);
	};

	useEffect(() => {
		if (isFactoryAddressSameAsCompanyAddress) {
			setValue('factoryStreetAddress', companyAddressRef.current.street);
			setValue('factoryCity', companyAddressRef.current.city);
			setValue('factoryStateProvince', companyAddressRef.current.state);
			setValue('factoryCountry', companyAddressRef.current.country);
			setValue('factoryZipCode', companyAddressRef.current.zip);
		}
	}, [isFactoryAddressSameAsCompanyAddress]);

	return (
		<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={s.heading}>
				<h5 className={s.title_main}>Company Info</h5>
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
					<p className={s.title}>Company Legal Name</p>
					<label className={s.label} htmlFor="firstName">
						<input
							className={s.input}
							{...register('firstName', { required: 'required firstName' })}
							placeholder="Enter company legal name"
							type="text"
							id="firstName"
						/>
					</label>
				</div>
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>Logo</p>
					<div className={s.logo_wrapper}>
						<Image className={s.logo_placeholder} src={logo_placeholder} />
					</div>
					{/*<label className={s.label} htmlFor="logoInput">*/}
					{/*	{imageSrc ? (*/}
					{/*		<div*/}
					{/*			className={s.imagePreview}*/}
					{/*			style={{ backgroundImage: `url(${imageSrc})` }}*/}
					{/*		></div>*/}
					{/*	) : (*/}
					{/*		<div className={s.imagePlaceholder}>Upload Image</div>*/}
					{/*	)}*/}
					{/*	<input*/}
					{/*		{...register('logo')}*/}
					{/*		type="file"*/}
					{/*		id="logoInput"*/}
					{/*		className={s.hiddenInput}*/}
					{/*		onChange={handleImageChange}*/}
					{/*	/>*/}
					{/*</label>*/}
				</div>
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>Company overview</p>
					<label className={s.label} htmlFor="email">
						<textarea
							className={s.input}
							{...register('email', { required: 'required' })}
							id="email"
							placeholder="Enter information about company"
							type="text"
						/>
					</label>
				</div>
			</div>
			<div className={s.settings}>
				<div className={s.title_general}>Files</div>
				<div className={s.row}>
					{/*TODO fix this button*/}
					<p className={s.title}>Business certification</p>
					<div className={s.tag_wrapper}>
						{files.map((file, index) => (
							<div className={s.fileInfo} key={index}>
								{file.name} ({Math.round(file.size / 1024)} KB)
								<button
									type="button"
									className={s.removeFileButton}
									onClick={() => handleFileRemove(index)}
								>
									x
								</button>
							</div>
						))}
						<div className={s.upload_button}>
							<Image src={file_icon} />
							Upload files
						</div>
						<input
							{...register('businessCertification')}
							type="file"
							id="businessFileInput"
							className={s.hiddenInput}
							onChange={handleFileChange}
							multiple
						/>
					</div>
				</div>
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>Factory certifications</p>

					<div className={s.tag_wrapper}>
						{files.map((file, index) => (
							<div className={s.fileInfo} key={index}>
								{file.name} ({Math.round(file.size / 1024)} KB)
								<button
									type="button"
									className={s.removeFileButton}
									onClick={() => handleFileRemove(index)}
								>
									x
								</button>
							</div>
						))}
						<div className={s.upload_button}>
							<Image src={file_icon} />
							Upload files
						</div>
						<input
							{...register('factoryCertifications')}
							type="file"
							id="factoryFileInput"
							className={s.hiddenInput}
							onChange={handleFileChange}
							multiple
						/>
					</div>
				</div>

				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>Products certified for</p>
					{/*	TODO TAGS*/}

					<div className={s.tag_wrapper}>
						{productsCertifiedFor.map((product) => (
							<button className={s.tag}>
								<p>{product}</p>
								<Image className={s.tag_close} src={modal_close} />
							</button>
						))}
						<button className={s.tag_add}>
							{/*TODO fix icon add styles*/}
							<Image className={s.tag_plus_sign} src={plus_sign} />
							<p>Add country</p>
						</button>
					</div>
				</div>
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>Product certifications</p>
					{/*	TODO TAGS*/}
					<div className={s.tag_wrapper}>
						{productCertifications.map((product) => (
							<button className={s.tag}>
								<p>{product}</p>
								<Image className={s.tag_close} src={modal_close} />
							</button>
						))}
						<button className={s.tag_add}>
							{/*TODO fix icon add styles*/}
							<Image className={s.tag_plus_sign} src={plus_sign} />
							<p>Add certification</p>
						</button>
					</div>
				</div>
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>Factory images</p>
					<div className={s.logo_wrapper}>
						<Image className={s.logo_placeholder_square} src={plus_sign} />
					</div>
				</div>
			</div>
			{/* COMPANY ADDRESS */}
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
							onChange={(e) => {
								companyAddressRef.current.street = e.target.value;
							}}
						/>
					</label>
				</div>
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>City</p>
					<label className={s.label} htmlFor="firstName">
						<input
							className={s.input}
							{...register('firstName', { required: 'required firstName' })}
							placeholder="Enter city"
							type="text"
							id="companyCity"
							onChange={(e) => {
								companyAddressRef.current.city = e.target.value;
							}}
						/>
					</label>
				</div>
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>State / Province</p>
					<label className={s.label} htmlFor="firstName">
						<input
							className={s.input}
							{...register('firstName', { required: 'required firstName' })}
							placeholder="Enter state / Province"
							type="text"
							id="companyStateProvince"
							onChange={(e) => {
								companyAddressRef.current.state = e.target.value;
							}}
						/>
					</label>
				</div>
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>Country</p>
					<label className={s.label} htmlFor="firstName">
						<input
							className={s.input}
							{...register('firstName', { required: 'required firstName' })}
							placeholder="Enter Country"
							type="text"
							id="country"
							onChange={(e) => {
								companyAddressRef.current.country = e.target.value;
							}}
						/>
					</label>
				</div>
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>Zip Code</p>
					<label className={s.label} htmlFor="firstName">
						<input
							className={s.input}
							{...register('firstName', { required: 'required firstName' })}
							placeholder="Enter Zip Code"
							type="text"
							id="zipCode"
							onChange={(e) => {
								companyAddressRef.current.zip = e.target.value;
							}}
						/>
					</label>
				</div>
			</div>
			{/* FACTORY ADDRESS */}
			{/*	TODO No Register Required!!*/}
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
						<label
							htmlFor={'sameAsCompanyAddress'}
							// style={isFactoryAddressSameAsCompanyAddress ?}
						>
							Same as Company Address
						</label>
					</div>
				</div>
				<div className={s.row}>
					<p className={s.title}>Street address</p>
					<label className={s.label} htmlFor="factoryStreetAddress">
						<input
							className={s.input}
							{...register('factoryStreetAddress', { required: 'required address' })}
							placeholder="Enter street address"
							type="text"
							id="factoryStreetAddress"
							disabled={isFactoryAddressSameAsCompanyAddress}
							onChange={handleFactoryAddressChange}
						/>
					</label>
				</div>
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>City</p>
					<label className={s.label} htmlFor="firstName">
						<input
							className={s.input}
							{...register('firstName', { required: 'required firstName' })}
							placeholder="Enter city"
							type="text"
							id="companyCity"
							disabled={isFactoryAddressSameAsCompanyAddress}
							onChange={handleFactoryAddressChange}
						/>
					</label>
				</div>
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>State / Province</p>
					<label className={s.label} htmlFor="firstName">
						<input
							className={s.input}
							{...register('firstName', { required: 'required firstName' })}
							placeholder="Enter state / Province"
							type="text"
							id="firstName"
							disabled={isFactoryAddressSameAsCompanyAddress}
							onChange={handleFactoryAddressChange}
						/>
					</label>
				</div>
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>Country</p>
					<label className={s.label} htmlFor="firstName">
						<input
							className={s.input}
							{...register('firstName', { required: 'required firstName' })}
							placeholder="Enter Country"
							type="text"
							id="firstName"
							disabled={isFactoryAddressSameAsCompanyAddress}
							onChange={handleFactoryAddressChange}
						/>
					</label>
				</div>
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>Zip Code</p>
					<label className={s.label} htmlFor="firstName">
						<input
							className={s.input}
							{...register('firstName', { required: 'required firstName' })}
							placeholder="Enter Zip Code"
							type="text"
							id="firstName"
							disabled={isFactoryAddressSameAsCompanyAddress}
							onChange={handleFactoryAddressChange}
						/>
					</label>
				</div>
			</div>
		</form>
	);
};

export default CompanyInfo;
