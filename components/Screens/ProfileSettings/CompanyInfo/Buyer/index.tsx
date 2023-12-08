'use client';
import s from '../CompanyInfoStyle.module.scss';
import { classNames } from '@/utils/classNames';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import logo_placeholder from '@/imgs/ProfileSettings/logo_placeholder.svg';
import Image from 'next/image';
import { Api } from '@/services';
import { UpdateBuyerCompany } from '@/types/services/company';

const BuyerCompanyInfo = () => {
	const api = Api();

	const {
		register,
		handleSubmit,
		setValue,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			logo: '',
			street: '',
			city: '',
			state: '',
			country: '',
			zipCode: '',
		},
		mode: 'onChange',
		shouldFocusError: true,
		shouldUnregister: true,
	});

	const [logoSrc, setLogoSrc] = useState(null);
	const [previewLogo, setPreviewLogo] = useState<string | null>(null);
	const [companyId, setCompanyId] = useState<number>(0);

	const [submitClicked, setSubmitClicked] = useState<boolean>(false);

	const handleLogoChange = (event: React.ChangeEvent<any>) => {
		clearErrors('logo');
		const file = event.target.files[0];
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

	useEffect(() => {
		const fetch = async () => {
			const userResponse = await api.auth.getUser();
			const {
				data: { buyerCompanyId },
			} = userResponse;

			if (!buyerCompanyId) {
				// TODO
				// Created a check due to typescript errors
				// Needs to be refactored!
				return;
			}

			setCompanyId(buyerCompanyId);
			const response = await api.buyerCompany.getById(buyerCompanyId);
			const { name, logo, address } = response.data;
			setValue('name', name ?? '');
			setValue('street', address?.street || '');
			setValue('city', address?.city || '');
			setValue('state', address?.state || '');
			setValue('country', address?.country || '');
			setValue('zipCode', address?.zipcode || '');
			setPreviewLogo(logo ? logo.url : null);
		};
		fetch();
	}, []);

	const onSubmit: SubmitHandler<any> = async (data) => {
		setSubmitClicked(true);
		const form: UpdateBuyerCompany = {};

		const address: any = {
			street: data.street,
			city: data.city,
			state: data.state,
			country: data.country,
			zipcode: data.zipCode,
		};

		form['name'] = data.name;
		form['address'] = address;

		const responseForm = await api.buyerCompany.update(companyId, form);
		if (responseForm.status !== 200) return;

		if (logoSrc) {
			const formData: any = new FormData();
			formData.append('file', logoSrc);
			const responseLogo = await api.buyerCompany.uploadLogo(formData);
			if (responseLogo.status !== 201) return;
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
						Boolean(!(Object.keys(errors).length > 0)) && s.btn_send_active
					)}
					disabled={Boolean(Object.keys(errors).length > 0) || submitClicked}
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
				<div className={s.title_general}>Company Address</div>
				<div className={s.row}>
					<p className={s.title}>Street address</p>
					<label className={s.label} htmlFor="street">
						<input
							className={s.input}
							{...register('street', {
								required: 'Please provide the street address',
							})}
							placeholder="Enter street address"
							type="text"
							id="street"
						/>
					</label>
				</div>
				{errors.street && (
					<div className={s.row_nogap}>
						<p></p>
						<p className={s.errorDescription}>{errors.street?.message}</p>
					</div>
				)}
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>City</p>
					<label className={s.label} htmlFor="city">
						<input
							className={s.input}
							{...register('city', { required: 'Please fill in the city' })}
							placeholder="Enter city"
							type="text"
							id="city"
						/>
					</label>
				</div>
				{errors.city && (
					<div className={s.row_nogap}>
						<p></p>
						<p className={s.errorDescription}>{errors.city?.message}</p>
					</div>
				)}
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>State / Province</p>
					<label className={s.label} htmlFor="state">
						<input
							className={s.input}
							{...register('state', {
								required: 'Please specify the state',
							})}
							placeholder="Enter state / Province"
							type="text"
							id="state"
						/>
					</label>
				</div>
				{errors.state && (
					<div className={s.row_nogap}>
						<p></p>
						<p className={s.errorDescription}>{errors.state?.message}</p>
					</div>
				)}
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>Country</p>
					<label className={s.label} htmlFor="country">
						<input
							className={s.input}
							{...register('country', {
								required: 'Please indicate the country',
							})}
							placeholder="Enter Country"
							type="text"
							id="country"
						/>
					</label>
				</div>
				{errors.country && (
					<div className={s.row_nogap}>
						<p></p>
						<p className={s.errorDescription}>{errors.country?.message}</p>
					</div>
				)}
				<div className={s.separator}></div>
				<div className={s.row}>
					<p className={s.title}>Zip Code</p>
					<label className={s.label} htmlFor="zipCode">
						<input
							className={s.input}
							{...register('zipCode', {
								required: 'Please input the ZIP code',
							})}
							placeholder="Enter Zip Code"
							type="text"
							id="zipCode"
						/>
					</label>
				</div>
				{errors.zipCode && (
					<div className={s.row_nogap}>
						<p></p>
						<p className={s.errorDescription}>{errors.zipCode?.message}</p>
					</div>
				)}
			</div>
		</form>
	);
};

export default BuyerCompanyInfo;
